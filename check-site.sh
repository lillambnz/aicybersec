#!/bin/bash
# Quick diagnostic script for your Cloudflare Pages site

echo "🔍 Checking aicybersec.sheheryara.bid..."
echo ""

echo "1. Testing basic connectivity..."
curl -I -s https://aicybersec.sheheryara.bid 2>&1 | head -5
echo ""

echo "2. Testing with browser user agent..."
curl -A "Mozilla/5.0" -s https://aicybersec.sheheryara.bid 2>&1 | head -5
echo ""

echo "3. Checking for Cloudflare headers..."
curl -I -s https://aicybersec.sheheryara.bid 2>&1 | grep -i "cf-" | head -5
echo ""

echo "4. Testing alternative domain (if you have Cloudflare Pages default)..."
echo "Try: https://aicybersec.pages.dev"
curl -I -s https://aicybersec.pages.dev 2>&1 | head -5
echo ""

echo "✅ Diagnostic complete!"
echo ""
echo "If you see HTML content above, site is working!"
echo "If you see 'Access denied', check Cloudflare security settings."
