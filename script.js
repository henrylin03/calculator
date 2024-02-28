const display = document.querySelector(".display");

const MAXCHARSDISPLAYED = 10;

const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".backspace");
const equalsBtn = document.querySelector(".equals");
const negativeBtn = document.querySelector(".toggle-negative");
const decimalBtn = document.querySelector(".decimal");

const allBtns = document.querySelectorAll("button");
const holdBtns = document.querySelectorAll(".hold");

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
    const divide = (num1, num2) => {
        if (num2 == "0") return "😵😵😵";
        return num1 / num2;
    };

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
    if (display.value === "0" || displayNeedsClearing) {
        display.value = "";
        displayNeedsClearing = false;
    } else if (display.value.length == MAXCHARSDISPLAYED) return;
    display.value += e.target.textContent;
};

function addDecimal() {
    const currentNum = display.value;
    const currentNumHasDecimalAlready = currentNum.includes(".");

    if (currentNum == 0 || !currentNumHasDecimalAlready) {
        display.value = `${currentNum}.`;
        displayNeedsClearing = false;
        return;
    };
    if (displayNeedsClearing) return decimalBtn.disabled = true;
    if (currentNum.slice(-1) == ".") return display.value = currentNum.slice(0, -1);
};

function handleOperationBtnClick(e) {
    if (!secondNumberInputted) {
        num1 = display.value;
        digitBtns.forEach(
            btn => btn.addEventListener("click", () => secondNumberInputted = true, { once: true }));
    } else {
        num2 = display.value;
        calculationResult = operate(num1, num2, operator);
        display.value = calculationResult.toString().length >= MAXCHARSDISPLAYED ?
            calculationResult.toPrecision(5) : calculationResult;
        num1 = calculationResult;
    };

    operator = e.target.textContent;

    secondNumberInputted = false;
    displayNeedsClearing = true;
};

function handleEqualBtnClick() {
    if (num1 === null || !secondNumberInputted) return;
    num2 = display.value;
    calculationResult = operate(num1, num2, operator);
    display.value = calculationResult.toString().length > MAXCHARSDISPLAYED ?
        calculationResult.toPrecision(5) : calculationResult;
    displayNeedsClearing = true;
    secondNumberInputted = false;

    num1 = calculationResult;
};

function handleBackspace() {
    if (display.value == 0 || displayNeedsClearing) return;
    display.value = display.value.length > 1 ? display.value.slice(0, -1) : 0;
};

function mapKeysToDigitButtons(e) {
    alert(e.key);
    return;
};

document.addEventListener("keyup", mapKeysToDigitButtons);
clearBtn.addEventListener("click", () => location.reload());
backspaceBtn.addEventListener("click", handleBackspace);
digitBtns.forEach(btn => btn.addEventListener("click", displayDigit));
negativeBtn.addEventListener("click", () => display.value = display.value * -1);
operatorBtns.forEach(btn => btn.addEventListener("click", handleOperationBtnClick));
decimalBtn.addEventListener("click", addDecimal);
equalsBtn.addEventListener("click", handleEqualBtnClick);

allBtns.forEach(btn => {
    btn.addEventListener("mousedown", () => btn.classList.toggle("btn-clicked"));
    btn.addEventListener("click", () => operatorBtns.forEach(b => b.classList.remove("btn-held")))
});
document.body.addEventListener("mouseup", () =>
    digitBtns.forEach(btn => btn.classList.remove("btn-clicked")));

// ? can this potentially be merged with the general event handler for operation buttons?
operatorBtns.forEach(operatorBtn =>
    operatorBtn.addEventListener("click", e => {
        operatorBtns.forEach(e => e.classList.remove("btn-held"));
        e.target.classList.add("btn-held");
    })
);

holdBtns.forEach(btn => btn.addEventListener("click", () => btn.classList.toggle("btn-held")));

//TODO: (1) ADD EVENT LISTENER TO DOCUMENT. ONKEYUP. USE E.CODE(?). 