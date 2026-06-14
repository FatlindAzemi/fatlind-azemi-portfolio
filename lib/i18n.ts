export type Locale = "de" | "en";
export const locales: Locale[] = ["de", "en"];
export const defaultLocale: Locale = "en";

export function detectLocale(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const primary = acceptLanguage.split(",")[0]?.trim().toLowerCase() || "";
  return primary.startsWith("de") ? "de" : "en";
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export interface SiteMeta {
  title: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface AboutStat {
  iconKey: "Briefcase" | "Cloud" | "Award";
  label: string;
  value: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  context: string;
  focus: string;
  description: string;
  tags: string[];
  accent: string;
  current?: boolean;
}

export interface HighlightItem {
  value: string;
  label: string;
}

export interface MainSkill {
  iconKey: "Cloud" | "BrainCircuit" | "ShieldCheck";
  title: string;
  accent: string;
  description: string;
  tags: string[];
}

export interface SecondarySkill {
  iconKey: "Code2" | "Database" | "BarChart3";
  title: string;
  accent: string;
  tags: string[];
}

export interface CertItem {
  letter: string;
  issuer: string;
  title: string;
  description: string;
  color: string;
  accent: string;
}

export interface ContactLink {
  iconKey: "Mail" | "Phone" | "MapPin" | "Linkedin" | "Github";
  label: string;
  value: string;
  href: string;
}

const translations = {
  de: {
    meta: {
      title: "Fatlind Azemi | Senior Cloud Data Engineer & AI Expert",
      description:
        "Portfolio of Fatlind Azemi, Senior Cloud Data Engineer and AI Expert specializing in Azure, Databricks, and AI-Driven Analytics.",
    },
    nav: {
      intro: "Intro",
      about: "About",
      experience: "Experience",
      skills: "Skills",
      certs: "Certs",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Senior Cloud Data Engineer & AI Expert",
      subtitle:
        "Ich baue skalierbare Daten-Ökosysteme, KI-Pipelines und Governance-Frameworks für Enterprise-Unternehmen.",
      ctaPrimary: "Lass uns reden",
      ctaSecondary: "Track Record",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "Über mich",
      heading: "Mensch hinter den Daten",
      p1: "Als Senior Cloud Data Engineer verbinde ich technische Tiefe mit Business-Verständnis. Ich baue skalierbare Daten-Ökosysteme in Azure und Google Cloud.",
      p2: "Von Data Warehouses über Databricks-Pipelines bis hin zu KI-Governance – ich entwickle Lösungen, die Unternehmen befähigen, Daten als Wettbewerbsvorteil zu nutzen.",
      stats: {
        experience: "Jahre Erfahrung",
        platforms: "Cloud-Plattformen",
        certs: "Zertifizierungen",
      },
    },
    experience: {
      eyebrow: "Berufserfahrung",
      heading: "Track Record",
      subtitle:
        "Fokus auf das Wesentliche: Enterprise-Data-Plattformen, Cloud-Architektur und KI-gestützte Datenprodukte.",
      current: "Aktuell",
      stackLabel: "Stack",
      highlights: [
        { value: "4+", label: "Jahre Erfahrung" },
        { value: "Azure", label: "Cloud" },
        { value: "GCP", label: "Cloud" },
        { value: "2x", label: "Zertifiziert" },
      ],
      items: [
        {
          period: "seit 2021",
          role: "Senior Cloud Data Engineer",
          context: "Enterprise Data & AI",
          focus: "Data Warehousing · Databricks · AI Governance",
          description:
            "Aufbau skalierbarer Datenplattformen in Azure und Google Cloud. Entwicklung von ETL-Pipelines, Enrichment-Workflows und Governance-Frameworks für Enterprise-Kunden.",
          tags: ["Azure Data Factory", "Databricks", "Azure SQL", "Power BI"],
          accent: "rgba(0, 210, 255, 0.35)",
          current: true,
        },
        {
          period: "2020 – 2021",
          role: "Data Engineering & Analytics",
          context: "Enterprise Analytics",
          focus: "Analytics & AI · Enterprise Data Management",
          description:
            "Einstieg in Enterprise-Analytics, BI-Reporting und erste Cloud-Data-Projekte im dualen Studium.",
          tags: ["BI", "SQL", "Analytics"],
          accent: "rgba(167, 139, 250, 0.3)",
        },
        {
          period: "2017 – 2019",
          role: "Technische Projekte & Infrastruktur",
          context: "Bildungseinrichtungen & Startups",
          focus: "Rechenzentren · AR/VR-Projekte",
          description:
            "Technische Betreuung, Medieninfrastruktur und Entwicklung von AR/VR-Anwendungen in agilen Teams.",
          tags: ["AR/VR", "Scrum", "Infrastruktur"],
          accent: "rgba(16, 185, 129, 0.3)",
        },
      ],
    },
    skills: {
      eyebrow: "Expertise",
      heading: "Skills & Tech Stack",
      subtitle:
        "Technologien und Frameworks, mit denen ich Enterprise-Datenlandschaften baue und optimiere.",
      certified: "Zertifiziert:",
      main: [
        {
          iconKey: "Cloud",
          title: "Data Engineering & Cloud",
          accent: "rgba(0, 162, 255, 0.35)",
          description:
            "Data Warehouses, Data Lakes und Medallion-Architekturen. Robuste Exportstrecken und ETL/ELT-Pipelines in Azure und GCP.",
          tags: ["Azure Data Factory", "Synapse Analytics", "Azure SQL", "BigQuery", "App Engine"],
        },
        {
          iconKey: "BrainCircuit",
          title: "Databricks & ML/AI",
          accent: "rgba(255, 54, 0, 0.35)",
          description:
            "Enrichment-Pipelines, AutoML-Feature-Generierung und MLflow-Tracking. Produktive Übergabe in Databricks Jobs und NLP-Trendanalysen.",
          tags: ["Databricks", "AutoML", "MLflow", "PySpark", "NLP"],
        },
        {
          iconKey: "ShieldCheck",
          title: "AI Governance & Tooling",
          accent: "rgba(167, 139, 250, 0.35)",
          description:
            "Governance-Frameworks für KI-Projekte: Guardrails, Prompt-Linting, CI/CD-Review-Gates sowie Prompting-Kataloge und Copilot-Templates.",
          tags: ["AI Governance", "Guardrails", "Prompt-Linting", "CI/CD Gates", "Copilot"],
        },
      ],
      secondary: [
        {
          iconKey: "Code2",
          title: "Programmierung",
          accent: "rgba(244, 114, 182, 0.3)",
          tags: ["Python", "PySpark", "T-SQL", "Java", "JavaScript", "Bash"],
        },
        {
          iconKey: "Database",
          title: "Datenbanken",
          accent: "rgba(16, 185, 129, 0.3)",
          tags: ["MS SQL", "Synapse", "PostgreSQL", "MongoDB", "Cassandra", "Neo4j"],
        },
        {
          iconKey: "BarChart3",
          title: "Reporting & Analytics",
          accent: "rgba(251, 191, 36, 0.3)",
          tags: ["Power BI", "Looker", "Data Studio", "Jupyter", "Tabular Editor", "Visio"],
        },
      ],
      certs: [
        "Google Professional Data Engineer",
        "Databricks Certified Data Engineer Associate",
      ],
    },
    certs: {
      eyebrow: "Zertifizierungen",
      heading: "Verifiziertes Wissen",
      subtitle:
        "Offiziell zertifiziert in den beiden führenden Data-Engineering-Plattformen.",
      verified: "Verifiziert",
      active: "Aktiv",
      items: [
        {
          letter: "G",
          issuer: "Google Cloud",
          title: "Professional Data Engineer",
          description: "Design und Bau skalierbarer Data-Engineering-Systeme auf GCP.",
          color: "#4285f4",
          accent: "rgba(66, 133, 244, 0.45)",
        },
        {
          letter: "D",
          issuer: "Databricks",
          title: "Certified Data Engineer Associate",
          description: "Delta Lake, Spark, Pipelines und Production-Deployments.",
          color: "#ff3600",
          accent: "rgba(255, 54, 0, 0.45)",
        },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      heading: "Lass uns reden",
      subtitle:
        "Ob neue Herausforderungen im Data Engineering, KI-Projekte oder spannende Diskussionen über skalierbare Datenarchitekturen – ich freue mich auf deine Nachricht.",
      btnEmail: "E-Mail senden",
      btnLinkedin: "LinkedIn",
      links: {
        email: { label: "E-Mail", value: "fatlindazemi@gmail.com", href: "mailto:fatlindazemi@gmail.com" },
        phone: { label: "Telefon", value: "+49 160 92225626", href: "tel:+4916092225626" },
        location: { label: "Standort", value: "Bielefeld, Deutschland", href: "#" },
        linkedin: { label: "LinkedIn", value: "linkedin.com/in/fatlindazemi", href: "#" },
        github: { label: "GitHub", value: "github.com/fatlindazemi", href: "#" },
      },
      footer: "© {{year}} Fatlind Azemi. Senior Cloud Data Engineer & AI Expert.",
    },
  },
  en: {
    meta: {
      title: "Fatlind Azemi | Senior Cloud Data Engineer & AI Expert",
      description:
        "Portfolio of Fatlind Azemi, Senior Cloud Data Engineer and AI Expert specializing in Azure, Databricks, and AI-Driven Analytics.",
    },
    nav: {
      intro: "Intro",
      about: "About",
      experience: "Experience",
      skills: "Skills",
      certs: "Certs",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Senior Cloud Data Engineer & AI Expert",
      subtitle:
        "I build scalable data ecosystems, AI pipelines, and governance frameworks for enterprise companies.",
      ctaPrimary: "Let's talk",
      ctaSecondary: "Track Record",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "About me",
      heading: "The human behind the data",
      p1: "As a Senior Cloud Data Engineer, I combine technical depth with business understanding. I build scalable data ecosystems in Azure and Google Cloud.",
      p2: "From data warehouses to Databricks pipelines to AI governance – I develop solutions that empower companies to use data as a competitive advantage.",
      stats: {
        experience: "Years of experience",
        platforms: "Cloud platforms",
        certs: "Certifications",
      },
    },
    experience: {
      eyebrow: "Experience",
      heading: "Track Record",
      subtitle:
        "Focus on the essentials: enterprise data platforms, cloud architecture, and AI-powered data products.",
      current: "Current",
      stackLabel: "Stack",
      highlights: [
        { value: "4+", label: "Years of experience" },
        { value: "Azure", label: "Cloud" },
        { value: "GCP", label: "Cloud" },
        { value: "2x", label: "Certified" },
      ],
      items: [
        {
          period: "since 2021",
          role: "Senior Cloud Data Engineer",
          context: "Enterprise Data & AI",
          focus: "Data Warehousing · Databricks · AI Governance",
          description:
            "Building scalable data platforms in Azure and Google Cloud. Development of ETL pipelines, enrichment workflows, and governance frameworks for enterprise clients.",
          tags: ["Azure Data Factory", "Databricks", "Azure SQL", "Power BI"],
          accent: "rgba(0, 210, 255, 0.35)",
          current: true,
        },
        {
          period: "2020 – 2021",
          role: "Data Engineering & Analytics",
          context: "Enterprise Analytics",
          focus: "Analytics & AI · Enterprise Data Management",
          description:
            "Entry into enterprise analytics, BI reporting, and first cloud data projects during a dual study program.",
          tags: ["BI", "SQL", "Analytics"],
          accent: "rgba(167, 139, 250, 0.3)",
        },
        {
          period: "2017 – 2019",
          role: "Technical Projects & Infrastructure",
          context: "Educational Institutions & Startups",
          focus: "Data Centers · AR/VR Projects",
          description:
            "Technical support, media infrastructure, and development of AR/VR applications in agile teams.",
          tags: ["AR/VR", "Scrum", "Infrastructure"],
          accent: "rgba(16, 185, 129, 0.3)",
        },
      ],
    },
    skills: {
      eyebrow: "Expertise",
      heading: "Skills & Tech Stack",
      subtitle:
        "Technologies and frameworks I use to build and optimize enterprise data landscapes.",
      certified: "Certified:",
      main: [
        {
          iconKey: "Cloud",
          title: "Data Engineering & Cloud",
          accent: "rgba(0, 162, 255, 0.35)",
          description:
            "Data warehouses, data lakes, and medallion architectures. Robust export pipelines and ETL/ELT pipelines in Azure and GCP.",
          tags: ["Azure Data Factory", "Synapse Analytics", "Azure SQL", "BigQuery", "App Engine"],
        },
        {
          iconKey: "BrainCircuit",
          title: "Databricks & ML/AI",
          accent: "rgba(255, 54, 0, 0.35)",
          description:
            "Enrichment pipelines, AutoML feature generation, and MLflow tracking. Production handover in Databricks Jobs and NLP trend analysis.",
          tags: ["Databricks", "AutoML", "MLflow", "PySpark", "NLP"],
        },
        {
          iconKey: "ShieldCheck",
          title: "AI Governance & Tooling",
          accent: "rgba(167, 139, 250, 0.35)",
          description:
            "Governance frameworks for AI projects: guardrails, prompt linting, CI/CD review gates, prompt catalogs, and Copilot templates.",
          tags: ["AI Governance", "Guardrails", "Prompt-Linting", "CI/CD Gates", "Copilot"],
        },
      ],
      secondary: [
        {
          iconKey: "Code2",
          title: "Programming",
          accent: "rgba(244, 114, 182, 0.3)",
          tags: ["Python", "PySpark", "T-SQL", "Java", "JavaScript", "Bash"],
        },
        {
          iconKey: "Database",
          title: "Databases",
          accent: "rgba(16, 185, 129, 0.3)",
          tags: ["MS SQL", "Synapse", "PostgreSQL", "MongoDB", "Cassandra", "Neo4j"],
        },
        {
          iconKey: "BarChart3",
          title: "Reporting & Analytics",
          accent: "rgba(251, 191, 36, 0.3)",
          tags: ["Power BI", "Looker", "Data Studio", "Jupyter", "Tabular Editor", "Visio"],
        },
      ],
      certs: [
        "Google Professional Data Engineer",
        "Databricks Certified Data Engineer Associate",
      ],
    },
    certs: {
      eyebrow: "Certifications",
      heading: "Verified Knowledge",
      subtitle:
        "Officially certified on the two leading data engineering platforms.",
      verified: "Verified",
      active: "Active",
      items: [
        {
          letter: "G",
          issuer: "Google Cloud",
          title: "Professional Data Engineer",
          description: "Design and build scalable data engineering systems on GCP.",
          color: "#4285f4",
          accent: "rgba(66, 133, 244, 0.45)",
        },
        {
          letter: "D",
          issuer: "Databricks",
          title: "Certified Data Engineer Associate",
          description: "Delta Lake, Spark, pipelines, and production deployments.",
          color: "#ff3600",
          accent: "rgba(255, 54, 0, 0.45)",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's talk",
      subtitle:
        "Whether it's new challenges in data engineering, AI projects, or exciting discussions about scalable data architectures – I look forward to your message.",
      btnEmail: "Send E-Mail",
      btnLinkedin: "LinkedIn",
      links: {
        email: { label: "E-Mail", value: "fatlindazemi@gmail.com", href: "mailto:fatlindazemi@gmail.com" },
        phone: { label: "Phone", value: "+49 160 92225626", href: "tel:+4916092225626" },
        location: { label: "Location", value: "Bielefeld, Germany", href: "#" },
        linkedin: { label: "LinkedIn", value: "linkedin.com/in/fatlindazemi", href: "#" },
        github: { label: "GitHub", value: "github.com/fatlindazemi", href: "#" },
      },
      footer: "© {{year}} Fatlind Azemi. Senior Cloud Data Engineer & AI Expert.",
    },
  },
} as const;

function getValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const raw = getValue(translations[locale], key);
  if (typeof raw !== "string") return key;
  if (!vars) return raw;
  return raw.replace(/\{\{(\w+)\}\}/g, (_, name) => String(vars[name] ?? ""));
}

export function getMeta(locale: Locale): SiteMeta {
  return {
    title: t(locale, "meta.title"),
    description: t(locale, "meta.description"),
  };
}

export function getNavItems(locale: Locale): NavItem[] {
  return [
    { id: "hero", label: t(locale, "nav.intro") },
    { id: "about", label: t(locale, "nav.about") },
    { id: "experience", label: t(locale, "nav.experience") },
    { id: "skills", label: t(locale, "nav.skills") },
    { id: "certs", label: t(locale, "nav.certs") },
    { id: "contact", label: t(locale, "nav.contact") },
  ];
}

export function getAboutStats(locale: Locale): AboutStat[] {
  return [
    { iconKey: "Briefcase", label: t(locale, "about.stats.experience"), value: "4+" },
    { iconKey: "Cloud", label: t(locale, "about.stats.platforms"), value: "Azure / GCP" },
    { iconKey: "Award", label: t(locale, "about.stats.certs"), value: "2" },
  ];
}

export function getExperience(locale: Locale): ExperienceItem[] {
  return (getValue(translations[locale], "experience.items") as ExperienceItem[]) ?? [];
}

export function getHighlights(locale: Locale): HighlightItem[] {
  return (getValue(translations[locale], "experience.highlights") as HighlightItem[]) ?? [];
}

export function getMainSkills(locale: Locale): MainSkill[] {
  return (getValue(translations[locale], "skills.main") as MainSkill[]) ?? [];
}

export function getSecondarySkills(locale: Locale): SecondarySkill[] {
  return (getValue(translations[locale], "skills.secondary") as SecondarySkill[]) ?? [];
}

export function getCerts(locale: Locale): CertItem[] {
  return (getValue(translations[locale], "certs.items") as CertItem[]) ?? [];
}

export function getContactLinks(locale: Locale): ContactLink[] {
  const links = getValue(translations[locale], "contact.links") as Record<string, Omit<ContactLink, "iconKey">>;
  const order: ContactLink["iconKey"][] = ["Mail", "Phone", "MapPin", "Linkedin", "Github"];
  return order.map((iconKey) => ({
    iconKey,
    ...links[iconKey.toLowerCase()],
  }));
}
