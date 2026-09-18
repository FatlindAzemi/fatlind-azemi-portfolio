import type { ExpertiseCategory, PortfolioData, Project } from '../types'
import { portfolioDataEn } from './portfolio.en'

type ProjectText = Pick<
  Project,
  'title' | 'subtitle' | 'description' | 'metrics' | 'vizCaption'
>

interface CategoryText {
  title: string
  subtitle: string
  skills: Record<string, string>
}

// Keyed by the English title so a renamed source category fails loudly in review
// instead of silently falling back to English copy.
const categoryText: Record<string, CategoryText> = {
  'Data Engineering & Architecture': {
    title: 'Data Engineering & Architektur',
    subtitle: 'Lakehouse-Architekturen und produktive ML-Pipelines auf Azure & GCP',
    skills: {
      'Azure Cloud': 'Azure Cloud',
      'Google Cloud Platform': 'Google Cloud Platform',
      Databricks: 'Databricks',
      'PySpark & Spark SQL': 'PySpark & Spark SQL',
      'Python & SQL': 'Python & SQL',
      'Lakehouse & ETL Pipelines': 'Lakehouse- & ETL-Pipelines',
    },
  },
  'Product & App Development': {
    title: 'Produkt- & App-Entwicklung',
    subtitle: 'End-to-End-Produktentwicklung über Web, Mobile und API-Oberflächen',
    skills: {
      'React & Next.js': 'React & Next.js',
      'Flutter & Dart': 'Flutter & Dart',
      TypeScript: 'TypeScript',
      'API Design & Backend': 'API-Design & Backend',
      'AI & Automation': 'KI & Automatisierung',
      'Infrastructure as Code': 'Infrastructure as Code',
    },
  },
}

// Keyed by project id — terminal commands, tech stack and visualisations are
// language-independent and stay sourced from the English base data.
const projectText: Record<string, ProjectText> = {
  'ai-driven-migration': {
    title: 'KI-gestützte Migration in die Cloud',
    subtitle:
      'Ein hauseigener KI-Agent, der ein Legacy-Data-Warehouse in eine Cloud-Umgebung überführt',
    description:
      'Migration eines Legacy-Data-Warehouse in eine Cloud-Lakehouse-Plattform — vollständig durchgeführt von einem eigens dafür gebauten KI-Agenten statt per Hand. Die Umgebung ist groß: tausende Objekte müssen neu aufgebaut werden, weshalb der Hebel den Ausschlag gibt — dieselbe Migration von Hand hätte ein Team den Großteil eines Jahres gekostet. Der Agent liest die Modelle und Transformationen des Quellsystems, leitet cloud-native Äquivalente ab und validiert jedes Ergebnis gegen das Original. Der Agent ist selbst das Ergebnis: sein Verhalten und seine Werkzeuge wurden hausintern auf OpenCode entwickelt, und die Quellbasis wurde gezielt aufgebaut, um ihm eine präzise, gut beschriebene Oberfläche zu geben.',
    metrics: [
      'TODO: Anzahl migrierter Objekte (große Landschaft)',
      'TODO: manueller Aufwand reduziert um … (vs. manuelle Migration)',
      'TODO: Validierungs-Erfolgsquote',
    ],
    vizCaption: 'Status der Objektmigration',
  },
  'enterprise-data-platform': {
    title: 'Enterprise-Datenplattform',
    subtitle: 'Vollständiger Plattformaufbau — von der Ingestion bis zur BI-Reporting-Ebene',
    description:
      'End-to-End konzipiert und umgesetzt: Ingestion und Orchestrierung, ein Medallion-Lakehouse, eine governante semantische Schicht und das darauf aufbauende BI-Reporting. Im Betrieb über Databricks, Microsoft Fabric, Azure Synapse und Azure SQL — eine Plattform, ein Satz Definitionen, von der Rohdatenquelle bis zu den Reports, die das Business tatsächlich öffnet.',
    metrics: [
      'TODO: Anzahl Quellsysteme',
      'TODO: verarbeitetes Datenvolumen',
      'TODO: BI-Reports / aktive Nutzer',
    ],
    vizCaption: 'Plattform-Schichten',
  },
  'forecast-engine': {
    title: 'Enterprise-Forecast-Engine',
    subtitle: 'Bedarfsprognose über 200+ Produktkategorien im Petabyte-Maßstab',
    description:
      'Verteilte Forecasting-Plattform, die Milliarden historischer Datensätze verarbeitet, um die Nachfrage über 200+ Produktkategorien vorherzusagen. Gebaut auf Databricks mit PySpark und MLflow — 40 % weniger Lagerüberhang bei gleichzeitig besserer Regalverfügbarkeit in einem globalen Handelsnetz.',
    metrics: [
      '40 % weniger Lagerüberhang',
      '12 Mio.+ prognostizierte SKU-Tage/Monat',
      '99,3 % Modell-Verfügbarkeit (SLA)',
    ],
    vizCaption: 'Prognose vs. tatsächliche Nachfrage',
  },
  'media-trend-api': {
    title: 'Media-Trend-Analyse-API',
    subtitle:
      'Serverless-NLP-Pipeline mit 2 Mio.+ Artikeln täglich zur Trenderkennung',
    description:
      'Serverless-API, die täglich Millionen Artikel und Social-Media-Posts einliest, verarbeitet und indexiert. NLP-Pipelines auf GCP Dataflow extrahieren Entitäten, klassifizieren Sentiment und erkennen aufkommende Trends — ausgeliefert über einen GraphQL-Endpunkt mit niedriger Latenz.',
    metrics: [
      '2,1 Mio. indexierte Artikel täglich',
      'Trenderkennung < 90 Sekunden Latenz',
      '94 % F1 bei der Sentiment-Klassifikation',
    ],
    vizCaption: 'Themenvolumen mit Ausschlag-Erkennung',
  },
  'saas-utility-platform': {
    title: 'SaaS-Plattform für Versorgungsabrechnung',
    subtitle: 'Versorgungsabrechnung und Verbrauchsanalyse für Mehrfamilienimmobilien',
    description:
      'Full-Stack-SaaS-Plattform für Versorgungsabrechnung, Mieterrechnungen und Verbrauchsanalyse bei Mehrfamilienimmobilien. Gebaut mit React, Hono und PostgreSQL — verarbeitet 50.000+ Rechnungen pro Monat mit automatisiertem Zahlungsabgleich und Echtzeit-Dashboards.',
    metrics: [
      '12.000 aktive Nutzer pro Monat',
      '99,9 % Plattform-Verfügbarkeit',
      '50.000+ verarbeitete Rechnungen/Monat',
    ],
    vizCaption: 'Rechnungen nach Zahlungsstatus',
  },
}

