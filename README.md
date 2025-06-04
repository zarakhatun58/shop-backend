# shop-backend

# setup
1. npm int -y 
2.npm install express mongoose bcryptjs jsonwebtoken cors dotenv cookie-parser
npm install --save-dev nodemon


signup 

POST - http://localhost:5000/api/auth/signup

{
  "username": "testuser1",
  "password": "Test@1234",
  "shops": ["shopalpha", "shopbeta", "shopgamma"]
}

login
POST - http://localhost:5000/api/auth/signin
{
  "username": "testuser1",
  "password": "Test@1234",
  "remember": true
}

"remember": true → session lasts 7 days

"remember": false → session lasts 30 minutes

Profile
GET http://localhost:5000/api/auth/profile


logout
POST http://localhost:5000/api/auth/logout


start by - npm start

deploy site - https://shop-backend-zxpe.onrender.com/