const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');

const app = express();

// for local
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true); // allow Postman, curl, etc.

//     const allowedOrigins = [
//       'http://localhost:5173',
//     ];

//     const regex = /^http:\/\/[a-z0-9-]+\.localtest\.me:5173$/;

//     if (allowedOrigins.includes(origin) || regex.test(origin)) {
//       callback(null, true);
//     } else {
//       console.error('CORS BLOCKED origin:', origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));


// for production
const allowedOrigins = [
  'http://localhost:5173',
  'https://shop-app-ca467f.netlify.app/'
];

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin || // allow non-browser tools like Postman
      allowedOrigins.includes(origin)
    ) {
      callback(null, true);
    } else {
      console.error('CORS BLOCKED origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));




app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT} `);
    });
  })
  .catch(err => console.error('DB error:', err));
