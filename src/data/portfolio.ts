import type { PortfolioData } from '../types'

export const portfolioData: PortfolioData = {
  name: 'Fatlind Azemi',
  title: 'Software & Data Engineer',
  subtitle: 'Building scalable data infrastructure and modern digital products.',
  bio: [
    'I build data pipelines and distributed systems that turn raw data into decisions. My work spans the full stack — from architecting lakehouse platforms on Azure and GCP to crafting responsive frontends with React and Flutter. I believe clean architecture and well-tested code are the foundation of any system that lasts.',
    'Over the past several years, I have designed ETL pipelines processing terabytes of data daily, built real-time analytics dashboards for enterprise forecasting, and developed full-stack SaaS applications from concept to deployment. I thrive at the intersection of data engineering and product development, where technical infrastructure meets user experience.',
    'When I am not shipping code, I am exploring AI automation workflows, contributing to open-source projects, or refining my approach to building maintainable, observable systems. I care deeply about developer experience, documentation, and leaving things better than I found them.',
  ],
  email: 'YOUR_EMAIL_HERE', // TODO: Replace with actual email
  expertise: [
    {
      title: 'Data Engineering & Architecture',
      subtitle: 'Building robust pipelines and scalable data platforms',
      skills: [
        {
          name: 'Azure Cloud',
          category: 'data',
          terminalCommand: 'az deployment group create --resource-group prod-dwh --template-file infra/main.bicep',
          terminalOutput: [
            'Deploying DataFactory, Synapse, and ADLS Gen2...',
            'Provisioning complete — 3/3 resources ready',
            'Linked services validated: 12/12 connections OK',
          ],
        },
        {
          name: 'Google Cloud Platform',
          category: 'data',
          terminalCommand: 'gcloud dataflow jobs run streaming-pipeline --region europe-west1 --staging-location gs://data-lake/staging',
          terminalOutput: [
            'Submitting Dataflow job: streaming-pipeline',
            'Workers scaling up — 8 n2-standard-2 instances',
            'Throughput: 24K events/sec — latency p99: 340ms',
          ],
        },
        {
          name: 'Databricks',
          category: 'data',
          terminalCommand: 'databricks jobs run-now --job-id 47 --notebook-params \'{"env": "prod", "full_refresh": false}\'',
          terminalOutput: [
            'Job 47 triggered — cluster autoscaling 2–16 nodes',
            'Notebook `forecast_engine` — stage 7/12 complete',
            'Run finished: 3.2M rows processed in 14.7 min',
          ],
        },
        {
          name: 'PySpark & Spark SQL',
          category: 'data',
          terminalCommand: 'spark-submit --master yarn --deploy-mode cluster --num-executors 24 etl/transform_orders.py',
          terminalOutput: [
            'Application ID: application_171201_0847',
            'Stage 4: map at OrdersTransformer.scala:89 — 12/12 done',
            'Shuffle write: 47.2 GB — executors: 24/24 healthy',
          ],
        },
        {
          name: 'Python & SQL',
          category: 'data',
          terminalCommand: 'python dags/run_pipeline.py --config configs/prod.yaml --target bronze',
          terminalOutput: [
            'Airflow DAG `data_platform_main` — 2026-05-14T06:00:00',
            'Bronze layer: 214 partitions ingested (112 GB)',
            'Silver layer: quality checks passed — 99.97% valid rows',
          ],
        },
        {
          name: 'Lakehouse & ETL Pipelines',
          category: 'data',
          terminalCommand: 'dbt run --select models/marts/finance --vars \'{month_end: true}\'',
          terminalOutput: [
            'Running dbt — models/marts/finance: 7 of 7',
            'Refreshing incremental model `fct_revenue` — 4.1M new rows',
            'Tests passed: 34/34 — docs generated: dbt-docs/latest',
          ],
        },
      ],
    },
    {
      title: 'Product & App Development',
      subtitle: 'Crafting modern applications with clean architecture',
      skills: [
        {
          name: 'React & Next.js',
          category: 'product',
          terminalCommand: 'npm run build -- --filter @web/dashboard && npm run preview',
          terminalOutput: [
            'Building production bundle — Next.js 15, React 19',
            'Lighthouse scores: 98/100 Performance, 100/100 Accessibility',
            'Deployed to Vercel — 12 edge regions warm',
          ],
        },
        {
          name: 'Flutter & Dart',
          category: 'product',
          terminalCommand: 'flutter build appbundle --release --target-platform android-arm,android-arm64',
          terminalOutput: [
            'Compiling Dart to native — 3.2s (ahead-of-time)',
            'App bundle: 24.7 MB — ProGuard: 18% size reduction',
            'Play Store internal track — version 2.4.1 ready',
          ],
        },
        {
          name: 'TypeScript',
          category: 'product',
          terminalCommand: 'npx tsc --strict --noUncheckedIndexedAccess --noEmit && npx vitest run',
          terminalOutput: [
            'TypeScript 5.8 — strict mode, no errors (247 files)',
            'Vitest: 416 tests passed, 0 failed — coverage 94.2%',
            'Running ESLint — 0 warnings, 0 errors',
          ],
        },
        {
          name: 'API Design & Backend',
          category: 'product',
          terminalCommand: 'hono serve --port 3000 --node-compat && curl -s http://localhost:3000/health | jq .',
          terminalOutput: [
            'Hono server listening on 0.0.0.0:3000',
            'Health check: {"status":"ok","version":"2.7.1","uptime_sec":1423}',
            'OpenAPI spec generated — 37 endpoints documented',
          ],
        },
        {
          name: 'AI & Automation',
          category: 'product',
          terminalCommand: 'python agents/classify_intent.py --model gpt-4o --input reviews_batch_07.jsonl --output ./classified',
          terminalOutput: [
            'Loading model — batch size: 512, max tokens: 2048',
            'Classifying 12,400 reviews — intent accuracy: 96.3%',
            'Writing results — 11.2K actionable intents extracted',
          ],
        },
        {
          name: 'Infrastructure as Code',
          category: 'product',
          terminalCommand: 'terraform apply -auto-approve -var-file=envs/prod.tfvars',
          terminalOutput: [
            'Terraform 1.10 — planning 14 resources, 0 to destroy',
            'Creating CloudFront distribution, ECS service, RDS read replica',
            'Apply complete — outputs: endpoint_dns, db_arn, cdn_id',
          ],
        },
      ],
    },
  ],
  projects: [
    {
      id: 'forecast-engine',
      title: 'Enterprise Forecasting Engine',
      subtitle: 'ML-powered demand forecasting at petabyte scale',
      description:
        'A distributed forecasting platform that processes billions of historical records to predict demand across 200+ product categories. Built on Databricks with PySpark and MLflow, the system reduced inventory waste by 40% while improving on-shelf availability across a global retail network.',
      techStack: ['Databricks', 'PySpark', 'MLflow', 'Azure', 'Delta Lake', 'dbt'],
      metrics: ['40% reduction in inventory waste', '12M+ forecasted SKU-days/month', '99.3% model uptime SLA'],
      category: 'data',
      dataVizType: 'line-chart',
    },
    {
      id: 'media-trend-api',
      title: 'Media Trend Analysis API',
      subtitle: 'Real-time content intelligence and trend detection',
      description:
        'A serverless API that ingests, processes, and indexes millions of articles and social media posts daily. Uses NLP pipelines running on GCP Dataflow to extract entities, classify sentiment, and detect emerging trends — serving results through a low-latency GraphQL endpoint.',
      techStack: ['GCP', 'Dataflow', 'BigQuery', 'GraphQL', 'NLP', 'Cloud Functions'],
      metrics: ['2.1M articles indexed daily', 'Trend detection latency < 90 sec', '94% sentiment classification F1'],
      category: 'data',
      dataVizType: 'node-graph',
    },
    {
      id: 'saas-utility-platform',
      title: 'SaaS Utility Platform',
      subtitle: 'All-in-one utility management for property managers',
      description:
        'A full-stack SaaS application that simplifies utility billing, tenant invoicing, and consumption analytics for multi-unit property managers. Built with React, Hono, and PostgreSQL, the platform processes 50K+ monthly invoices and provides real-time dashboards with automated payment reconciliation.',
      techStack: ['React', 'Hono', 'TypeScript', 'PostgreSQL', 'Flutter', 'Stripe'],
      metrics: ['12,000 active monthly users', '99.9% platform uptime', '50K+ invoices processed/month'],
      category: 'product',
      dataVizType: 'bar-chart',
    },
  ],
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'YOUR_GITHUB_URL_HERE', // TODO: Replace with actual GitHub profile URL
      label: 'fatlindazemi',
      icon: 'github',
    },
    {
      platform: 'LinkedIn',
      url: 'YOUR_LINKEDIN_URL_HERE', // TODO: Replace with actual LinkedIn profile URL
      label: 'fatlindazemi',
      icon: 'linkedin',
    },
    {
      platform: 'Email',
      url: 'mailto:YOUR_EMAIL_HERE', // TODO: Replace with actual email address
      label: 'fatlind@example.com', // TODO: Replace with actual email address
      icon: 'mail',
    },
  ],
}
