# Deploy

## Ablauf

```
PR  ──►  Build + QA-Suite (Desktop/Mobile, Chromium/WebKit)   ← Gate, muss grün sein
                    │
Merge nach main ────┴──►  getestetes Artefakt wird deployed  ──►  https://fatlind-azemi.de
```

**Der Merge ist die Abnahme.** Es wird genau das Artefakt deployed, das im `test`-Job
gebaut und getestet wurde — nicht ein zweiter, unabhängiger Build.

## Was der Deploy macht

1. `dist/` per `rsync` nach `<VPS_APP_DIR>/.dist.new-<stamp>/` (noch nicht live)
2. atomarer Tausch: `dist` → `dist.bak.<stamp>`, dann `.dist.new-<stamp>` → `dist`
   (nginx liefert aus `dist`; dazwischen gibt es kein halb geschriebenes Verzeichnis)
3. die letzten **3** Rollback-Kopien bleiben erhalten
4. Abschlussprüfung: `/` und `/en/` müssen HTTP 200 liefern, sonst schlägt der Job fehl

## Secrets

Repository → Settings → Secrets and variables → Actions. **Alle vier sind Secrets**,
damit ein öffentliches Repository nichts über den Server verrät:

| Secret | Bedeutung |
|---|---|
| `VPS_HOST` | Host des Ziel-VPS |
| `VPS_USER` | SSH-User auf diesem Host |
| `VPS_APP_DIR` | absoluter Pfad des von nginx ausgelieferten App-Verzeichnisses |
| `VPS_SSH_KEY` | privater Schlüssel zu einem Public Key, der serverseitig als `github-actions-deploy` in `~/.ssh/authorized_keys` steht |

Zusätzlich: Environment `production` anlegen und dort optional **Required reviewers**
setzen — dann wartet der Deploy auf eine manuelle Freigabe.

## Rollback

```bash
ssh "$VPS_USER@$VPS_HOST"
cd "$VPS_APP_DIR"
ls -1dt dist.bak.*            # gewünschten Stand wählen
rm -rf dist && mv dist.bak.<stamp> dist
```

## Manuell auslösen / lokal prüfen

```bash
gh workflow run "CI & Deploy" --repo FatlindAzemi/fatlind-azemi-portfolio

# lokal (identische Suite, im Playwright-Image):
~/work/bin/qa.sh fatlind-azemi-portfolio

# gegen eine laufende Umgebung (Staging oder Produktion):
QA_BASE_URL=https://fatlind-azemi.de ~/work/bin/qa.sh fatlind-azemi-portfolio
```

Für den ersten Lauf nach dem Anlegen der Secrets: `gh secret set VPS_APP_DIR` usw.
