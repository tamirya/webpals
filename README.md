# Instructions
-----
# Frontend:
1. cd frontend
2. npm install

To Run:

⭐ Docker
1. docker build -t tamirya/react-app .
2. docker run -d -it  -p 80:80/tcp --name react-app tamirya/react-app:latest

⭐ Without Docker
- npm run start

To Stop:
- docker stop [container-id]
# Backend:
1. cd backend
2. composer install

To Run:

⭐ Docker
1. docker-compose build
2. docker-compose up -d
3. docker-compose exec app php artisan migrate
4. docker-compose exec app php artisan db:seed

⭐ Without Docker
1. php artisan migrate
2. php artisan db:seed 
3. php -S localhost:8000 -t public

To Stop:
- docker-compose down -v
