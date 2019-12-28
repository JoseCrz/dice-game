const scores = [0,0]
let roundScore = 0
let activePlayer = 0
const $buttonRoll = document.querySelector('#button-roll')
const $buttonHold = document.querySelector('#button-hold')
const $dice = document.querySelector('#dice')
const $playerPanels = document.querySelectorAll('.c-player-panel')


// ? Roll button logic
$buttonRoll.addEventListener('click', () => {
    // 1. Get DOM score to interact with & generate random number
    let diceValue = Math.floor(Math.random() * 6) + 1
    console.log(diceValue)

    // 2. Display the result
    $dice.style.opacity = '1'
    $dice.src = `../img/dice-${diceValue}.png`

    // 3. Update the round score IF the rolled number was not 1
    if (diceValue !== 1) {
        roundScore += diceValue
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore
    } else {
        nextPlayer()
    }
})

// ? Hold button logic
$buttonHold.addEventListener('click', () => {
    scores[activePlayer] += roundScore
    const playerScore = document.querySelector(`#score-${activePlayer}`)
    playerScore.textContent = scores[activePlayer]

    if (scores[activePlayer] >= 10) {
        document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!'
    } else {
        nextPlayer()
    }
})

function nextPlayer () {
    roundScore = 0
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore
    $dice.style.opacity = '0'
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0    
    
    $playerPanels.forEach(panel => {
         panel.classList.toggle('c-player-panel--active')
    })
}

