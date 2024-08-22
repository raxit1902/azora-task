require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // User-related routes (signup, profile, etc.)
app.use("/api/auth", authRoutes); // Authentication routes (login)
app.use("/api", postRoutes); // Other API routes
app.use("/api/users", userRoutes); // Fetch users routes
app.use("/api/contacts", contactRoutes); // Use the contact routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
