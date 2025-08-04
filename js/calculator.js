let currentInput = "";

function updateDisplay() {
  document.getElementById("display").value = currentInput || "0";
}

function appendToDisplay(value) {
  currentInput += value;
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(currentInput);
    const calculation = `${currentInput} = ${result}`;

    // Add to history
    addToHistory(calculation);

    currentInput = result.toString();
    updateDisplay();
  } catch (error) {
    currentInput = "Error";
    updateDisplay();
    setTimeout(clearDisplay, 1000);
  }
}

// Keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (/[0-9+\-*/.()]/.test(key)) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }
});

// Navbar functionality
function setActive(clickedItem) {
  document.querySelectorAll(".nav-link").forEach((item) => {
    item.classList.remove("active");
  });
  clickedItem.classList.add("active");
}
