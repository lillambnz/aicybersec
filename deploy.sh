#!/bin/bash
# Complete deployment script for AI CyberSec to Cloudflare Pages

echo "🚀 Deploying AI CyberSec to Cloudflare Pages..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Build the Next.js site
echo "🔨 Building Next.js site..."
npm run build

# Step 3: Build for Cloudflare Pages
echo "☁️  Building for Cloudflare Pages..."
npx @cloudflare/next-on-pages

# Step 4: Deploy to Cloudflare Pages
echo "🚢 Deploying to Cloudflare..."
npx wrangler pages deploy .vercel/output/static --project-name=aicybersec

echo "✅ Deployment complete!"
echo "Your site will be live at: https://aicybersec.pages.dev"
