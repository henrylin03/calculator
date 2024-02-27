const display = document.querySelector(".display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");

let num1;
let num2;
let operator;

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
});

function displayDigit(e) {
    if (display.textContent == 0 || displayNeedsClearing) {
        display.textContent = "";
        displayNeedsClearing = false;
    }
    display.textContent += e.target.textContent;
};
digitBtns.forEach(btn => btn.addEventListener("click", displayDigit));

let displayNeedsClearing = false;
let firstNumIsReady = false;
function handleOperationBtnClick(e) {
    // numbers on display are locked down, ready for calculations, unless cleared
    displayNeedsClearing = true;

    operator = e.target.textContent;

    if (!firstNumIsReady) {
        num1 = display.textContent;
        firstNumIsReady = true;
        console.log("first number is not ready yet...")
        console.log(num1, operator, num2)
    } else {
        num2 = display.textContent;
        console.log("first number is ready");

        const calculationResult = operate(num1, num2, operator);
        display.textContent = calculationResult;
        num1 = calculationResult;
    };
};

operatorBtns.forEach(btn => btn.addEventListener("click", handleOperationBtnClick))


//TODO ? NEED TO FIND OUT HOW TO MAKE IT SO THAT AFTER USER CLICKS EQUALS, THE RESULT IS DISPLAYED, BUT AS SOON AS USER PRESSES ANOTHER NUMBER, IT RESTARTS - MAYBE NESTED EVENT LISTENERS? MAYBE ONCE:TRUE ON EVENT LISTENERS?

//TODO: RESIZE NUMBERS TO MAKE SURE IT FITS WITHIN THE DISPLAY CONTAINER?