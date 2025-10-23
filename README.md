# AI CyberSec - Next-Generation AI Cybersecurity Platform

A modern, full-featured AI cybersecurity services website built with Next.js and powered entirely by Cloudflare's free-tier technologies.

## Features

- **Modern UI/UX**: Beautiful, responsive design with glassmorphism and cyber-themed aesthetics
- **AI-Powered Tools**:
  - Real-time threat detection demo
  - AI security chatbot
  - Vulnerability scanner
  - Code security analysis
- **Complete Service Showcase**: Multiple service offerings with detailed information
- **Interactive Demos**: Live AI demonstrations powered by Cloudflare Workers AI
- **Pricing Plans**: Flexible pricing tiers for different business sizes
- **Contact & Booking System**: Form submissions stored in Cloudflare D1
- **Performance**: Optimized for Cloudflare's global edge network

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **shadcn/ui** - Beautiful UI components

### Cloudflare Technologies (All Free Tier)
- **Cloudflare Pages** - Static site hosting
- **Cloudflare Workers** - Serverless API functions
- **Cloudflare Workers AI** - AI models (LLaMA, sentiment analysis, etc.)
- **Cloudflare D1** - SQLite database for data storage
- **Cloudflare KV** - Key-value storage for rate limiting and caching
- **Cloudflare R2** - Object storage (ready for file uploads)
- **Cloudflare Analytics** - Web analytics

## Project Structure

```
aicybersec/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── HeroSection.tsx      # Landing hero section
│   ├── ServicesSection.tsx  # Services showcase
│   ├── FeaturesSection.tsx  # Features list
│   ├── AIDemo.tsx           # Interactive AI demos
│   ├── PricingSection.tsx   # Pricing plans
│   ├── TestimonialsSection.tsx
│   ├── CTASection.tsx       # Call-to-action
│   ├── Navigation.tsx       # Header navigation
│   └── Footer.tsx           # Footer
├── functions/               # Cloudflare Pages Functions
│   └── api/
│       ├── contact.ts       # Contact form handler
│       ├── ai-chat.ts       # AI chatbot endpoint
│       └── threat-scan.ts   # Security scanning endpoint
├── lib/                     # Utilities
│   └── utils.ts
├── schema.sql              # D1 database schema
├── wrangler.toml           # Cloudflare configuration
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Cloudflare account (free tier)
- Wrangler CLI installed: `npm install -g wrangler`

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Cloudflare Resources

#### a. Create D1 Database
```bash
wrangler d1 create aicybersec_db
```

Copy the database ID and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "aicybersec_db"
database_id = "YOUR_DATABASE_ID"
```

#### b. Initialize Database Schema
```bash
wrangler d1 execute aicybersec_db --file=./schema.sql
```

#### c. Create KV Namespace
```bash
wrangler kv:namespace create KV
```

Update `wrangler.toml` with the KV namespace ID.

#### d. Create R2 Bucket
```bash
wrangler r2 bucket create aicybersec-assets
```

### 3. Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### 4. Build for Production

```bash
npm run build
npm run pages:build
```

### 5. Deploy to Cloudflare Pages

#### Option 1: Via Wrangler CLI
```bash
npm run pages:deploy
```

#### Option 2: Via Cloudflare Dashboard
1. Push code to GitHub
2. Go to Cloudflare Dashboard > Pages
3. Create new project and connect your repository
4. Build settings:
   - Build command: `npm run pages:build`
   - Build output directory: `.vercel/output/static`
5. Add environment bindings (D1, KV, R2, AI) in project settings

### 6. Configure Environment Variables

In Cloudflare Pages dashboard, add these bindings:
- **D1 Database**: Bind `DB` to your database
- **KV Namespace**: Bind `KV` to your namespace
- **R2 Bucket**: Bind `R2` to your bucket
- **Workers AI**: Enable AI binding

## API Endpoints

All API endpoints are serverless Cloudflare Pages Functions:

### POST /api/contact
Submit contact form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "TechCorp",
  "message": "Interested in your services"
}
```

### POST /api/ai-chat
Chat with AI security assistant
```json
{
  "message": "What is SQL injection?",
  "conversationId": "optional-uuid"
}
```

### POST /api/threat-scan
Scan for security threats
```json
{
  "type": "code|url|log",
  "content": "code snippet or URL to analyze"
}
```

## Features Breakdown

### 1. AI-Powered Threat Detection
- Real-time log analysis using Cloudflare Workers AI
- Pattern recognition for common attack vectors
- Automated threat classification

### 2. Security Chatbot
- Conversational AI assistant for security questions
- Context-aware responses using LLaMA model
- Conversation history stored in KV

### 3. Vulnerability Scanner
- URL and code scanning
- AI-powered vulnerability detection
- Detailed security recommendations

### 4. Rate Limiting
- Cloudflare KV-based rate limiting
- Protects API endpoints from abuse
- Configurable limits per endpoint

### 5. Analytics
- Track user interactions
- Monitor form submissions
- Analyze scan requests

## Customization

### Branding
Update colors in `tailwind.config.ts`:
```ts
colors: {
  cyber: {
    blue: "#00f0ff",    // Primary brand color
    purple: "#9d00ff",  // Secondary color
    pink: "#ff00ff",    // Accent color
  },
}
```

### Content
- Update company info in `components/Footer.tsx`
- Modify services in `components/ServicesSection.tsx`
- Change pricing in `components/PricingSection.tsx`
- Update testimonials in `components/TestimonialsSection.tsx`

### AI Models
Cloudflare Workers AI provides several models:
- `@cf/meta/llama-2-7b-chat-int8` - Chat and text generation
- `@cf/huggingface/distilbert-sst-2-int8` - Sentiment analysis
- `@cf/openai/whisper` - Speech to text
- And many more!

See [Cloudflare AI docs](https://developers.cloudflare.com/workers-ai/models/) for available models.

## Performance Optimization

- Static site generation with Next.js
- Edge caching via Cloudflare CDN
- Optimized images and assets
- Lazy loading components
- Minimal JavaScript bundle

## Security Features

- Rate limiting on all API endpoints
- Input validation and sanitization
- CORS configuration
- SQL injection prevention with prepared statements
- XSS protection

## Cost Breakdown (FREE!)

All services used are within Cloudflare's generous free tier:

- **Pages**: 500 builds/month, unlimited requests
- **Workers**: 100,000 requests/day
- **D1**: 100,000 reads/day, 50,000 writes/day
- **KV**: 100,000 reads/day, 1,000 writes/day
- **R2**: 10 GB storage, 1M reads/month
- **Workers AI**: 10,000 neurons/day

## Roadmap

- [ ] Payment integration (Stripe)
- [ ] User authentication
- [ ] Customer dashboard
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Blog/Resources section
- [ ] Multi-language support
- [ ] Dark/Light mode toggle

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this for your own projects!

## Support

For questions or support:
- Email: contact@aicybersec.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/aicybersec/issues)

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Cloudflare](https://cloudflare.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ using Cloudflare's amazing free tier
