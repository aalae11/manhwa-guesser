@echo off
echo 🚀 DEPLOYING MANHWA AKINATOR TO VERCEL
echo ========================================

echo.
echo Step 1: Installing Vercel CLI...
npm install -g vercel
if %errorlevel% neq 0 (
    echo ❌ Failed to install Vercel CLI
    pause
    exit /b 1
)

echo.
echo Step 2: Building frontend...
cd frontend
npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    pause
    exit /b 1
)

echo.
echo ✅ Frontend built successfully!
echo Build files are in: frontend/build/
echo.

echo Step 3: Deploying to Vercel...
echo ⚠️  You'll need to:
echo    1. Login with your GitHub/Google account
echo    2. Confirm project name: manhwa-akinator
echo    3. Set build command: npm run build
echo    4. Set output directory: build
echo.
echo Press any key to start deployment...
pause

vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo 🎉 DEPLOYMENT SUCCESSFUL!
    echo ========================
    echo.
    echo Your manhwa Akinator is now live!
    echo.
    echo Next steps:
    echo 1. Note your site URL
    echo 2. Test the game
    echo 3. Apply for Google AdSense
    echo 4. Share on social media
    echo.
    echo 💰 Start monetizing:
    echo - Add AdSense ads
    echo - Set up Ko-fi donations  
    echo - Create TikTok content
    echo.
) else (
    echo ❌ Deployment failed
    echo Check the error messages above
)

echo.
echo Press any key to exit...
pause