function translateCategory(
  category: ExpertiseCategory,
  text: CategoryText,
): ExpertiseCategory {
  return {
    ...category,
    title: text.title,
    subtitle: text.subtitle,
    skills: category.skills.map((skill) => ({
      ...skill,
      name: text.skills[skill.name] ?? skill.name,
    })),
  }
}

function translateProject(project: Project): Project {
  return { ...project, ...projectText[project.id] }
}

export const portfolioDataDe: PortfolioData = {
  ...portfolioDataEn,
  title: 'Software- & Data-Engineer',
  subtitle: 'Skalierbare Dateninfrastruktur und moderne digitale Produkte.',
  bio: [
    'Ich baue Datenpipelines und verteilte Systeme — von Lakehouse-Architekturen auf Azure und GCP bis zu produktiven ML-Pipelines auf Databricks. Im Frontend arbeite ich mit React und Flutter, um Interfaces zu bauen, die Menschen tatsächlich gern benutzen. Mich treibt an, Daten nutzbar zu machen — nicht nur verfügbar.',
    'Über die Jahre habe ich ETL-Pipelines entworfen, die täglich Terabytes bewegen, Echtzeit-Forecast-Dashboards für den Enterprise-Handel gebaut und Full-Stack-SaaS-Apps von null bis in die Produktion gebracht. Ich bewege mich gern in der unordentlichen Mitte — dort, wo Data Engineering auf Produktentwicklung trifft und beide Seiten nicht ganz dieselbe Sprache sprechen.',
    'Neben der Arbeit beschäftige ich mich mit KI-Agent-Workflows, trage zu Open-Source-Projekten bei und verfeinere ständig, wie ich beobachtbare und wartbare Systeme baue. Gute Dokumentation, saubere CI/CD und Dinge besser zu hinterlassen, als ich sie vorgefunden habe, sind mir wichtig.',
  ],
  expertise: [
    translateCategory(
      portfolioDataEn.expertise[0],
      categoryText['Data Engineering & Architecture'],
    ),
    translateCategory(
      portfolioDataEn.expertise[1],
      categoryText['Product & App Development'],
    ),
  ],
  projects: portfolioDataEn.projects.map(translateProject),
}
