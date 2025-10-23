# Deployment Guide - AI CyberSec on Cloudflare

This guide will walk you through deploying your AI CyberSec website to Cloudflare Pages with all the necessary configurations.

## Prerequisites

1. Cloudflare account (free tier is sufficient)
2. GitHub account
3. Wrangler CLI installed: `npm install -g wrangler`
4. Node.js 18+ installed

## Step-by-Step Deployment

### Step 1: Authenticate with Cloudflare

```bash
wrangler login
```

This will open a browser window for you to authorize Wrangler.

### Step 2: Create Cloudflare D1 Database

```bash
# Create the database
wrangler d1 create aicybersec_db
```

You'll get output like:
```
✅ Successfully created DB 'aicybersec_db'

[[d1_databases]]
binding = "DB"
database_name = "aicybersec_db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copy the `database_id`** and update it in `wrangler.toml`.

### Step 3: Initialize Database Schema

```bash
# Run the schema file to create tables
wrangler d1 execute aicybersec_db --file=./schema.sql
```

Verify tables were created:
```bash
wrangler d1 execute aicybersec_db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

### Step 4: Create KV Namespace

```bash
# Create KV namespace for production
wrangler kv:namespace create KV

# Optional: Create preview namespace for staging
wrangler kv:namespace create KV --preview
```

You'll get:
```
✅ Success!
Add the following to your wrangler.toml:
{ binding = "KV", id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
```

**Update the `id` in `wrangler.toml`**.

### Step 5: Create R2 Bucket

```bash
wrangler r2 bucket create aicybersec-assets
```

### Step 6: Push to GitHub

```bash
git add .
git commit -m "Initial commit: AI CyberSec website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aicybersec.git
git push -u origin main
```

### Step 7: Create Cloudflare Pages Project

#### Option A: Via Dashboard (Recommended for first-time)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Authorize Cloudflare to access your GitHub
6. Select your `aicybersec` repository
7. Configure build settings:
   - **Project name**: `aicybersec` (or your preferred name)
   - **Production branch**: `main`
   - **Framework preset**: `Next.js`
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
8. Click **Save and Deploy**

#### Option B: Via Wrangler CLI

```bash
# Build the project
npm run build
npm run pages:build

# Deploy to Cloudflare Pages
wrangler pages deploy .vercel/output/static --project-name=aicybersec
```

### Step 8: Configure Bindings in Cloudflare Pages

After your project is created, you need to bind the services:

1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to **Settings** > **Functions**
3. Scroll to **Bindings**

Add the following bindings:

#### D1 Database Binding
- **Variable name**: `DB`
- **D1 database**: Select `aicybersec_db`

#### KV Namespace Binding
- **Variable name**: `KV`
- **KV namespace**: Select your KV namespace

#### R2 Bucket Binding
- **Variable name**: `R2`
- **R2 bucket**: Select `aicybersec-assets`

#### Workers AI Binding
- **Variable name**: `AI`
- **Type**: AI (no additional configuration needed)

#### Analytics Engine Binding (Optional)
- **Variable name**: `ANALYTICS`
- **Dataset**: Create or select dataset

### Step 9: Add Environment Variables

In **Settings** > **Environment Variables**, add:

- `SITE_URL`: Your site URL (e.g., `https://aicybersec.pages.dev`)
- `CONTACT_EMAIL`: Your contact email

### Step 10: Deploy and Test

Your site should now be live! The URL will be:
- Production: `https://aicybersec.pages.dev`
- Or your custom domain if configured

### Step 11: Set Up Custom Domain (Optional)

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `aicybersec.com`)
4. Follow the instructions to update DNS records
5. Cloudflare will automatically provision SSL certificate

## Testing the Deployment

### Test API Endpoints

