# Wault website

[![Netlify Status](https://api.netlify.com/api/v1/badges/a28f709c-d6ec-45c1-be5a-f0d9afc661f2/deploy-status)](https://app.netlify.com/sites/wault/deploys)
![License](https://img.shields.io/github/license/wault-app/website)
![Stars](https://img.shields.io/github/stars/wault-app/website)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

## Deployment

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/wault-app/website"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" height="32px"></a>

<a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/wault-app/website/tree/main"><img src="https://www.deploytodo.com/do-btn-blue.svg" alt="Deploy to Digitalocean" height="32px"></a>

## Self-hosting

1. Pull the repository to your local computer
2. Install npm dependencies via `npm install`
3. Add an environmental variable called `NODE_ENV` and set the value for `production`
4. Build the project with `npm run build`
5. Run the project with `npm run start`
6. The server will listen on port 3000
