#!/bin/bash
# Build script for Cloudflare Pages

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Next.js application..."
npm run build

echo "☁️  Building for Cloudflare Pages..."
npx @cloudflare/next-on-pages

echo "✅ Build complete!"
echo "Output directory: .vercel/output/static"
