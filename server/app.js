const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./Routes/UserRoutes');
app.use('/users', userRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
      console.log("Connected to MongoDB");
      app.listen(process.env.PORT || 5000, () => {
          console.log(`Server running on port ${process.env.PORT || 5000}`);
      });
  })
  .catch(err => console.log(err));