```bash
# Test contact form
curl -X POST https://aicybersec.pages.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'

# Test AI chat
curl -X POST https://aicybersec.pages.dev/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is SQL injection?"}'

# Test threat scan
curl -X POST https://aicybersec.pages.dev/api/threat-scan \
  -H "Content-Type: application/json" \
  -d '{"type":"code","content":"SELECT * FROM users WHERE id = \u0027 + userInput + \u0027"}'
```

### Verify Database

```bash
# Check contacts
wrangler d1 execute aicybersec_db --command="SELECT * FROM contacts LIMIT 5"

# Check scans
wrangler d1 execute aicybersec_db --command="SELECT * FROM scans LIMIT 5"
```

### Check KV Store

```bash
# List all keys
wrangler kv:key list --namespace-id=YOUR_KV_NAMESPACE_ID
```

## Continuous Deployment

Once set up, any push to your `main` branch will automatically trigger a new deployment:

```bash
# Make changes
git add .
git commit -m "Update services section"
git push

# Cloudflare Pages will automatically build and deploy
```

## Monitoring and Analytics

### View Deployment Logs
1. Go to Pages project > **Deployments**
2. Click on any deployment to see build logs

### Monitor Functions
1. Go to Pages project > **Functions**
2. View real-time logs and analytics

### Check D1 Usage
```bash
wrangler d1 info aicybersec_db
```

### Check KV Usage
View usage in Cloudflare Dashboard > Workers & Pages > KV

## Troubleshooting

### Build Fails

Check build logs in Cloudflare Dashboard. Common issues:
- Node version mismatch: Ensure Next.js version is compatible
- Missing dependencies: Run `npm install` locally first
- Environment variables: Verify all bindings are configured

### API Endpoints Return 500

- Check function logs in Cloudflare Dashboard
- Verify bindings are correctly set up
- Test database connection with Wrangler

### Database Errors

```bash
# Re-run schema if needed
wrangler d1 execute aicybersec_db --file=./schema.sql

# Check table structure
wrangler d1 execute aicybersec_db --command="PRAGMA table_info(contacts)"
```

### Rate Limiting Issues

Clear KV namespace:
```bash
wrangler kv:key delete "rate_limit:SOME_KEY" --namespace-id=YOUR_NAMESPACE_ID
```

## Scaling Considerations

The free tier limits:
- **Pages**: 500 builds/month, unlimited requests
- **Workers**: 100,000 requests/day
- **D1**: 5 GB storage, 100,000 reads/day, 50,000 writes/day
- **KV**: 1 GB storage, 100,000 reads/day, 1,000 writes/day
- **R2**: 10 GB storage
- **Workers AI**: 10,000 neurons/day

If you exceed these limits, consider:
1. Upgrading to Cloudflare Workers Paid plan ($5/month)
2. Implementing aggressive caching
3. Optimizing database queries
4. Using R2 for large file storage

## Rollback

If a deployment fails:
1. Go to Pages project > **Deployments**
2. Find a working deployment
3. Click **...** menu > **Rollback to this deployment**

## Performance Optimization

After deployment:

1. **Enable HTTP/3** in Cloudflare Dashboard > Speed > Optimization
2. **Enable Auto Minify** for HTML, CSS, JS
3. **Enable Brotli compression**
4. **Configure caching rules** for static assets
5. **Set up Page Rules** for additional optimization

## Security Hardening

1. **Enable Bot Fight Mode** (free tier)
2. **Configure WAF rules** (requires paid plan)
3. **Set up rate limiting** at edge (in addition to KV-based)
4. **Enable DNSSEC** for custom domains
5. **Configure security headers** in Pages

## Next Steps

1. Set up monitoring with Cloudflare Analytics
2. Configure email notifications for form submissions
3. Add payment integration (Stripe)
4. Implement user authentication
5. Create admin dashboard

## Support

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Cloudflare AI Docs](https://developers.cloudflare.com/workers-ai/)

---

Your AI CyberSec website is now live on Cloudflare's edge network! 🚀
