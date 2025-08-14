const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve images from /images
app.use("/images", express.static(path.join(__dirname, "frontend/images")));

// Serve frontend files (html, css, js)
app.use(express.static(path.join(__dirname, "frontend"), {
    setHeaders: (res, path) => {
        if (path.endsWith(".js")) {
            res.setHeader("Content-Type", "application/javascript");
        }
    }
}));

// Serve index.html for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Handle favicon.ico requests
app.get("/favicon.ico", (req, res) => {
    res.status(204).end(); 
});

// Random image endpoint
app.get("/random-images", (req, res) => {
    try {
        const aiImages = fs.readdirSync(path.join(__dirname, "frontend/images/ai"));
        const humanImages = fs.readdirSync(path.join(__dirname, "frontend/images/human"));

        if (aiImages.length === 0 && humanImages.length === 0) {
            return res.status(500).json({ error: "No image found in either folder" });
        }

        const isAi = Math.random() > 0.5;
        const folder = isAi ? "ai" : "human";
        const images = isAi ? aiImages : humanImages;

        if (images.length === 0) {
            return res.status(500).json({ error: `No image found in ${folder} folder` });
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        res.json({
            url: `/images/${folder}/${randomImage}`,
            category: isAi ? "ai" : "human"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to load an image" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));