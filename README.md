# Clone the repository (if applicable)
git clone https://github.com/yourusername/faq-system.git
cd faq-system

# Install dependencies for both backend and frontend
cd server && npm install
cd ../client && npm install
cd ..

# Set up environment variables
# Create .env file in server directory
echo "MONGODB_URI=mongodb://localhost:27017/faq
REDIS_URL=redis://localhost:6379
GOOGLE_API_KEY=your_google_cloud_key
PORT=5000" > server/.env

# Create .env file in client directory (if needed)
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > client/.env.local

# Start required services using Docker (MongoDB + Redis)
docker-compose up -d mongo redis

# Run the backend server (in separate terminal)
cd server
npm start

# Run the frontend development server (in separate terminal)
cd client
npm run dev

# Run tests for the backend
cd server
npm test

# Run linting for the backend
npm run lint

# Build production version of frontend
cd client
npm run build

# Start production frontend
npm start

# Docker commands (full deployment)
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down

# Clean up volumes
docker-compose down -v