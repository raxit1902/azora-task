const express = require("express");
const axios = require("axios");
const router = express.Router();

// Fetch posts from an external API
router.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

module.exports = router;
