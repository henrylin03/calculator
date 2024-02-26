const bigDisplay = document.querySelector(".big-display");
const smallDisplay = document.querySelector(".small-display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const backspaceBtn = document.querySelector("#backspace");
const allClearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");

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

backspaceBtn.addEventListener("click", removeLastInput);
allClearBtn.addEventListener("click", () => {
    num1 = "";
    operator = "";
    num2 = "";
    bigDisplay.textContent = "";
    smallDisplay.textContent = "";
});


// WHAT NEEDS TO HAPPEN::::

// WHEN digit button clicked - APPEND string of digit to small-display (done)
// THEN WHEN operator button clicked, show digits on big-display AND operator to small-display
// THEN WHEN another digit clicked, this is added to small-display
// THEN WHEN "equals" is clicked, then the result is shown on the big-display, and the second number is shown on the small display

// WHEN user clicks "AC" (all clear), everything is removed from memory
// WHEN user clicks backspace, just what is in the small-display is removed by one character


digitBtns.forEach(btn => {
    btn.addEventListener("click",
        () => smallDisplay.textContent += btn.textContent
    );
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", handleClick)
    function handleClick(e) {
        if (!smallDisplay) return;

        num1 = smallDisplay.textContent; //TODO: WHAT IF THE USER WANTS TO DO OPERATIONS ON MULTIPLE NUMBERS?

        const isNumber = str => /\d/.test(str);
        if (!isNumber(smallDisplay.textContent.slice(-1))) {
            console.log("both are operators");
            removeLastInput();
            // TODO: WHAT IF A USER WANTS TO USE NEGATIVE NUMBERS??
        }

        const operatorIsPower = () => e.target.querySelectorAll("img");
        operator = operatorIsPower ? "^" : e.target.textContent;
        bigDisplay.textContent = smallDisplay.textContent;
        smallDisplay.textContent += operator;
    }
});


equalsBtn.addEventListener("click", () => {
    num2 = display.textContent;
    const calculationResult = operate(num1, num2, operator);
    display.textContent = calculationResult;
});


//TODO ? NEED TO FIND OUT HOW TO MAKE IT SO THAT AFTER USER CLICKS EQUALS, THE RESULT IS DISPLAYED, BUT AS SOON AS USER PRESSES ANOTHER NUMBER, IT RESTARTS - MAYBE NESTED EVENT LISTENERS? MAYBE ONCE:TRUE ON EVENT LISTENERS?

//TODO: RESIZE NUMBERS TO MAKE SURE IT FITS WITHIN THE DISPLAY CONTAINER?

// ? IT MIGHT SIMPLER TO HAVE A HISTORICAL (SMALLER) TRACKER UNDER. WHEN USER CLICKS OPERATOR, IT LOGS THE OPERATOR AND THE NUMBER THERE, AND THE 'MAIN' DISPLAY CLEARS THE WAY. IF THE MAIN DISPLAY HAS NOT BEEN POPULATED WITH ANY INFORMATION, THEN NOTHING CHANGES.

// ! BUG: WHEN THERE IS NOTHING, AND YOU CLICK EQUALS, IT WILL SHOW 1, THEN CLICK AGAIN 0, THEN NAN, THEN REPEAT