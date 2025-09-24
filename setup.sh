#!/bin/bash

# Manhwa Akinator Setup Script
# This script sets up the complete development environment

echo "🎮 Welcome to Manhwa Akinator Setup!"
echo "=====================================n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Setup Backend
echo "🔧 Setting up backend..."
cd backend

echo "  📦 Installing backend dependencies..."
npm install

echo "  🗄️  Initializing database..."
npm run init-db

if [ $? -eq 0 ]; then
    echo "  ✅ Backend setup complete!"
else
    echo "  ❌ Backend setup failed!"
    exit 1
fi

cd ..

# Setup Frontend
echo "🎨 Setting up frontend..."
cd frontend

echo "  📦 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "  ✅ Frontend setup complete!"
else
    echo "  ❌ Frontend setup failed!"
    exit 1
fi

cd ..

# Create startup scripts
echo "📝 Creating startup scripts..."

# Create start-backend script
cat > start-backend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Backend Server..."
cd backend
npm run dev
EOF

# Create start-frontend script
cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "🎨 Starting Frontend Server..."
cd frontend
npm run dev
EOF

# Create start-all script
cat > start-all.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Manhwa Akinator..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM

# Start backend
cd backend
npm run dev &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 3

# Start frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "🎉 Both servers are running!"
echo "🌐 Open http://localhost:3000 in your browser"
echo "📡 API available at http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
EOF

# Make scripts executable
chmod +x start-backend.sh
chmod +x start-frontend.sh
chmod +x start-all.sh

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "🚀 Quick Start Commands:"
echo "  ./start-all.sh     - Start both backend and frontend"
echo "  ./start-backend.sh - Start only backend server"
echo "  ./start-frontend.sh - Start only frontend server"
echo ""
echo "🌐 URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo "  API Docs: http://localhost:5000/health"
echo ""
echo "📊 Database Info:"
echo "  Location: backend/database/manhwa_akinator.db"
echo "  Characters: 15+"
echo "  Attributes: 20+"
echo ""
echo "🔧 Development Commands:"
echo "  Backend:"
echo "    cd backend && npm run dev    - Start with auto-reload"
echo "    cd backend && npm start      - Start production mode"
echo ""
echo "  Frontend:"
echo "    cd frontend && npm run dev   - Start development server"
echo "    cd frontend && npm run build - Build for production"
echo ""
echo "📖 Documentation:"
echo "  README.md        - Project overview and setup"
echo "  DEPLOYMENT.md    - Production deployment guide"
echo ""
echo "🎮 Ready to play! Run './start-all.sh' to begin!"