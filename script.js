const bigDisplay = document.querySelector(".big-display");
const smallDisplay = document.querySelector(".small-display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const backspaceBtn = document.querySelector("#backspace");
const allClearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");

const isNumber = str => /\d/.test(str);

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const powerOf = (num1, num2) => num1 ** num2;

let num1;
let num2;
let operator;

function operate(num1, num2, operator) {
    num1 = +num1;
    num2 = +num2;
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
        default:
            return powerOf(num1, num2);
    }
}

function removeLastInput() {
    const displayedInput = smallDisplay.textContent;
    smallDisplay.textContent = displayedInput.slice(0, displayedInput.length - 1);
}


// adding event listeners and handlers
backspaceBtn.addEventListener("click", removeLastInput);
allClearBtn.addEventListener("click", () => {
    num1 = null;
    operator = null;
    num2 = null;
    bigDisplay.textContent = null;
    smallDisplay.textContent = null;
});

digitBtns.forEach(btn => {
    btn.addEventListener("click",
        () => smallDisplay.textContent += btn.textContent
    );
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", handleClick)
    function handleClick(e) {
        if (!smallDisplay.textContent) return;

        num1 = smallDisplay.textContent; //TODO: WHAT IF THE USER WANTS TO DO OPERATIONS ON MULTIPLE NUMBERS?

        const lastTwoEntries = smallDisplay.textContent.slice(-1);
        if (!isNumber(lastTwoEntries)) {
            console.log("both are operators");
            removeLastInput();
            // TODO: WHAT IF A USER WANTS TO USE NEGATIVE NUMBERS??
        }

        // every operator, other than the power (exponent) has unicode as strings in the HTML, rather than image, on the buttons
        const operatorIsPower = () => e.target.classList.contains("exponent");
        operator = operatorIsPower() ? "^" : e.target.textContent;

        bigDisplay.textContent = smallDisplay.textContent;
        smallDisplay.textContent += operator;
    }
});

equalsBtn.addEventListener("click", () => {
    const lastEntryIsOperator = !isNumber(smallDisplay.textContent.slice(-1));
    if (lastEntryIsOperator) return;

    const digitsAfterLastOperator = smallDisplay.textContent.split(/\D+/ig).at(-1);
    num2 = digitsAfterLastOperator;

    const calculationResult = operate(num1, num2, operator);
    bigDisplay.textContent = calculationResult;
});


//TODO ? NEED TO FIND OUT HOW TO MAKE IT SO THAT AFTER USER CLICKS EQUALS, THE RESULT IS DISPLAYED, BUT AS SOON AS USER PRESSES ANOTHER NUMBER, IT RESTARTS - MAYBE NESTED EVENT LISTENERS? MAYBE ONCE:TRUE ON EVENT LISTENERS?

//TODO: RESIZE NUMBERS TO MAKE SURE IT FITS WITHIN THE DISPLAY CONTAINER?