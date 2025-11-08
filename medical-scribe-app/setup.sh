#!/bin/bash

# Medical Scribe App - Quick Setup Script
# This script sets up and runs the frontend for testing

echo "🏥 Medical AI Scribe - Quick Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please install Node.js 18+ from: https://nodejs.org/"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js version is too old ($(node -v))"
    echo "📥 Please upgrade to Node.js 18+ from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo "✅ npm $(npm -v) detected"
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/frontend" || exit

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    echo "⏱️  This will take 1-2 minutes..."
    echo ""
    npm install

    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Installation failed!"
        echo "Try running: npm cache clean --force"
        exit 1
    fi

    echo ""
    echo "✅ Dependencies installed successfully!"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🚀 Starting development server..."
echo ""
echo "📝 Quick Guide:"
echo "   1. App will open at: http://localhost:3000"
echo "   2. Login with ANY email/password"
echo "   3. Explore Dashboard, Patients, Consultations"
echo "   4. Press Ctrl+C to stop the server"
echo ""
echo "=================================="
echo ""

# Start the dev server
npm run dev
