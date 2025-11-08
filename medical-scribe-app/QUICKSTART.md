# 🚀 Quick Start Guide - Medical Scribe App

Get the Medical AI Scribe app running on your local machine in **5 minutes**!

---

## 📋 Prerequisites

Make sure you have these installed:
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

Check your versions:
```bash
node --version   # Should be v18 or higher
npm --version    # Should be v9 or higher
```

---

## 🎯 Quick Start (Frontend Only - Demo Mode)

The frontend works standalone with **mock data** - no backend needed for testing the UI!

### Step 1: Navigate to the frontend directory
```bash
cd medical-scribe-app/frontend
```

### Step 2: Install dependencies
```bash
npm install
```

This will install:
- React 18
- Tailwind CSS
- TypeScript
- Vite
- React Router
- Zustand (state management)
- Lucide React (icons)

**Takes about 1-2 minutes** ⏱️

### Step 3: Start the development server
```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 4: Open in browser
Visit: **http://localhost:3000**

---

## 🎨 Testing the UI

### Login Page
1. You'll see a beautiful login screen with gradient background
2. Enter **any email and password** (e.g., `doctor@test.com` / `password`)
3. Click **"Sign in"** - you'll see a loading spinner
4. After 1 second, you'll be logged in!

### Dashboard
- ✅ See 4 colorful stat cards
- ✅ View recent consultations with status badges
- ✅ Check today's schedule in the sidebar
- ✅ Click the big blue "Start Consultation" button

### Navigation
Click the sidebar menu items:
- **Dashboard** - Home screen with overview
- **Patients** - Patient management (4 sample patients)
- **Consultations** - List of all consultations with filters
- **Settings** - Settings page (placeholder)

### Try These Features:
1. **Search patients** - Type in the search box on Patients page
2. **Filter consultations** - Click "Today", "Week", "Month" pills
3. **Hover effects** - Hover over cards to see them lift
4. **Animations** - Notice smooth fade-in and slide-up effects
5. **Responsive** - Resize your browser to see mobile view

---

## 🛠️ Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run type-check
```

---

## 🎨 Design Features to Notice

### Color Palette
- **Primary Blue** (#2563eb) - Buttons, links
- **Accent Green** (#22c55e) - Success states, completed items
- **Warning Orange** (#f97316) - In-progress, processing
- **Clean Grays** - Text, backgrounds, borders

### Animations
- Page transitions fade in smoothly
- Cards slide up with staggered delay
- Processing indicators have subtle pulse
- Hover effects are instant and smooth

### Typography
- Large, bold headings (24-36px)
- Readable body text (14-16px)
- System font stack for performance

### Components
- **Buttons** - 5 variants, loading states, icons
- **Cards** - Soft shadows, hover effects
- **Badges** - Color-coded status indicators
- **Inputs** - Icon support, error states

---

## 📁 Project Structure

```
medical-scribe-app/frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   └── ui/         # Button, Card, Badge, Input
│   ├── layouts/        # Page layouts (Dashboard, Auth)
│   ├── pages/          # Page components
│   │   ├── auth/       # Login, Register
│   │   ├── dashboard/  # Dashboard
│   │   ├── patients/   # Patients management
│   │   └── consultations/  # Consultations list
│   ├── stores/         # Zustand state management
│   ├── lib/            # API client, utilities
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 🎯 What Works in Demo Mode

✅ **Full UI** - All pages and components
✅ **Navigation** - Switch between pages
✅ **Mock Data** - Sample patients and consultations
✅ **Animations** - All transitions and effects
✅ **Search/Filter** - Works on mock data
✅ **Responsive** - Mobile, tablet, desktop views
✅ **State Management** - Login/logout works
✅ **Form Validation** - Input validation works

❌ **Backend Features** - These need the backend running:
- Real transcription
- AI note generation
- Database persistence
- File uploads

---

## 🔧 Troubleshooting

### Port 3000 already in use?
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or run on a different port
npm run dev -- --port 3001
```

### Dependencies installation fails?
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind styles not loading?
```bash
# Make sure postcss.config.js exists
# Restart the dev server
npm run dev
```

### TypeScript errors?
```bash
# Run type check to see all errors
npm run type-check

# Most errors are just warnings in demo mode
```

---

## 🎨 Customizing the UI

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#3b82f6',  // Change this to your brand color
    // ...
  }
}
```

### Change Font
Edit `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
}
```

### Add New Pages
1. Create file in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/layouts/DashboardLayout.tsx`

---

## 📱 Mobile Testing

### Test on your phone:
1. Find your computer's IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep inet

   # Windows
   ipconfig
   ```

2. Start server with host flag:
   ```bash
   npm run dev -- --host
   ```

3. Visit from phone: `http://YOUR_IP:3000`

---

## 🚀 Next Steps

### To add backend functionality:
1. Set up PostgreSQL database
2. Install backend dependencies
3. Configure environment variables
4. Run backend server
5. Connect frontend to real API

See **IMPLEMENTATION_GUIDE.md** for full backend setup.

---

## 💡 Pro Tips

1. **Hot reload** - Changes appear instantly while developing
2. **Console** - Open browser DevTools to see any errors
3. **React DevTools** - Install extension to inspect components
4. **Tailwind IntelliSense** - VS Code extension for autocomplete
5. **Mock data** - Located in each page component

---

## 🎉 You're Ready!

The UI is fully functional in demo mode. You can:
- Show it to potential customers (doctors)
- Get feedback on the design
- Test usability and flow
- Demonstrate the concept

**When ready for production**, follow the IMPLEMENTATION_GUIDE.md to:
- Set up backend with real AI integration
- Connect to database
- Add authentication
- Deploy to cloud

---

## 📞 Need Help?

Check these files:
- `UI_DESIGN_GUIDE.md` - Design decisions and guidelines
- `IMPLEMENTATION_GUIDE.md` - Full setup for production
- `README.md` - Project overview

---

**Enjoy testing your Medical AI Scribe app!** 🏥✨
