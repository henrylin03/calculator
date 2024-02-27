const display = document.querySelector(".display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");
const negativeBtn = document.querySelector(".toggle-negative");
const percentBtn = document.querySelector(".percent");
const decimalBtn = document.querySelector(".decimal");

let num1;
let num2;
let operator;
let calculationResult = null;
let displayNeedsClearing = false;
let secondNumberInputted = false;
let isPercent = false;

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

function displayDigit(e) {
    if (display.textContent == 0 || displayNeedsClearing) {
        display.textContent = "";
        displayNeedsClearing = false;
    }
    display.textContent += e.target.textContent;
};

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

function handleEqualBtnClick() {
    if (num1 === null || !secondNumberInputted) return;
    num2 = display.textContent;
    calculationResult = operate(num1, num2, operator);
    display.textContent = calculationResult;
    displayNeedsClearing = true;
    secondNumberInputted = false;

    num1 = calculationResult;
};

function addDecimal() {
    if (displayNeedsClearing) return;

    const currentNum = display.textContent;
    if (currentNum.slice(-1) != ".") {
        const numDecimalAdded = `${currentNum}.`;
        display.textContent = numDecimalAdded;
    } else {
        display.textContent = currentNum.slice(0, -1);
    };
};

clearBtn.addEventListener("click", () => location.reload());
digitBtns.forEach(btn => btn.addEventListener("click", displayDigit));
negativeBtn.addEventListener("click", () => display.textContent = display.textContent * -1);
percentBtn.addEventListener("click", () => {
    if (isPercent) {
        display.textContent = display.textContent * 100;
        isPercent = false;
        return;
    }
    display.textContent = display.textContent / 100;
    isPercent = true;
});
operatorBtns.forEach(btn => btn.addEventListener("click", handleOperationBtnClick));
decimalBtn.addEventListener("click", addDecimal);
equalsBtn.addEventListener("click", handleEqualBtnClick);

//TODO: RESIZE NUMBERS TO MAKE SURE IT FITS WITHIN THE DISPLAY CONTAINER?

//TODO: DECIMALS CALCULATIONS, round numbers (not sure how many dp), error for dividing by zero