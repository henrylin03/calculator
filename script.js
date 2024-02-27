const display = document.querySelector(".display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");

let num1;
let num2;
let operator;
let displayNeedsClearing = false;

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
    }
};

clearBtn.addEventListener("click", () => {
    num1 = null;
    operator = null;
    num2 = null;
    display.textContent = 0;
    secondNumberInputted = false;
});

function displayDigit(e) {
    if (display.textContent == 0 || displayNeedsClearing) {
        display.textContent = "";
        displayNeedsClearing = false;
    }
    display.textContent += e.target.textContent;
};
digitBtns.forEach(btn => btn.addEventListener("click", displayDigit));

let nextOperator;
let secondNumberInputted = false;
function handleOperationBtnClick(e) {
    currentOperator = nextOperator || e.target.textContent;
    console.log("second number inputted?", secondNumberInputted)
    if (!secondNumberInputted) {
        num1 = display.textContent;
    } else if (secondNumberInputted) {
        num2 = display.textContent;
    };

    digitBtns.forEach(
        btn => btn.addEventListener("click",
            () => secondNumberInputted = true,
            { once: true }));


    console.log("current operator:", currentOperator);
    console.log("num1:", num1)
    console.log("num2:", num2);

    displayNeedsClearing = true;



    // // numbers on display are locked down, ready for calculations, unless cleared
    // displayNeedsClearing = true;

    // if (!firstNumIsReady) {
    //     num1 = display.textContent;
    //     firstNumIsReady = true;
    //     operator = e.target.textContent;
    //     return;
    // };

    // num2 = display.textContent;
    // console.log("first number is ready");
    // const calculationResult = operate(num1, num2, operator);
    // display.textContent = calculationResult;

    // // for any subsequent calculations
    // // num1 = calculationResult;
    // // operator = e.target.textContent;
};

operatorBtns.forEach(btn => btn.addEventListener("click", handleOperationBtnClick))

//TODO: RESIZE NUMBERS TO MAKE SURE IT FITS WITHIN THE DISPLAY CONTAINER?
//!Bug: when users click one operator, and then want to change that to another one (eg clicked +, and then wants to actually multiply whatever number comes next - )