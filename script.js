const divSquares = document.querySelector(".div-squares");
const output = document.querySelector("#output");
const slider = document.querySelector("#slider");
const redBtn = document.querySelector(".red-btn");
const clearBtn = document.querySelector(".clear-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const randomBtn = document.querySelector(".random-btn");
const colorPicker = document.querySelector(".color");

let currentColor = "lightblue"; // default draw color

// ---- Random grey generator ----
function randomGrey() {
  const value = Math.floor(Math.random() * 256);
  return `rgb(${value}, ${value}, ${value})`;
}

// ---- Create grid based on slider value ----
function createGrid(size) {
  divSquares.innerHTML = ""; // clear previous boxes

  // Set CSS grid dynamically
  divSquares.style.display = "grid";
  divSquares.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  divSquares.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const totalBoxes = size * size;
  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");
    box.classList.add("boxes");

    // Hover to draw color
    box.addEventListener("mouseover", () => {
      if (currentColor === "randomGrey") {
        box.style.backgroundColor = randomGrey();
      } else if (currentColor === "eraser") {
        box.style.backgroundColor = "white";
      } else {
        box.style.backgroundColor = currentColor;
      }
    });

    divSquares.appendChild(box);
  }
}

// ---- Button actions ----
redBtn.addEventListener("click", () => (currentColor = "red"));
eraserBtn.addEventListener("click", () => (currentColor = "eraser"));
randomBtn.addEventListener("click", () => (currentColor = "randomGrey"));
colorPicker.addEventListener("input", (e) => (currentColor = e.target.value));

clearBtn.addEventListener("click", () => {
  const allBoxes = document.querySelectorAll(".boxes");
  allBoxes.forEach((box) => (box.style.backgroundColor = "white"));
});

// ---- Slider control ----
const savedValue = localStorage.getItem("sliderValue");

if (savedValue !== null) {
  slider.value = savedValue;
  output.textContent = savedValue;
  createGrid(parseInt(savedValue));
} else {
  slider.value = 16;
  output.textContent = 16;
  createGrid(16);
}

slider.addEventListener("input", () => {
  const count = parseInt(slider.value);
  output.textContent = count;
  localStorage.setItem("sliderValue", count);
  createGrid(count);
});
