const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()

const PORT = 3000

app.use(express.static(path.join(__dirname, "../frontend")))
app.get("/random-images", (res, req) => {
    const aiImages = fs.readdirSync(path.join(__dirname, "../images/ai"))
    const humanImages = fs.readdirSync(path.join(__dirname, "../images/human"))
    const isAi = Math.random() > 0.5
    const folder = isAi ? "ai" : "human"
    const images = isAi ? aiImages : humanImages
    const randomImage = images[Math.floor(Math.random() * images.length)]

    res.json({
        url: `/images/${folder}/${randomImage}`,
        category: isAi ? "ai" : "human"
    })  
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))