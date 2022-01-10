const RandomQuote = 'http://api.quotable.io/random'
const Displayq = document.getElementById('quoteDisplay')
const Inputq = document.getElementById('quoteInput')
const Timertime = document.getElementById('timer')

Inputq.addEventListener('input', () => {
  const arrayQuote = Displayq.querySelectorAll('span')
  const arrayValue = Inputq.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) NewQuote()
})

function getRandomQuote() {
  return fetch(RandomQuote)
    .then(response => response.json())
    .then(data => data.content)
}

async function NewQuote() {
  const quote = await getRandomQuote()
  Displayq.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    Displayq.appendChild(characterSpan)
  })
  Inputq.value = null
  startTimer()
}

let startTime
function startTimer() {
  Timertime.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

NewQuote()