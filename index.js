let snowmanGame = new SnowmanGame()

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
    let guessResult = snowmanGame.guessLetter(inputLetter)

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
    document.querySelector("#gameMessagePara").innerText = ""
}

function getInputText() {
    let letterInput = document.querySelector("#letterInput")
    return letterInput.value.toLowerCase()
}

function updateUI() {
    console.log("updatingui")
    let guessedLettersPara = document.querySelector("#guessedLettersPara")
    if (!snowmanGame.guessedLetters.length) {
        guessedLettersPara.innerText = "Guessed letters: "
    } else {
        guessedLettersPara.innerText = "Guessed letters: [" + snowmanGame.guessedLetters + "]"
    }

    if (snowmanGame.guessesRemaining === 0) {
        document.querySelector("#currentDisplayWord").innerText = snowmanGame.wordToGuess
    } else {
        document.querySelector("#currentDisplayWord").innerText = snowmanGame.getDisplayText()
    }

    document.querySelector("#guessesRemainingPara").innerText = snowmanGame.guessesRemaining + " Guesses remaining"
    document.querySelector("#snowmanImage").src = getImage(snowmanGame.guessesRemaining)
    document.querySelector("#letterInput").value = ""
}

function showPlayAgainButton() {
    let newButton = document.createElement("button")
    newButton.innerText = "New Game"
    document.querySelector("#fieldset").disabled = "disabled"
    newButton.addEventListener('click', () => {
        snowmanGame = new SnowmanGame()
        updateUI()
        document.querySelector("#gameMessagePara").innerText = ''
        newButton.parentElement.removeChild(newButton)
        document.querySelector("#fieldset").disabled = undefined
    })
    document.querySelector("#form").appendChild(newButton)
}

function getImage(guessesRemaining) {
    let imageNum = 9 - guessesRemaining
    return "https://www.hanginghyena.com/static/branding/art/Snowman-" + imageNum + ".jpg"
}
