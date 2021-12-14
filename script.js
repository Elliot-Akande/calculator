const displayString = "";

const add = (a, b) => a + b; 
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = function (operator, a, b) {
    if (!a || !b) {
        return "One or more operand(s) left empty";
    }

    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            return "Invalid operator!";
    }
};

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", function(e) {
    const value = number.innerText
    console.log(value);

    const display = document.querySelector("#input");
    display.innerText += value.toString();

    displayString = display.innerText;
}))
