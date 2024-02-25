const digitBtns = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
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

// function displayDigits() {
//     display.textContent += 
// }

let num1;
let num2;
let operator;



// console.log(operate(1, 1, "w"))

// ADD EVENT LISTENER ON DIGIT BUTTONS SUCH THAT WHEN THEY ARE CLICKED, THEY ARE SHOWN ON DISPLAY. THEN CAN BE REMOVED. IM NOT SURE IF THIS IS THE RIGHT THING VS ADDING EVENT LISTENER ON DISPLAY... NO I DON'T THINK SO. IT SHOULD BE THE BUTTONS.

digitBtns.forEach(btn => {
    btn.addEventListener("click",
        () => display.textContent += btn.textContent
    )
})
// backspace.addEventListener("click", () => display.textContent = display.textContent)