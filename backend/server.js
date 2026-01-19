const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Enable CORS for all origins during development
app.use(express.json()); // Parse JSON request bodies

// Simple health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is healthy!" });
});

// Add other API routes here...

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});