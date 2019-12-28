let scores, roundScore, activePlayer
const $buttonRoll = document.querySelector('#button-roll')
const $buttonHold = document.querySelector('#button-hold')
const $buttonNewGame = document.querySelector('#button-new-game')
const $dice = document.querySelector('#dice')
const $playerPanels = document.querySelectorAll('.c-player-panel')

startGame()

// ? Roll button logic
$buttonRoll.addEventListener('click', () => {
    // 1. Get DOM score to interact with & generate random number
    let diceValue = Math.floor(Math.random() * 6) + 1
    console.log(diceValue)

    // 2. Display the result
    $dice.style.opacity = '1'
    $dice.src = `../img/dice-${diceValue}.png`

    // 3. Update the round score IF the rolled is different from 1
    if (diceValue !== 1) {
        // 3.1 true: Add dice value to current round score
        roundScore += diceValue
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore
    } else {
        // 3.2 false: Next player's turn
        nextPlayer()
    }
})

// ? Hold button logic
$buttonHold.addEventListener('click', () => {
    // 1. Add current round score to player global score
    scores[activePlayer] += roundScore
    const playerScore = document.querySelector(`#score-${activePlayer}`)
    playerScore.textContent = scores[activePlayer]
    
    // 2. Check if player has reached winning score
    if (scores[activePlayer] >= 100) {
        // 2.1 true: Display winning message to player
        document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!'
    } else {
        // 2.2 false: Next player's turn
        nextPlayer()
    }
})

// ? New Game Button
$buttonNewGame.addEventListener('click', startGame)

// ? Utilitary functions
function startGame () {
    // 1. Set every text to it's initial state
    document.querySelector(`#name-0`).textContent = 'Player 1'
    document.querySelector(`#name-1`).textContent = 'Player 2'
    document.querySelector('#score-0').textContent = '0'
    document.querySelector('#score-1').textContent = '0'
    document.querySelector('#current-0').textContent = '0'
    document.querySelector('#current-1').textContent = '0'
    $playerPanels.forEach(panel => {
        panel.classList.remove('c-player-panel--active')
    })

    // 2. Remove classes to avoid conflicts
    $playerPanels[0].classList.add('c-player-panel--active')

    // 3. Set game variables to it's initial state
    roundScore = 0
    activePlayer = 0
    scores = [0, 0]
}

function nextPlayer () {
    roundScore = 0
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore
    $dice.style.opacity = '0'
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0    
    
    $playerPanels.forEach(panel => {
         panel.classList.toggle('c-player-panel--active')
    })
}

