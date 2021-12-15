let inputString = "";
let outputString = "";
let operator = "";
let operandFirst = "";
let operandSecond = "";
let equals = "";
let decimalFirst = false;
let decimalSecond = false;

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

    return !(output === "ERROR") ? Math.round(output * 1000000000) / 1000000000 : output;
};

const updateInput = () => document.querySelector("#input").innerText = inputString;
const updateOutput = () => document.querySelector("#output").innerText = outputString;

const buildInputString = () => inputString = `${operandFirst} ${operator} ${operandSecond} ${equals}`;

const numberPressed = function () {
    if (inputString && inputString.substr(inputString.length - 1) === "="){
        clearDisplay();
    }

    if (!operator) {
        if(!operandFirst && this.innerText === "."){
            operandFirst = "0.";
            decimalFirst = true;
        }

        if (operandFirst && operandFirst.substr(0, 1) === "0" && this.innerText !== "." && decimalFirst === false){
            operandFirst = this.innerText; 
        } else {
            if (this.innerText === "."){
                if (!decimalFirst){
                    operandFirst += this.innerText;
                    decimalFirst = true;
                }
            } else {
                operandFirst += this.innerText;
            }
        }
    } else {
        if(!operandSecond && this.innerText === "."){
            operandSecond = "0.";
            decimalSecond = true;
        }

        if (operandSecond && operandSecond.substr(0, 1) === "0" && this.innerText !== "." && decimalSecond === false){
            operandSecond = this.innerText; 
        } else {
            if (this.innerText === "."){
                if (!decimalSecond){
                    operandSecond += this.innerText;
                    decimalSecond = true;
                }
            } else {
                operandSecond += this.innerText;
            }
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
    if (operator && outputString !== "ERROR"){
        console.log("asdf");
        operandFirst = (operate (operator, +operandFirst, +operandSecond)).toString();
        operandSecond = "";
        outputString = operandFirst;
    }
    
    if (outputString !== "ERROR") {operator = this.innerText;}

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
    decimalFirst = false;
    decimalSecond = false;

    updateInput();
    updateOutput();
}

const deleteCharacter = function () {
    if (operandSecond){
        if (operandSecond.substr(operandSecond.length - 1) === ".") {
            decimalSecond = false;
        }
        operandSecond = operandSecond.substr(0, operandSecond.length - 1);
    } else if (operator){
        operator = "";
    } else {
        if (operandFirst.substr(operandFirst.length - 1) === ".") {
            decimalFirst = false;
        }
        operandFirst = operandFirst.substr(0, operandFirst.length - 1);
    }
    operandSecond ? outputString = operandSecond : outputString = operandFirst;

    console.log(operandFirst, operator, operandSecond);

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