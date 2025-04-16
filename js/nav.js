// Navigation
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Instructions popup
const instructionsBtn = document.querySelector('a[href="#instructions"]');
const popup = document.getElementById("instructionsPopup");
const closeBtn = document.getElementById("closeInstructions");

if (instructionsBtn) {
  instructionsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
