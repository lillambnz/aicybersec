# Quick Start Guide

Get your AI CyberSec website up and running in minutes!

## 🚀 Super Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - Your site is live locally!

## 📦 What You Get

Your website includes:

✅ **Landing Page** - Beautiful hero section with animations
✅ **Services Section** - 8 comprehensive cybersecurity services
✅ **AI Demo** - Interactive threat detection demo
✅ **Pricing Plans** - 3 tiers (Starter, Professional, Enterprise)
✅ **Testimonials** - Customer success stories
✅ **Contact Form** - Ready for Cloudflare integration
✅ **Fully Responsive** - Mobile, tablet, and desktop optimized

## 🎨 Customize Your Site

### Change Colors
Edit `tailwind.config.ts`:
```ts
cyber: {
  blue: "#00f0ff",    // Your brand color
  purple: "#9d00ff",  // Secondary color
  pink: "#ff00ff",    // Accent color
}
```

### Update Company Info
1. **Footer**: Edit `components/Footer.tsx`
2. **Services**: Edit `components/ServicesSection.tsx`
3. **Pricing**: Edit `components/PricingSection.tsx`
4. **Hero**: Edit `components/HeroSection.tsx`

### Add Your Logo
Replace the Shield icon in `components/Navigation.tsx` with your own logo.

## 🌐 Deploy to Cloudflare (Free!)

### One-Command Deploy
```bash
npm install -g wrangler
wrangler login
npm run build
npm run pages:build
wrangler pages deploy .vercel/output/static --project-name=aicybersec
```

Your site is now live at `https://aicybersec.pages.dev`!

### Full Deployment (with database, AI, etc.)
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup with:
- D1 Database
- Workers AI
- KV Storage
- R2 Buckets
- Custom domain

## 🔧 Enable AI Features

To enable the AI chatbot and threat scanner:

1. **Create D1 Database**:
```bash
wrangler d1 create aicybersec_db
wrangler d1 execute aicybersec_db --file=./schema.sql
```

2. **Create KV Namespace**:
```bash
wrangler kv:namespace create KV
```

3. **Update `wrangler.toml`** with your IDs

4. **Deploy with bindings** - See DEPLOYMENT.md

## 📝 Environment Setup

Create `.env.local`:
```env
SITE_URL=http://localhost:3000
CONTACT_EMAIL=your-email@example.com
```

## 🛠️ Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run production build locally
npm run lint         # Run ESLint
npm run pages:build  # Build for Cloudflare Pages
npm run pages:deploy # Deploy to Cloudflare
```

## 📚 Project Structure

```
aicybersec/
├── app/              # Next.js pages
├── components/       # React components
├── functions/        # Cloudflare Workers (API)
├── lib/             # Utilities
├── public/          # Static assets
└── README.md        # Full documentation
```

## 🎯 Next Steps

1. ✅ Customize content and branding
2. ✅ Deploy to Cloudflare Pages
3. ✅ Set up custom domain
4. ✅ Enable AI features
5. ✅ Configure analytics
6. ✅ Add payment integration (optional)

## 💡 Tips

- **Free Hosting**: Everything runs on Cloudflare's free tier
- **Fast & Secure**: Global CDN + DDoS protection included
- **Easy Updates**: Just `git push` to deploy
- **Scalable**: Handles millions of requests/month for free

## 🆘 Need Help?

- 📖 Full docs: [README.md](./README.md)
- 🚀 Deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 💬 Issues: [GitHub Issues](https://github.com/yourusername/aicybersec/issues)

## 🎉 You're Ready!

Your AI CyberSec website is ready to make you rich! Start customizing and deploying.

Key features:
- 🤖 AI-powered demos
- 💰 Multiple pricing tiers
- 📧 Contact/booking forms
- 🎨 Modern, professional design
- 🚀 Lightning-fast performance
- 🔒 Secure by default

**Now go build your cybersecurity empire!** 💪
