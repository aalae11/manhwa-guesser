@echo off
title Manhwa Akinator Setup

echo 🎮 Welcome to Manhwa Akinator Setup!
echo =====================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version
echo ✅ npm found
npm --version
echo.

:: Install root dependencies
echo 📦 Installing root dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

:: Setup Backend
echo 🔧 Setting up backend...
cd backend

echo   📦 Installing backend dependencies...
npm install
if %errorlevel% neq 0 (
    echo   ❌ Backend dependency installation failed!
    pause
    exit /b 1
)

echo   🗄️  Initializing database...
npm run init-db
if %errorlevel% neq 0 (
    echo   ❌ Database initialization failed!
    pause
    exit /b 1
)

echo   ✅ Backend setup complete!
cd ..

:: Setup Frontend
echo 🎨 Setting up frontend...
cd frontend

echo   📦 Installing frontend dependencies...
npm install
if %errorlevel% neq 0 (
    echo   ❌ Frontend dependency installation failed!
    pause
    exit /b 1
)

echo   ✅ Frontend setup complete!
cd ..

:: Create startup batch files
echo 📝 Creating startup scripts...

:: Create start-backend.bat
echo @echo off > start-backend.bat
echo title Backend Server >> start-backend.bat
echo echo 🚀 Starting Backend Server... >> start-backend.bat
echo cd backend >> start-backend.bat
echo npm run dev >> start-backend.bat
echo pause >> start-backend.bat

:: Create start-frontend.bat
echo @echo off > start-frontend.bat
echo title Frontend Server >> start-frontend.bat
echo echo 🎨 Starting Frontend Server... >> start-frontend.bat
echo cd frontend >> start-frontend.bat
echo npm run dev >> start-frontend.bat
echo pause >> start-frontend.bat

:: Create start-both.bat
echo @echo off > start-both.bat
echo title Manhwa Akinator >> start-both.bat
echo echo 🚀 Starting Manhwa Akinator... >> start-both.bat
echo echo Backend: http://localhost:5000 >> start-both.bat
echo echo Frontend: http://localhost:3000 >> start-both.bat
echo echo. >> start-both.bat
echo echo Starting backend server... >> start-both.bat
echo start "Backend Server" /d backend npm run dev >> start-both.bat
echo timeout /t 5 /nobreak >> start-both.bat
echo echo Starting frontend server... >> start-both.bat
echo start "Frontend Server" /d frontend npm run dev >> start-both.bat
echo echo. >> start-both.bat
echo echo 🎉 Both servers are starting! >> start-both.bat
echo echo 🌐 Open http://localhost:3000 in your browser >> start-both.bat
echo echo 📡 API available at http://localhost:5000 >> start-both.bat
echo echo. >> start-both.bat
echo echo Press any key to exit... >> start-both.bat
echo pause >> start-both.bat

echo.
echo 🎉 Setup Complete!
echo ==================
echo.
echo 🚀 Quick Start Commands:
echo   start-both.bat     - Start both backend and frontend
echo   start-backend.bat  - Start only backend server
echo   start-frontend.bat - Start only frontend server
echo.
echo 🌐 URLs:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo   Health:   http://localhost:5000/health
echo.
echo 📊 Database Info:
echo   Location: backend\database\manhwa_akinator.db
echo   Characters: 15+
echo   Attributes: 20+
echo.
echo 🔧 Manual Commands:
echo   Backend:  cd backend ^&^& npm run dev
echo   Frontend: cd frontend ^&^& npm run dev
echo.
echo 📖 Documentation:
echo   README.md        - Project overview
echo   DEPLOYMENT.md    - Production deployment guide
echo.
echo 🎮 Ready to play! Double-click 'start-both.bat' to begin!
echo.
pause