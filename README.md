# Instructions
-----
# Frontend- React.js & Redux:
1. cd frontend
2. npm install

To Run:

⭐ Docker
1. docker build -t tamirya/react-app .
2. docker run -d -it  -p 80:80/tcp --name react-app tamirya/react-app:latest

**The app will run on default docker url: http://192.168.99.100**

To Stop:
- docker stop [container-id]

⭐ Without Docker
- npm run start

**The app will run on this url: http://localhost:3000**

# Backend- Lumen 8 & Mysql & JWT Authentication:
1. cd backend
2. composer install

To Run:

⭐ Docker
1. docker-compose build
2. docker-compose up -d
3. docker-compose exec app php artisan migrate
4. docker-compose exec app php artisan db:seed

To Stop:
- docker-compose down -v

**The server will run on this url: http://192.168.99.100:8000**

**The PhpMyadmin url: http://192.168.99.100:8080**

⭐ Without Docker
1. edit .env file
    - DB_HOST=localhost
    - DB_DATABASE=webpals
    - DB_USERNAME=[username]
    - DB_PASSWORD=[password]
2. create database with name: webpals
3. php artisan migrate
4. php artisan db:seed 
5. php -S localhost:8000 -t public

**The server will run on this url: http://localhost:8000**
