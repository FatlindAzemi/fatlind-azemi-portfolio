import type { PortfolioData } from '../types'

export const portfolioDataEn: PortfolioData = {
  name: 'Fatlind Azemi',
  title: 'Software & Data Engineer',
  portrait: '/portrait.jpg',
  subtitle: 'Building scalable data infrastructure and modern digital products.',
  bio: [
    'I build data pipelines and distributed systems — from lakehouse architectures on Azure and GCP to production ML pipelines running on Databricks. On the frontend side I work with React and Flutter to ship interfaces people actually enjoy using. What drives me is making data useful, not just available.',
    'Over the years I have designed ETL pipelines moving terabytes daily, built real-time forecasting dashboards for enterprise retail, and taken full-stack SaaS apps from zero to production. I gravitate toward the messy middle — where data engineering meets product development and neither side quite speaks the same language.',
    'Outside of work I am exploring AI agent workflows, contributing to open-source projects, and constantly refining how I build observable, maintainable systems. Good documentation, clean CI/CD, and leaving things better than I found them matter to me.',
  ],
  email: 'fatlindazemi@gmail.com',
  expertise: [
    {
      title: 'Data Engineering & Architecture',
      subtitle: 'Lakehouse architectures and production ML pipelines on Azure & GCP',
      skills: [
        {
          name: 'Azure Cloud',
          category: 'data',
          terminalCommand: 'az deployment group create --resource-group prod-dwh --template-file infra/main.bicep',
          terminalOutput: [
            'Deploying DataFactory, Synapse, and ADLS Gen2...',
            'Provisioning: 3/3 resources ready — no errors',
            'Linked services: 12/12 OK, 1 deprecation warning (ADLS Gen1 SKU)',
          ],
        },
        {
          name: 'Google Cloud Platform',
          category: 'data',
          terminalCommand: 'gcloud dataflow jobs run streaming-pipeline --region europe-west1 --staging-location gs://data-lake/staging',
          terminalOutput: [
            'Submitted job: streaming-pipeline — ID 20260514_060000_847',
            'Autoscaling: 4 → 8 n2-standard-2 workers (CPU at 72%)',
            'Throughput: 24K events/sec | p99 latency: 340ms',
          ],
        },
        {
          name: 'Databricks',
          category: 'data',
          terminalCommand: 'databricks jobs run-now --job-id 47 --notebook-params \'{"env": "prod", "full_refresh": false}\'',
          terminalOutput: [
            'Triggered job 47 — cluster starting (runtime 15.4 LTS, 2–16 nodes)',
            'Notebook `forecast_engine`: stage 7/12 — 2.1M rows materialized',
            'Run finished: 3.2M rows, 14.7 min — checkpoints validated',
          ],
        },
        {
          name: 'PySpark & Spark SQL',
          category: 'data',
          terminalCommand: 'spark-submit --master yarn --deploy-mode cluster --num-executors 24 etl/transform_orders.py',
          terminalOutput: [
            'Application ID: application_171201_0847',
            'Stage 4/12: map at OrdersTransformer.scala:89 — 12/12 done',
            'Shuffle write: 47.2 GB — 24/24 executors healthy',
          ],
        },
        {
          name: 'Python & SQL',
          category: 'data',
          terminalCommand: 'python dags/run_pipeline.py --config configs/prod.yaml --target bronze',
          terminalOutput: [
            'DAG `data_platform_main` — run 2026-05-14T06:00:00 (47 tasks)',
            'Bronze: 214 partitions ingested — 112 GB, 0 retries',
            'Silver: quality checks passed — 99.97% valid, 0.03% quarantined',
          ],
        },
        {
          name: 'Lakehouse & ETL Pipelines',
          category: 'data',
          terminalCommand: 'dbt run --select models/marts/finance --vars \'{month_end: true}\'',
          terminalOutput: [
            'Running dbt — models/marts/finance: 7 of 7 complete',
            'Incremental `fct_revenue`: 4.1M rows upserted in 2m 14s',
            'Tests: 34/34 passed — docs at dbt-docs/latest',
          ],
        },
      ],
    },
    {
      title: 'Product & App Development',
      subtitle: 'End-to-end product development across web, mobile, and API surfaces',
      skills: [
        {
          name: 'React & Next.js',
          category: 'product',
          terminalCommand: 'npm run build -- --filter @web/dashboard && npm run preview',
          terminalOutput: [
            'Building production bundle — Next.js 15, React 19 (47 kB gzip)',
            'Lighthouse: 98 Perf, 100 Accessibility, 95 Best Practices',
            'Deployed to Vercel — 12 regions, cold start < 50ms',
          ],
        },
        {
          name: 'Flutter & Dart',
          category: 'product',
          terminalCommand: 'flutter build appbundle --release --target-platform android-arm,android-arm64',
          terminalOutput: [
            'Compiling Dart to native (ahead-of-time) — 3.2s',
            'Android bundle: 24.7 MB — ProGuard cut 18%',
            'Internal track v2.4.1 uploaded — review pending',
          ],
        },
        {
          name: 'TypeScript',
          category: 'product',
          terminalCommand: 'npx tsc --strict --noUncheckedIndexedAccess --noEmit && npx vitest run',
          terminalOutput: [
            'TypeScript 5.8 — strict mode, 247 files, 0 errors',
            'Vitest: 416/416 passed — line coverage 94.2%',
            'ESLint: 0 warnings, 0 errors — all clean',
          ],
        },
        {
          name: 'API Design & Backend',
          category: 'product',
          terminalCommand: 'hono serve --port 3000 --node-compat && curl -s http://localhost:3000/health | jq .',
          terminalOutput: [
            'Hono server started — 0.0.0.0:3000 (node-compat enabled)',
            'Health OK | v2.7.1 | uptime: 1423s | conn pool: 12/20',
            'OpenAPI spec: 37 endpoints, 6 groups — served at /docs',
          ],
        },
        {
          name: 'AI & Automation',
          category: 'product',
          terminalCommand: 'python agents/classify_intent.py --model gpt-4o --input reviews_batch_07.jsonl --output ./classified',
          terminalOutput: [
            'Loading gpt-4o — batch: 512, max_tokens: 2048, rate_limit: 10K tpm',
            'Classified 12,400 reviews — accuracy: 96.3% (confusion matrix saved)',
            'Wrote 11,234 actionable intents to ./classified/',
          ],
        },
        {
          name: 'Infrastructure as Code',
          category: 'product',
          terminalCommand: 'terraform apply -auto-approve -var-file=envs/prod.tfvars',
          terminalOutput: [
            'Terraform 1.10 — plan: 14 to create, 0 to destroy (env: prod)',
            '  + CloudFront distribution, ECS service, RDS read replica',
            'Apply complete — outputs written to prod-outputs.json',
          ],
        },
      ],
    },
  ],
  certifications: [
    {
      issuer: 'Google Cloud',
      name: 'Professional Data Engineer',
      image: '/certs/google-cloud-professional-data-engineer.png',
    },
    {
      issuer: 'Databricks',
      name: 'Data Engineer Associate',
      image: '/certs/databricks-data-engineer-associate.png',
    },
  ],
  projects: [
    {
      id: 'bw-to-fabric-migration',
      title: 'SAP BW to Fabric Migration',
      subtitle:
        'An in-house AI agent that migrates an SAP BW landscape onto Microsoft Fabric',
      description:
        'Migration of an SAP BW landscape onto Microsoft Fabric, run end to end by a purpose-built AI agent instead of by hand. The agent reads the source BW and HANA models, derives Fabric-native transformations, and validates every result against the original. The agent itself is the deliverable: its behaviour and tooling were engineered in-house on OpenCode, and the HANA foundation was built specifically to give it a precise, well-described surface to work against.',
      // TODO: Replace with your real numbers and wording
      techStack: [
        'SAP BW',
        'SAP HANA',
        'Microsoft Fabric',
        'OpenCode',
        'AI Agents',
        'Delta Lake',
      ],
      metrics: [
        'TODO: migrated object count',
        'TODO: manual effort reduced by …',
        'TODO: validation pass rate',
      ],
      category: 'data',
      vizKind: 'migration',
      vizCaption: 'Object migration status',
    },
    {
      id: 'enterprise-data-platform',
      title: 'Enterprise Data Platform',
      subtitle: 'Full platform build — ingestion through to the BI reporting layer',
      description:
        'Designed and delivered a data platform end to end: ingestion and orchestration, a medallion lakehouse, a governed semantic layer, and the BI reporting built on top of it. Landed and operated across Databricks, Microsoft Fabric, Azure Synapse and Azure SQL — one platform, one set of definitions, from raw source through to the reports the business actually opens.',
      // TODO: Replace with your real numbers and wording
      techStack: [
        'Databricks',
        'Microsoft Fabric',
        'Azure Synapse',
        'Azure SQL',
        'Delta Lake',
        'Power BI',
      ],
      metrics: [
        'TODO: number of source systems',
        'TODO: data volume processed',
        'TODO: BI reports / active users',
      ],
      category: 'data',
      vizKind: 'platform',
      vizCaption: 'Platform layers',
    },
    {
      id: 'forecast-engine',
      title: 'Enterprise Forecasting Engine',
      subtitle: 'Demand forecasting across 200+ product categories at petabyte scale',
      description:
        'Distributed forecasting platform processing billions of historical records to predict demand across 200+ product categories. Built on Databricks with PySpark and MLflow — reduced inventory waste by 40% while improving on-shelf availability across a global retail network.',
      techStack: ['Databricks', 'PySpark', 'MLflow', 'Azure', 'Delta Lake', 'dbt'],
      metrics: ['40% reduction in inventory waste', '12M+ forecasted SKU-days/month', '99.3% model uptime SLA'],
      category: 'data',
      vizKind: 'forecast',
      vizCaption: 'Forecast vs. actual demand',
    },
    {
      id: 'media-trend-api',
      title: 'Media Trend Analysis API',
      subtitle: 'Serverless NLP pipeline ingesting 2M+ articles daily for trend detection',
      description:
        'Serverless API ingesting, processing, and indexing millions of articles and social media posts daily. NLP pipelines on GCP Dataflow extract entities, classify sentiment, and detect emerging trends — served through a low-latency GraphQL endpoint.',
      techStack: ['GCP', 'Dataflow', 'BigQuery', 'GraphQL', 'NLP', 'Cloud Functions'],
      metrics: ['2.1M articles indexed daily', 'Trend detection latency < 90 sec', '94% sentiment classification F1'],
      category: 'data',
      vizKind: 'trends',
      vizCaption: 'Topic volume with burst detection',
    },
    {
      id: 'saas-utility-platform',
      title: 'SaaS Utility Platform',
      subtitle: 'Utility billing and consumption analytics for multi-unit properties',
      description:
        'Full-stack SaaS platform handling utility billing, tenant invoicing, and consumption analytics for multi-unit properties. Built with React, Hono, and PostgreSQL — processes 50K+ monthly invoices with automated payment reconciliation and real-time dashboards.',
      techStack: ['React', 'Hono', 'TypeScript', 'PostgreSQL', 'Flutter', 'Stripe'],
      metrics: ['12,000 active monthly users', '99.9% platform uptime', '50K+ invoices processed/month'],
      category: 'product',
      vizKind: 'billing',
      vizCaption: 'Invoices by payment status',
    },
  ],
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/FatlindAzemi',
      icon: 'github',
    },
    {
      platform: 'LinkedIn',
      url: 'https://de.linkedin.com/in/fatlind-azemi-082624352',
      icon: 'linkedin',
    },
    {
      platform: 'Email',
      url: 'mailto:fatlindazemi@gmail.com',
      icon: 'mail',
    },
  ],
}
