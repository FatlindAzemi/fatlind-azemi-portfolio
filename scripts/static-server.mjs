// Minimal dependency-free static server for the QA suite.
//
//   node scripts/static-server.mjs [rootDir] [port]
//
// Serves a built site with a single-page-app fallback (unknown paths -> the
// root index.html) and correct content types — enough for Playwright, without
// needing vite or any node_modules inside the test container.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.argv[2] ?? 'dist')
const port = Number(process.argv[3] ?? 4180)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  const candidates = clean.endsWith('/')
    ? [path.join(root, clean, 'index.html')]
    : [path.join(root, clean), path.join(root, clean, 'index.html')]

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate)
    if (!resolved.startsWith(root + path.sep) && resolved !== root) continue
    try {
      if (fs.statSync(resolved).isFile()) return resolved
    } catch {
      // try next
    }
  }
  const fallback = path.join(root, 'index.html')
  return fs.existsSync(fallback) ? fallback : null
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url ?? '/')
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('not found')
    return
  }
  const body = fs.readFileSync(file)
  res.writeHead(200, {
    'content-type': TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
    'content-length': body.length,
  })
  res.end(body)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`static server: http://127.0.0.1:${port} (root: ${root})`)
})
