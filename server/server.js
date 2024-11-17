const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import CORS
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON


const allowedOrigin = process.env.FRONTEND_URL

app.use(cors({ origin: allowedOrigin })); // Allow requests from the React app

// Routes
app.use('/contacts', require('./routes/contacts'));

// Default route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Contact Management API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
