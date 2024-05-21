cd frontend
docker build -t frontend-gas .
cd backend
docker build -t backend-gas .
cd ..
docker-compose up