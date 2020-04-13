const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equals]');
const display = document.querySelector('[data-display]');
let previousNum = '';
let currentNum = '';
let operator = undefined;
let error = 'Error';


function clear() {
    operator = undefined;
    previousNum = '';
    currentNum = '';
}

function remove() {
    currentNum = currentNum.toString().slice(0, -1);
}

function appendNumber(number) {
    if (number === '.' && currentNum.includes('.')) return;
    currentNum = currentNum.toString() + number.toString();
}

function updateDisplay() {
    display.textContent = currentNum;
}

function chooseOperation(operation) {
    if (currentNum === '') return;
    if (previousNum !== '') {
        operate();
        updateDisplay();
    }
    operator = operation;
    previousNum = currentNum;
    currentNum = '';
}

clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
})


numberButtons.forEach(button => button.addEventListener('click',() => {
        appendNumber(button.innerText);
        updateDisplay();
}))

operatorButtons.forEach(button => button.addEventListener('click', () => {
    chooseOperation(button.innerText);
}))

equalButton.addEventListener('click', () => {
    operate();
    updateDisplay();
})

deleteButton.addEventListener('click', () => {
    remove();
    updateDisplay();
})



function operate() {
    let result
    let prev = parseFloat(previousNum);
    let curr = parseFloat(currentNum);
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-': 
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '÷':
            if (curr === 0) {
                result = error;
            } else result = prev / curr;
            break;
        default :
        return;
    }
    
    currentNum = result;
    operation = undefined;
    previousNum = '';
}
