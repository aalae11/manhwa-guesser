# Manhwa Akinator 🎮

An Akinator-style guessing game specialized for manhwa and manhua characters. Think of any character from your favorite series, answer Yes/No/Maybe questions, and let our AI try to guess who you're thinking of!

![Manhwa Akinator](https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80)

## 🌟 Features

- **Smart AI Algorithm**: Probability-based guessing system that learns from your answers
- **15+ Characters**: Pre-loaded with popular characters from series like Solo Leveling, The Beginning After The End, and more
- **Learning System**: Add new characters to expand the database
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, beautiful interface built with React and Tailwind CSS
- **Monetization Ready**: Ad placeholders ready for Google AdSense integration

## 🚀 Live Demo

[Visit Manhwa Akinator](https://your-app-url.vercel.app) *(Replace with your actual URL)*

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **SQLite** database
- **CORS** for cross-origin requests
- **Helmet** for security
- **Rate limiting** for API protection

### Deployment
- **Frontend**: Vercel/Netlify
- **Backend**: Render/Railway
- **Database**: SQLite (can be upgraded to PostgreSQL)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Initialize database with sample data
npm run init-db

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 Game Flow

1. **Start Game**: User clicks "Start Playing"
2. **Think**: User thinks of a manhwa/manhua character
3. **Questions**: AI asks up to 20 yes/no/maybe questions
4. **Filtering**: Each answer eliminates characters and adjusts probabilities
5. **Guessing**: When confident, AI makes a guess
6. **Feedback**: User confirms if guess is correct
7. **Learning**: If character not found, user can add it to database

## 🏗️ Project Structure

```
atp3/
├── backend/
│   ├── src/
│   │   ├── server.js          # Main server file
│   │   ├── database.js        # Database operations
│   │   └── game-logic.js      # Core game algorithm
│   ├── database/
│   │   ├── schema.sql         # Database schema & sample data
│   │   └── init-db.js         # Database initialization script
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Main pages (Home, Game, About)
│   │   ├── hooks/             # Custom React hooks
│   │   └── services/          # API service layer
│   └── package.json
└── .github/
    └── copilot-instructions.md # AI development guidelines
```

## 🤖 Game Algorithm

The core algorithm uses a probability-based approach:

1. **Initialization**: All characters start with equal probability (1.0)
2. **Question Selection**: Choose questions that best split remaining candidates
3. **Probability Updates**: Adjust character probabilities based on answers:
   - **Match**: Boost probability (×1.2)
   - **Mismatch**: Reduce probability (×0.3)
   - **Maybe**: Small boost for compatible answers (×1.1)
   - **Unknown**: Small penalty (×0.9)
4. **Elimination**: Characters with very low probability (<0.01) are eliminated
5. **Guessing**: Make guess when ≤3 candidates remain or 20 questions asked

## 🎨 Character Database

Current database includes characters from popular series:

**Korean Manhwa:**
- Solo Leveling (Sung Jin-Woo)
- The Beginning After The End (Arthur Leywin)
- Omniscient Reader (Dokja Kim)
- Who Made Me a Princess (Athanasia, Lucas)

**Chinese Manhua:**
- Mo Dao Zu Shi (Wei Wuxian)
- Against the Gods (Yun Che)
- Battle Through The Heavens
- The King's Avatar

## 💰 Monetization Features

- **Ad Placeholders**: Ready for Google AdSense integration
  - Sidebar ads (desktop)
  - Banner ads (mobile)
  - Responsive ad components
- **Support Button**: Placeholder for donations (PayPal/Ko-Fi)
- **Non-intrusive Design**: Ads don't interfere with gameplay

## 🔧 Development Commands

### Backend
```bash
npm run dev          # Start development server
npm start           # Start production server
npm run init-db     # Initialize database
```

### Frontend
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=your-backend-url`

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables from `.env`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding Characters
You can contribute by adding more characters:
1. Use the in-game "Add Character" feature, or
2. Directly modify the database schema file
3. Include character name, series, description, and attribute mappings

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the original Akinator game
- Character information sourced from various manhwa/manhua wikis
- Icons by [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Contact: dev@manhwaakinator.com *(replace with actual email)*

---

**Made with ❤️ for manhwa and manhua fans worldwide!**