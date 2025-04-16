const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("timeDisplay");

let isPlaying = false;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

function setInitialDuration() {
  if (audio.duration && !isNaN(audio.duration)) {
    timeDisplay.textContent = formatTime(audio.duration);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  audio.load();
  setTimeout(() => {
    setInitialDuration();
  }, 300);
});

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playBtn.src = "images/icons/play.png";
  } else {
    audio.play();
    playBtn.src = "images/icons/pause.png";
  }
  isPlaying = !isPlaying;
});

audio.addEventListener("timeupdate", () => {
  if (isPlaying) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    timeDisplay.textContent = formatTime(audio.currentTime);
  }
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
  if (isPlaying) {
    timeDisplay.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener("ended", () => {
  playBtn.src = "images/icons/play.png";
  isPlaying = false;
});

// Handle both #instructions and instructions.html links
const instructionsBtn = document.querySelector(
  'a[href="#instructions"], a[href="instructions.html"]'
);
const popup = document.getElementById("instructionsPopup");
const closeBtn = document.getElementById("closeInstructions");

if (instructionsBtn) {
  instructionsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });
}

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
