const express = require("express");
const upload = require("../config/multer"); // Path to multer.js
const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Image uploaded successfully",
      imageUrl: req.file.path, // Cloudinary URL
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
