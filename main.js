const userInput = document.getElementById('user-input')
const lengthDisplay = document.getElementById('length-display')
const volumeDisplay = document.getElementById('volume-display')
const massDisplay = document.getElementById('mass-display')

const state = {
  numberToConvert: 0,
  feetFromMeters: 0,
  metersFromFeet: 0,
  gallonsFromLiters: 0,
  litersFromGallons: 0,
  poundsFromKilos: 0,
  kilosFromPounds: 0
}

const doConversion = (operator, decimal) => {
  let result = 0
  if (operator === '/') {
    result = (state.numberToConvert / decimal).toFixed(3)
  } else if (operator === '*') {
    result = (state.numberToConvert * decimal).toFixed(3)
  }
  return result
}

const updateDisplay = () => {
  const {
    numberToConvert,
    feetFromMeters,
    metersFromFeet,
    litersFromGallons,
    gallonsFromLiters,
    kilosFromPounds,
    poundsFromKilos
  } = state

  const lengthDisplay = document.getElementById('length-display')
  const volumeDisplay = document.getElementById('volume-display')
  const massDisplay = document.getElementById('mass-display')

  lengthDisplay.innerHTML = /*html*/ `
    <div class="unit__title">Length (Meter/Feet)</div>
    <div class="unit__data">
      ${numberToConvert} meters = ${feetFromMeters} feet | 
      ${numberToConvert} feet = ${metersFromFeet} meters
    </div>
  `

  volumeDisplay.innerHTML = /*html*/ `
    <div class="unit__title">Volume (Liters/Gallons)</div>
    <div class="unit__data">
      ${numberToConvert} liters = ${gallonsFromLiters} gallons | 
      ${numberToConvert} gallons = ${litersFromGallons} liters
    </div>
  `

  massDisplay.innerHTML = /*html*/ `
    <div class="unit__title">Mass (Kilograms/Pounds)</div>
    <div class="unit__data">
      ${numberToConvert} kilos = ${poundsFromKilos} pounds | 
      ${numberToConvert} pounds = ${kilosFromPounds} kilos
    </div>
  `
}

const convertNumber = (number) => {
  // m = f ÷ 0.3048
  state.feetFromMeters = doConversion('/', 0.3048)
  state.metersFromFeet = doConversion('*', 0.3048)
  // gal = L ÷ 4.546091879
  state.gallonsFromLiters = doConversion('/', 4.546091879)
  state.litersFromGallons = doConversion('*', 4.546091879)
  // lb = kg ÷ 0.45359237
  state.poundsFromKilos = doConversion('/', 0.45359237)
  state.kilosFromPounds = doConversion('*', 0.45359237)
}

const getUserInput = (e) => {
  e.preventDefault()
  const inputValue = parseFloat(e.target.value)
  if (isNaN(inputValue)) {
    return
  }
  state.numberToConvert = inputValue

  convertNumber()
  updateDisplay()
}

updateDisplay()

userInput.addEventListener('change', getUserInput)
userInput.addEventListener('focus', () => {
  // userInput.style.backgroundColor = 'hsla(0, 0%, 100%, 0.2)'
  userInput.value = ''
})
userInput.addEventListener('blur', () => {
  // userInput.style.backgroundColor = 'hsla(0, 0%, 100%, 0.05)'
  userInput.value = state.numberToConvert
})
