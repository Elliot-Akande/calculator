let inputString = "";
let outputString = "";
let operator = "";
let operandFirst = "";
let operandSecond = "";
let equals = "";

const add = (a, b) => a + b; 
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "ERROR" : a / b;

const operate = function (operator, a, b) {
    let output;

    if (a === NaN || b === NaN) {
        return "one or more operand(s) not entered!";
    }

    switch (operator) {
        case '+':
            output = add(a, b);
            break;
        case '-':
            output = subtract(a, b);
            break;
        case '*':
            output = multiply(a, b);
            break;
        case '/':
            output = divide(a, b);
            break;
        default:
            output = a;
    }

    return Math.round(output * 10000000) / 10000000;
};

const updateInput = () => document.querySelector("#input").innerText = inputString;
const updateOutput = () => document.querySelector("#output").innerText = outputString;

const buildInputString = () => inputString = `${operandFirst} ${operator} ${operandSecond} ${equals}`;

const numberPressed = function () {
    if (inputString && inputString.substr(inputString.length - 1) === "="){
        clearDisplay();
    }

    if (!operator) {
        if (operandFirst && operandFirst.substr(0, 1) === "0"){
            operandFirst = this.innerText; 
        } else {
            operandFirst += this.innerText ;
        }
    } else {
        if (operandSecond && operandSecond.substr(0, 1) === "0"){
            operandSecond = this.innerText; 
        } else {
            operandSecond += this.innerText ;
        }
    }    

    buildInputString();

    operandSecond ? outputString = operandSecond : outputString = operandFirst;

    updateInput();
    updateOutput();

}

const operatorPressed = function () {
    if(!operandFirst){
        operandFirst = "0";
    }
    if (operator){
        operandFirst = operate (operator, +operandFirst, +operandSecond);
        operandSecond = "";
        outputString = operandFirst;
    }
    operator = this.innerText;

    buildInputString();
    updateInput();
    updateOutput();
}

const clearDisplay = function () {
    inputString = "";
    outputString = "";
    operator = "";
    operandFirst = "";
    operandSecond = "";

    updateInput();
    updateOutput();
}

const deleteCharacter = function () {
    if (operandSecond){
        operandSecond = operandSecond.substr(0, operandSecond.length - 1);
    } else if (operator){
        operator = "";
    } else {
        operandFirst = operandFirst.substr(0, operandFirst.length - 1);
    }
    operandSecond ? outputString = operandSecond : outputString = operandFirst;

    buildInputString();
    updateInput();
    updateOutput();
}

const equalsPressed = function () {
    outputString = operate (operator, +operandFirst, +operandSecond);
    equals = "=";

    buildInputString();
    updateInput();
    updateOutput();

    equals = "";
}

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", numberPressed));

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => operator.addEventListener("click", operatorPressed));

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearDisplay);

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", deleteCharacter);

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", equalsPressed);

