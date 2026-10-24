const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => (b === 0 ? "Error: Cannot divide by 0" : a/b);

let firstNumber = "";
let operator = "";
let secondNumber = "";

function operate(operator,a,b){
    a = Number(a);
    b = Number(b);

    if(operator=== "+"){
        return add(a,b);
    } else if (operator ==="-"){
        return subtract(a,b);
    } else if (operator === "*") {
    return multiply(a, b);
    } else if (operator === "/") {
    return divide(a, b);
    } else {
    return null;
    }
}

const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".btn.digit");

digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const digit = button.textContent;
        if(!operator){
            firstNumber += digit;
            display.textContent = firstNumber;
        } else{
            secondNumber += digit;
            display.textContent = secondNumber;
        }
    });
});