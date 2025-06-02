const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', /\.localhost:5173$/],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT} ${process.env.MONGO_URI}`);
      console.log("JWT_SECRET is:", process.env.JWT_SECRET);
    });
  })
  .catch(err => console.error('DB error:', err));
