router.post("/upload", upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      res.json({
        message: "Image uploaded successfully",
        imageUrl: req.file.path, 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
