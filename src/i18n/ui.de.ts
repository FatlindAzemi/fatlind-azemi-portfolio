import type { UiStrings } from './types'

export const uiDe: UiStrings = {
  meta: {
    title: 'Fatlind Azemi — Software- & Data-Engineer',
    description:
      'Portfolio von Fatlind Azemi, Software- und Data-Engineer mit Fokus auf Enterprise-Dateninfrastruktur und moderne Anwendungsentwicklung.',
  },
  nav: {
    expertise: 'Expertise',
    projects: 'Projekte',
    contact: 'Kontakt',
    getInTouch: 'Kontakt aufnehmen',
    backToTop: 'Nach oben',
    sections: 'Bereichsnavigation',
    language: 'Sprache',
  },
  mail: {
    subject: 'Kontakt über fatlindazemi.de',
    body: 'Hallo Fatlind,\n\nich habe dein Portfolio gesehen und würde gerne sprechen.\n\n',
  },
  hero: {
    getInTouch: 'Kontakt aufnehmen',
    viewProjects: 'Projekte ansehen',
    scroll: 'Scrollen',
    scrollToExpertise: 'Zur Expertise scrollen',
  },
  expertise: {
    eyebrow: 'Kompetenzen',
    title: 'Der Stack, mit dem ich baue',
    description:
      'Zwei Disziplinen, die sonst in getrennten Teams sitzen. Ich arbeite in beiden — an den Pipelines, die Daten verlässlich machen, und an den Produkten, die sie nutzbar machen.',
    certified: 'Zertifiziert',
  },
  projects: {
    eyebrow: 'Ausgewählte Arbeiten',
    title: 'Projekte',
    description:
      'Der Großteil meiner Arbeit ist Data Engineering — Ingestion, Lakehouse-Schichten, Governance und das Reporting darüber. Vier der folgenden Projekte sind Datenplattformen; das letzte ist ein Produkt, das ich von null bis in die Produktion gebracht habe.',
    dataEngineering: 'Data Engineering',
    productDevelopment: 'Produktentwicklung',
  },
  footer: {
    eyebrow: 'Kontakt',
    heading: 'Bauen wir etwas, das sich zu liefern lohnt.',
    lead: 'Offen für Gespräche über Datenplattformen, Produktentwicklung oder alles dazwischen.',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    builtWith: 'Erstellt mit React, Vite & Tailwind CSS',
    backToTop: 'Nach oben ↑',
  },
  viz: {
    actual: 'IST',
    forecast: 'PROGNOSE',
    burstDetected: 'AUSSCHLAG ERKANNT',
    migrated: 'MIGRIERT',
    running: 'LÄUFT',
    queued: 'WARTEND',
    months: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN'],
    layers: [
      'BI & REPORTING',
      'SEMANTISCHE SCHICHT',
      'LAKEHOUSE · DELTA',
      'INGESTION & ORCHESTRIERUNG',
      'QUELLEN',
    ],
    aria: {
      forecast:
        'Prognosediagramm: tatsächliche Nachfrage mit sich weitendem Konfidenzintervall',
      trends: 'Themen-Streams über die Zeit mit erkanntem Ausschlag',
      billing: 'Monatliche Rechnungen gestapelt nach Zahlungsstatus',
      migration: 'Migrationsraster: migrierte, laufende und wartende Objekte',
      platform:
        'Plattform-Schichten von den Quellen bis zur BI-Reporting-Ebene',
    },
  },
}
