import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./routes/contacts.js";
const app = express();

dotenv.config()
// Connect to MongoDB
connectDB();

// Middleware

const allowedOrigin = process.env.FRONTEND_URL;
console.log(`CORS allowing front-end url: ${allowedOrigin}`);

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json()); // Parse incoming JSON

// Routes
app.use("/contacts", contactRouter);

// Default route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Contact Management API");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
