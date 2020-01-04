let scores, roundScore, activePlayer, winningScore, prevRoll
const $buttonRoll = document.querySelector('#button-roll')
const $buttonHold = document.querySelector('#button-hold')
const $buttonNewGame = document.querySelector('#button-new-game')
const $buttonScore = document.querySelector('#button-score')
const $inputScore = document.querySelector('#input-score')
const $textWinningScore = document.querySelector('#text-winning-score')
const $dice = document.querySelector('#dice')
const $playerPanels = document.querySelectorAll('.c-player-panel')



// ? Roll button logic
$buttonRoll.addEventListener('click', () => {
    // 1. Get DOM score to interact with & generate random number
    let diceValue = Math.floor(Math.random() * 6) + 1
    console.log(diceValue)

    // 2. Display the result
    $dice.style.opacity = '1'
    $dice.src = `./img/dice-${diceValue}.png`

    // 3. Update the round score IF the rolled is different from 1
    if (diceValue !== 1) {
        // 3.1 true: Add dice value to current round score
        if ( diceValue === 6 && prevRoll === 6) {
            scores[activePlayer] = 0
            const playerScore = document.querySelector(`#score-${activePlayer}`)
            playerScore.textContent = scores[activePlayer]
            nextPlayer()
        } else {
            prevRoll = diceValue
            roundScore += diceValue
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore
        }
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
    if (scores[activePlayer] >= winningScore) {
        // 2.1 true: Win game
        winGame(activePlayer)
    } else {
        // 2.2 false: Next player's turn
        nextPlayer()
    }
})

// ? New Game Button
$buttonNewGame.addEventListener('click', preGame)

// ? Set Score Button 
$buttonScore.addEventListener('click', () => {
    winningScore = parseInt($inputScore.value)
    $inputScore.style.display = 'none'
    $buttonScore.style.display = 'none'
    startGame(winningScore)
})
// ? Utilitary functions

function preGame () {
    // 1. Set every DOM element to it's initial state
    $textWinningScore.textContent = `Winning Score:`
    $buttonRoll.disabled = true
    $buttonHold.disabled = true
    $buttonRoll.style.opacity = '.5'
    $buttonHold.style.opacity = '.5'
    $inputScore.style.display = 'block'
    $buttonScore.style.display = 'block'
    document.querySelector(`#name-0`).textContent = 'Player 1'
    document.querySelector(`#name-1`).textContent = 'Player 2'
    document.querySelector('#score-0').textContent = '0'
    document.querySelector('#score-1').textContent = '0'
    document.querySelector('#current-0').textContent = '0'
    document.querySelector('#current-1').textContent = '0'
    $playerPanels.forEach(panel => {
        panel.classList.remove('c-player-panel--active')
    })
    // 1. Remove classes to avoid conflicts
    $playerPanels[0].classList.add('c-player-panel--active')
}

function startGame (winningScore) {
    $textWinningScore.textContent = `Winning Score: ${winningScore}`
    $buttonHold.disabled = false
    $buttonRoll.disabled = false
    $buttonNewGame.disabled = false
    $buttonRoll.style.opacity = '1'
    $buttonHold.style.opacity = '1'

    // 2. Set game variables to it's initial state
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

function winGame (activePlayer) {
    // 1. Show winning message to player
    document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!'

    // 2. Disable buttons
    $buttonRoll.disabled = true
    $buttonHold.disabled = true
    $buttonRoll.style.opacity = '.5'
    $buttonHold.style.opacity = '.5'
}

