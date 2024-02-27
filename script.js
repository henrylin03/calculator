const display = document.querySelector(".display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");
const negativeBtn = document.querySelector(".toggle-negative");
const percentBtn = document.querySelector(".percent");

let num1;
let num2;
let operator;
let calculationResult = null;
let displayNeedsClearing = false;
let secondNumberInputted = false;

function operate(num1, num2, operator) {
    num1 = +num1;
    num2 = +num2;

    const add = (num1, num2) => num1 + num2;
    const subtract = (num1, num2) => num1 - num2;
    const multiply = (num1, num2) => num1 * num2;
    const divide = (num1, num2) => num1 / num2;

    switch (operator) {
        case "+":
            return add(num1, num2);
        case "−":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    };
};

clearBtn.addEventListener("click", () => location.reload());

function displayDigit(e) {
    if (display.textContent == 0 || displayNeedsClearing) {
        display.textContent = "";
        displayNeedsClearing = false;
    }
    display.textContent += e.target.textContent;
};
digitBtns.forEach(btn => btn.addEventListener("click", displayDigit));

negativeBtn.addEventListener("click", () => display.textContent = display.textContent * -1);

let isPercent = false;
percentBtn.addEventListener("click", () => {
    if (isPercent) {
        display.textContent = display.textContent * 100;
        isPercent = false;
        return;
    }
    display.textContent = display.textContent / 100;
    isPercent = true;
});

function handleOperationBtnClick(e) {
    if (!secondNumberInputted) {
        num1 = display.textContent;
        digitBtns.forEach(
            btn => btn.addEventListener("click",
                () => secondNumberInputted = true,
                { once: true }));
    } else {
        num2 = display.textContent;
        calculationResult = operate(num1, num2, operator);
        display.textContent = calculationResult;
        displayNeedsClearing = true;

        num1 = calculationResult;
    };

    operator = e.target.textContent;

    secondNumberInputted = false;
    displayNeedsClearing = true;
};
operatorBtns.forEach(btn => btn.addEventListener("click", handleOperationBtnClick));

function handleEqualBtnClick() {
    if (num1 === null || !secondNumberInputted) return;
    num2 = display.textContent;
    calculationResult = operate(num1, num2, operator);
    display.textContent = calculationResult;
    displayNeedsClearing = true;
    secondNumberInputted = false;

    num1 = calculationResult;
};
equalsBtn.addEventListener("click", handleEqualBtnClick)

//TODO: RESIZE NUMBERS TO MAKE SURE IT FITS WITHIN THE DISPLAY CONTAINER?

//TODO: PLUS/MINUS BUTTON, PERCENTAGE BUTTON, DECIMALS CALCULATIONS, round numbers (not sure how many dp), error for dividing by zero