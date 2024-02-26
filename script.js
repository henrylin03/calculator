const display = document.querySelector(".display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");

let nums = [];
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
        case "-":
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
    if (display.textContent == 0) { display.textContent = "" };
    display.textContent += e.target.textContent
};
digitBtns.forEach(btn => btn.addEventListener("click", displayDigit));

operatorBtns.forEach(btn => {
    const handleClick = () => {
        num1 = display.textContent;
        operator = btn.textContent;
        console.log(num1, operator)

        digitBtns.forEach(btn => {
            btn.removeEventListener("click", displayDigit);
            btn.addEventListener("click", () => {
                display.textContent = btn.textContent;
            });
        })
    };
    btn.addEventListener("click", handleClick);
})

// equalsBtn.addEventListener("click", () => {
//     const lastEntryIsOperator = !isNumber(display.textContent.slice(-1));
//     if (lastEntryIsOperator) return;

//     const digitsAfterLastOperator = display.textContent.split(/\D+/ig).at(-1);
//     num2 = digitsAfterLastOperator;

//     const calculationResult = operate(num1, num2, operator);
//     display.textContent = calculationResult;
// });


//TODO ? NEED TO FIND OUT HOW TO MAKE IT SO THAT AFTER USER CLICKS EQUALS, THE RESULT IS DISPLAYED, BUT AS SOON AS USER PRESSES ANOTHER NUMBER, IT RESTARTS - MAYBE NESTED EVENT LISTENERS? MAYBE ONCE:TRUE ON EVENT LISTENERS?

//TODO: RESIZE NUMBERS TO MAKE SURE IT FITS WITHIN THE DISPLAY CONTAINER?