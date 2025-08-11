let score = 0
let correctCategory = ""

async function loadImage(){
    const res = await fetch("/random-images")
    const data = await res.json()

    document.getElementById("game-image").src = data.url
    correctCategory = data.category
}

function checkGuess(guess){
    if(guess === correctCategory){
        score++
    }
    else{
        score.Math.max(0, score - 1)
    }
    document.getElementById("score").textContent = `Score: ${score}`
    loadImage()
}

document.getElementById("guess-ai").addEventListener("click", () => checkGuess("ai"))
document.getElementById("guess-human",).addEventListener("click"), () => checkGuess("human")

loadImage()
