const scores = [0,0]
let roundScore = 0
let activePlayer = 0
const $buttonRoll = document.querySelector('#button-roll')

$buttonRoll.addEventListener('click', () => {
    const $dice = document.querySelector('#dice')
    let diceValue = Math.floor(Math.random() * 6) + 1
    const $currentScore = document.querySelector(`#current-${activePlayer}`)
    
    $dice.style.opacity = '1'
    $dice.src = `../img/dice-${diceValue}.png`
    $currentScore.textContent = diceValue
})