const display = document.querySelector(".display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const backspaceBtn = document.querySelector("#backspace");
const clearBtn = document.querySelector("#clear");
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

digitBtns.forEach(btn => {
    btn.addEventListener("click",
        () => display.textContent += btn.textContent
    );
});

backspaceBtn.addEventListener("click", () => {
    const displayedDigits = display.textContent;
    display.textContent = displayedDigits.slice(0, displayedDigits.length - 1);
});

clearBtn.addEventListener("click", () => {
    num1 = "";
    operator = "";
    num2 = "";
    display.textContent = "";
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", handleClick)
    function handleClick(e) {
        if (!display) return;
        num1 = display.textContent;
        operator = e.target.textContent;
        display.textContent = "";
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