const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3000; // Added a default port

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' - error with mongo connection'));
db.once('open', () => console.log('MongoDB connected'));

// Use Controllers
const productsController = require('./controllers/products.js');
app.use('/products', productsController);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
