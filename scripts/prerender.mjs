// Prerender the two localized pages into dist/ after the client build.
//
//   dist/index.html      -> German  (canonical root)
//   dist/en/index.html   -> English
//
// Both get real, server-rendered markup (crawlable, no JS needed) plus the
// per-language <head> (title, description, canonical, og:*, hreflang).
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const templatePath = path.join(dist, 'index.html')
const ssrEntry = path.join(root, '.ssr', 'entry-server.js')

if (!fs.existsSync(templatePath)) {
  throw new Error(`no client build at ${templatePath} — run "vite build" first`)
}
if (!fs.existsSync(ssrEntry)) {
  throw new Error(`no SSR bundle at ${ssrEntry} — run "vite build --ssr src/entry-server.tsx" first`)
}

const SITE = 'https://fatlind-azemi.de'
const template = fs.readFileSync(templatePath, 'utf8')
const { render } = await import(pathToFileURL(ssrEntry).href)

const LOCALES = {
  de: {
    lang: 'de',
    path: '/',
    ogLocale: 'de_DE',
    ogAlternate: 'en_US',
    title: 'Fatlind Azemi — Software- & Data-Engineer',
    desc: 'Portfolio von Fatlind Azemi, Software- und Data-Engineer mit Fokus auf Enterprise-Dateninfrastruktur und moderne Anwendungsentwicklung.',
  },
  en: {
    lang: 'en',
    path: '/en/',
    ogLocale: 'en_US',
    ogAlternate: 'de_DE',
    title: 'Fatlind Azemi — Software & Data Engineer',
    desc: 'Portfolio of Fatlind Azemi, Software & Data Engineer specializing in enterprise data infrastructure and modern application development.',
  },
}

const HREFLANG = [
  `<link rel="alternate" hreflang="de" href="${SITE}/" />`,
  `<link rel="alternate" hreflang="en" href="${SITE}/en/" />`,
  `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
].join('\n    ')

/** Replace the content of a tag whose attribute prefix is unique in the head. */
function setAttr(html, prefix, value) {
  const re = new RegExp(`(${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}")[^"]*(")`)
  if (!re.test(html)) throw new Error(`head pattern not found: ${prefix}`)
  return html.replace(re, (_m, a, b) => `${a}${value}${b}`)
}

function page(key) {
  const lc = LOCALES[key]
  let html = render(key)

  let out = template
  out = out.replace(/<html lang="[^"]*"/, `<html lang="${lc.lang}"`)
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${lc.title}</title>`)
  out = setAttr(out, '<meta name="description" content=', lc.desc)
  out = setAttr(out, '<meta property="og:title" content=', lc.title)
  out = setAttr(out, '<meta property="og:description" content=', lc.desc)
  out = setAttr(out, '<meta property="og:url" content=', `${SITE}${lc.path}`)
  out = setAttr(out, '<meta property="og:locale" content=', lc.ogLocale)
  out = setAttr(out, '<meta property="og:locale:alternate" content=', lc.ogAlternate)
  out = setAttr(out, '<meta name="twitter:title" content=', lc.title)
  out = setAttr(out, '<meta name="twitter:description" content=', lc.desc)
  out = setAttr(out, '<link rel="canonical" href=', `${SITE}${lc.path}`)
  out = out.replace('</head>', `    ${HREFLANG}\n  </head>`)
  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  if (!out.includes('<div id="root">')) throw new Error('root injection failed')
  return out
}

fs.writeFileSync(path.join(dist, 'index.html'), page('de'))
fs.mkdirSync(path.join(dist, 'en'), { recursive: true })
fs.writeFileSync(path.join(dist, 'en', 'index.html'), page('en'))

console.log('prerendered: dist/index.html (de), dist/en/index.html (en)')
