let SnowmanGame = new SnowmanGame()

document.addEventListener("DOMContentLoaded", () => {
    configureGuessButton()
    updateUI()
})

function configureGuessButton() {
    let button = document.querySelector("#form")
    button.addEventListener("submit", handleFormSubmitted)
}

function handleFormSubmitted(event) {
    event.preventDefault()
    let displayText = ""
    let inputLetter = getInputText()
    let guessResult = SnowmanGame.guessLetter(inputLetter)

    switch (guessResult) {
        case SnowmanGuessResults.GAMEOVER.VICTORY:
            showPlayAgainButton()
        case SnowmanGuessResults.GAMEOVER.DEFEAT:
            showPlayAgainButton()
            updateUI()
            break
        case SnowmanGuessResults.CORRECT:
            updateUI()
            break
        case SnowmanGuessResults.INCORRECT:
            updateUI()
            break
    }
    document.querySelector("#gameMessagePara").innerText = guessResult
}

function getInputText() {
    let letterInput = document.querySelector("#letterInput")
    return letterInput.value.toLowerCase()
}

function updateUI() {
    console.log("updatingui")
    let guessedLettersPara = document.querySelector("#guessedLettersPara")
    if (!SnowmanGame.guessedLetters.length) {
        guessedLettersPara.innerText = "No guessed letters"
    } else {
        guessedLettersPara.innerText = SnowmanGame.guessedLetters
    }

    if (SnowmanGame.guessesRemaining === 0) {
        document.querySelector("#currentDisplayWord").innerText = SnowmanGame.wordToGuess
    } else {
        document.querySelector("#currentDisplayWord").innerText = SnowmanGame.getDisplayText()
    }

    document.querySelector("#guessesRemainingPara").innerText = SnowmanGame.guessesRemaining + " Guesses remaining"
    document.querySelector("#SnowmanImage").src = getImage(SnowmanGame.guessesRemaining)
    document.querySelector("#letterInput").value = ""
}

function showPlayAgainButton() {
    let newButton = document.createElement("button")
    newButton.innerText = "New Game"
    document.querySelector("#fieldset").disabled = "disabled"
    newButton.addEventListener('click', () => {
        SnowmanGame = new SnowmanGame()
        updateUI()
        document.querySelector("#gameMessagePara").innerText = 'Welcome to Snowman'
        newButton.parentElement.removeChild(newButton)
        document.querySelector("#fieldset").disabled = undefined
    })
    document.querySelector("#form").appendChild(newButton)
}

function getImage(guessesRemaining) {
    let imageNum = 10 - guessesRemaining
    return "https://www.hanginghyena.com/static/branding/art/Snowman-" + imageNum + ".jpg"
}
