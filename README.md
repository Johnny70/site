# johnnyjakobsson.com

Personal website and portfolio. React frontend, FastAPI backend, deployed on a Hetzner VPS.

## Stack

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Python, FastAPI
- **Deploy:** Bash script via scp + rsync to Hetzner VPS, served by nginx

## Structure

```
src/          React frontend (pages, components, API client)
server/       FastAPI backend (routes, storage, auth)
server/data/  Content as JSON files
public/       Static assets (robots.txt, sitemap.xml)
docs/         Code standards (code.md) and dev log (devlog.json)
```

## Development

```bash
# Frontend
npm install
npm run dev        # Vite dev server on :5173

# Backend
pip install -r server/requirements.txt
python -m server.main   # FastAPI on :8000

# Tests
npm run test       # Vitest
pytest             # Python
```

## Deploy

```bash
bash deploy.sh
```

Builds the frontend, syncs frontend and backend to the server, restarts the API service, and verifies the response.
