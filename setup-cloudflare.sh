#!/bin/bash
# Setup script for Cloudflare resources (D1, KV, R2)

echo "🔧 Setting up Cloudflare resources..."

# Create D1 Database
echo "📊 Creating D1 Database..."
wrangler d1 create aicybersec_db
echo "⚠️  Copy the database_id from above and update wrangler.toml"
read -p "Press enter when you've updated wrangler.toml..."

# Initialize database schema
echo "📝 Initializing database schema..."
wrangler d1 execute aicybersec_db --file=./schema.sql

# Create KV Namespace
echo "🗄️  Creating KV Namespace..."
wrangler kv:namespace create KV
echo "⚠️  Copy the namespace id from above and update wrangler.toml"
read -p "Press enter when you've updated wrangler.toml..."

# Create R2 Bucket
echo "💾 Creating R2 Bucket..."
wrangler r2 bucket create aicybersec-assets

echo "✅ Resources created!"
echo ""
echo "📝 Next steps:"
echo "1. Go to Cloudflare Dashboard > Pages > aicybersec"
echo "2. Go to Settings > Functions"
echo "3. Add these bindings:"
echo "   - D1 Database: Variable name 'DB', select 'aicybersec_db'"
echo "   - KV Namespace: Variable name 'KV', select your KV namespace"
echo "   - R2 Bucket: Variable name 'R2', select 'aicybersec-assets'"
echo "   - Workers AI: Variable name 'AI' (no additional config)"
echo ""
echo "4. Deploy again: ./deploy.sh"
