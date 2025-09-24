# 🚀 Deployment Guide

This guide will help you deploy your Manhwa Akinator application to production.

## 📋 Pre-Deployment Checklist

- ✅ Backend server running on localhost:5000
- ✅ Frontend development server running on localhost:3000
- ✅ Database initialized with 15+ characters
- ✅ All dependencies installed
- ✅ Environment variables configured

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare for Production
```bash
cd frontend
npm run build
```

### Step 2: Deploy to Vercel
1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `frontend` folder as root directory

2. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.render.com
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be available at `https://your-app.vercel.app`

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Backend
1. **Update CORS Configuration:**
   ```javascript
   // In backend/src/server.js
   app.use(cors({
     origin: ['https://your-app.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```

### Step 2: Deploy to Render
1. **Connect Repository:**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Select the `backend` folder as root directory

2. **Configure Service:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node.js
   - **Plan:** Free tier is sufficient for testing

3. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_PATH=./database/manhwa_akinator.db
   SESSION_TIMEOUT=3600000
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your backend will be available at `https://your-backend.onrender.com`

## 🗄️ Database Options

### Option 1: SQLite (Current Setup)
- **Pros:** Simple, no additional setup required
- **Cons:** Data resets on deployment restarts
- **Best for:** Testing and development

### Option 2: Upgrade to PostgreSQL
1. **Create PostgreSQL Database:**
   - Use Render PostgreSQL or Railway
   - Get connection string

2. **Update Backend:**
   - Install `pg` package: `npm install pg`
   - Update database.js to use PostgreSQL
   - Convert schema.sql to PostgreSQL format

3. **Environment Variables:**
   ```
   DATABASE_URL=postgresql://user:pass@host:port/dbname
   ```

## 🔧 Post-Deployment Configuration

### Update Frontend API URL
```bash
# In frontend/.env
VITE_API_URL=https://your-backend.onrender.com
```

### Test the Application
1. **Frontend:** Visit your Vercel URL
2. **Backend API:** Test endpoints:
   - `GET /api/start` - Start new game
   - `GET /api/attributes` - Get all attributes
   - `GET /health` - Health check

### Configure Domain (Optional)
1. **Custom Domain for Frontend:**
   - In Vercel dashboard, go to Domains
   - Add your custom domain
   - Update DNS settings

2. **Custom Domain for Backend:**
   - In Render dashboard, add custom domain
   - Update CORS settings in backend

## 💰 Monetization Setup

### Google AdSense Integration
1. **Apply for AdSense:**
   - Visit [Google AdSense](https://www.google.com/adsense/)
   - Submit your site for approval

2. **Replace Ad Placeholders:**
   ```jsx
   // Replace AdPlaceholder components with real AdSense code
   <div id="adsense-slot-1">
     <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
     <ins className="adsbygoogle"
          style={{display: 'block'}}
          data-ad-client="ca-pub-XXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"></ins>
   </div>
   ```

### Support/Donation Integration
1. **PayPal Integration:**
   ```jsx
   // Replace support button placeholder
   <a href="https://paypal.me/yourusername" 
      target="_blank" 
      className="btn btn-accent">
     Support Developer
   </a>
   ```

2. **Ko-Fi Integration:**
   ```jsx
   <a href="https://ko-fi.com/yourusername" 
      target="_blank" 
      className="btn btn-accent">
     Buy Me a Coffee
   </a>
   ```

## 📊 Analytics Setup

### Google Analytics 4
1. **Create GA4 Property:**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create new property for your domain

2. **Add Tracking Code:**
   ```html
   <!-- Add to frontend/index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## 🔍 SEO Optimization

### Update Meta Tags
```html
<!-- In frontend/index.html -->
<meta name="description" content="Play Manhwa Akinator - Think of any manhwa or manhua character and let our AI guess who it is! Features characters from Solo Leveling, The Beginning After The End, and more.">
<meta name="keywords" content="manhwa, manhua, akinator, game, solo leveling, anime, korean comics, chinese comics">
<meta property="og:title" content="Manhwa Akinator - Character Guessing Game">
<meta property="og:description" content="Think of any manhwa/manhua character and let our AI guess who it is!">
<meta property="og:image" content="https://your-app.vercel.app/og-image.jpg">
<meta property="og:url" content="https://your-app.vercel.app">
```

## 🚨 Monitoring & Maintenance

### Error Tracking
- Consider integrating Sentry for error monitoring
- Set up health check endpoints
- Monitor server logs regularly

### Regular Updates
- Add new characters monthly
- Update dependencies regularly
- Monitor user feedback and add requested features

## 📱 Mobile App (Future Enhancement)

### React Native Version
- Reuse existing API
- Port components to React Native
- Deploy to app stores

---

## 🎉 Congratulations!

Your Manhwa Akinator application is now ready for production deployment. Remember to:

1. **Test thoroughly** before going live
2. **Monitor performance** after deployment
3. **Engage with users** to gather feedback
4. **Regular updates** to keep content fresh

Good luck with your deployment! 🚀