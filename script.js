const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Error" : a / b);

let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
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
    const digit = button.textContent.trim();

    if (shouldResetDisplay) {
      firstNumber = digit;
      display.textContent = firstNumber;
      shouldResetDisplay = false;
      return;
    }

    if (!operator) {
      firstNumber += digit;
      display.textContent = firstNumber;
    } else {
      secondNumber += digit;
      display.textContent = secondNumber;
    }
  });
});

const clearBtn = document.getElementById("Clear");
const operatorButtons = document.querySelectorAll(".btn.operator");

clearBtn.addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  shouldResetDisplay = false;
  display.textContent = "0";
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    shouldResetDisplay= false;
    if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
        const result = operate(operator, firstNumber, secondNumber);
        display.textContent = result;
        if (result === "Error") {
        firstNumber = "";
        operator = "";
        secondNumber = "";
        return;
      }
      firstNumber = result.toString();
      secondNumber = "";
    }
    if (firstNumber !== "") {
      operator = button.dataset.operator;
    }
  });
});

const equalsBtn = document.getElementById("equals");

equalsBtn.addEventListener("click", () => {
  if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
    const result = operate(operator, firstNumber, secondNumber);

    display.textContent = result;

    if (result === "Error") {
      firstNumber = "";
      operator = "";
      secondNumber = "";
    } else {
      firstNumber = result.toString();
      operator = "";
      secondNumber = "";
      shouldResetDisplay = true;
    }
  }
});