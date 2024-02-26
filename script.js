const display = document.querySelector(".display");
const digitBtns = document.querySelectorAll(".digit");
const backspaceBtn = document.querySelector("#backspace");
const clearBtn = document.querySelector("#clear");

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            alert("Please input a valid operator - add (+), subtract (-), multiply (*) or divide (/)")
    }
}

digitBtns.forEach(btn => {
    btn.addEventListener("click",
        () => display.textContent += btn.textContent
    )
});

backspaceBtn.addEventListener("click", () => {
    const displayedDigits = display.textContent;
    display.textContent = displayedDigits.slice(0, displayedDigits.length - 1);
});

clearBtn.addEventListener("click", () => display.textContent = "");

let num1;
let num2;
let operator;