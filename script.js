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
    }
});

equalsBtn.addEventListener("click", () => {
    num2 = display.textContent;
    const calculationResult = operate(num1, num2, operator);
    display.textContent = calculationResult;
});

// WHEN user clicks equals WITHOUT having touched any of the other numbers, nothing happens
// IF user has clicked any of the other digits (incl 0), then return answer
// ! IT MIGHT SIMPLER TO HAVE A HISTORICAL (SMALLER) TRACKER UNDER. WHEN USER CLICKS OPERATOR, IT LOGS THE OPERATOR AND THE NUMBER THERE, AND THE 'MAIN' DISPLAY CLEARS THE WAY. IF THE MAIN DISPLAY HAS NOT BEEN POPULATED WITH ANY INFORMATION, THEN NOTHING CHANGES.