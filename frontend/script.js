let score = 0;
let correctCategory = "";

async function loadImage() {
    try {
        const res = await fetch("/random-images");
        const data = await res.json();
        console.log("Image URL:", data.url); 
        if (data.error) {
            console.error(data.error);
            return;
        }
        document.getElementById("game-image").src = data.url;
        correctCategory = data.category;
    } catch (error) {
        console.error("Failed to load image", error);
    }
}

function checkGuess(guess) {
    if (guess === correctCategory) {
        score++
        document.body.classList.add("correct-guess")
        document.body.classList.remove("wrong-guess")
    } else {
        score = Math.max(0, score - 1);
        document.body.classList.add("wrong-guess")
        document.body.classList.remove("correct-guess")
    }
    document.getElementById("score").textContent = `Score: ${score}`;
    loadImage();
}

document.getElementById("guess-ai").addEventListener("click", () => checkGuess("ai"));
document.getElementById("guess-human").addEventListener("click", () => checkGuess("human"));

loadImage();