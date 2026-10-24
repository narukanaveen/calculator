const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => (b===0 ? "Error" : a / b);

let firstNumber ="";
let operator ="";
let secondNumber ="";
let shouldResetDisplay = false;

function roundResult(number) {
  if (typeof number !== "number" || isNaN(number)) return number;
  return Math.round(number * 10000) / 10000;
}
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  let result;
  if (operator === "+") {
    result = add(a, b);
  } else if (operator === "-") {
    result = subtract(a, b);
  } else if (operator === "*") {
    result = multiply(a, b);
  } else if (operator === "/") {
    result = divide(a, b);
  } else {
    return null;
  }
  return roundResult(result);
}
const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");
const digitButtons = document.querySelectorAll(".btn.digit:not(.decimal):not(.zero)");
const zeroBtn = document.querySelector(".btn.zero");
const clearBtn = document.getElementById("Clear");
const operatorButtons = document.querySelectorAll(".btn.operator");
const equalsBtn = document.getElementById("equals");
const decimalBtn = document.getElementById("decimal");

function handleDigit(digit) {
  if (shouldResetDisplay) {
    firstNumber = digit;
    display.textContent = firstNumber;
    historyDisplay.textContent = "";
    shouldResetDisplay = false;
    return;
  }
  if (!operator) {
    firstNumber += digit;
    display.textContent = firstNumber;
  } else {
    secondNumber += digit;
    display.textContent = secondNumber;
    historyDisplay.textContent = `${firstNumber} ${operator}`;
  }
}

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleDigit(button.textContent.trim());
  });
});

if (zeroBtn) {
  zeroBtn.addEventListener("click", () => {
    handleDigit("0");
  });
}

if (decimalBtn) {
  decimalBtn.addEventListener("click", () => {
    if (shouldResetDisplay) {
      firstNumber = "0.";
      display.textContent = firstNumber;
      historyDisplay.textContent = "";
      shouldResetDisplay = false;
      return;
    }

    if (!operator) {
      if (firstNumber === "") {
        firstNumber = "0.";
        display.textContent = firstNumber;
      } else if (!firstNumber.includes(".")) {
        firstNumber += ".";
        display.textContent = firstNumber;
      }
    } else {
      if (secondNumber === "") {
        secondNumber = "0.";
        display.textContent = secondNumber;
      } else if (!secondNumber.includes(".")) {
        secondNumber += ".";
        display.textContent = secondNumber;
      }
      historyDisplay.textContent = `${firstNumber} ${operator}`;
    }
  });
}

clearBtn.addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  shouldResetDisplay = false;
  display.textContent = "0";
  historyDisplay.textContent = "";
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    shouldResetDisplay = false;
    if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
      const result = operate(operator, firstNumber, secondNumber);
      display.textContent = result;
      if (result === "Error") {
        firstNumber = "";
        operator = "";
        secondNumber = "";
        historyDisplay.textContent = "";
        return;
      }
      firstNumber = result.toString();
      secondNumber = "";
    }
    if (firstNumber !== "") {
      operator = button.dataset.operator;
      historyDisplay.textContent = `${firstNumber} ${operator}`;
    }
  });
});

equalsBtn.addEventListener("click", () => {
  if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
    historyDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
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