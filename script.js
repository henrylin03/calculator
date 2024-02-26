const display = document.querySelector(".display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
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
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
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

operatorBtns.forEach(btn => {
    btn.addEventListener("click", handleClick)

    function handleClick(e) {
        if (!display) return;

        num1 = display.textContent;
        operator = e.target.textContent;
        const res = [num1, operator]
        console.log(res);
        return res;
    }
})

// have operators listen for clicks
// WHEN user clicks any operator (that isn't equals):
// IF there is no value in display, do nothing
// IF there is value in display, store the value as num1, and operator as `operator`
// display does not change.
// WHEN user clicks equals WITHOUT having touched any of the other numbers, nothing happens
// IF user has clicked any of the other digits (incl 0), then return answer