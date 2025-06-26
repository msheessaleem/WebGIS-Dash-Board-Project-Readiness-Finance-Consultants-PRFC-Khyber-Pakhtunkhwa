console.log("Slider loaded");

const track = document.getElementById("slide-track");
const slides = track.querySelectorAll("img");
const totalSlides = slides.length;
const dotsContainer = document.getElementById("dots");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let index = 0;
let interval;
let isPaused = false;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "h-3 w-3 rounded-full bg-gray-300 hover:bg-cyan-400 cursor-pointer transition-all";
  if (i === 0) dot.classList.replace("bg-gray-300", "bg-cyan-500");
  dot.dataset.index = i;
  dotsContainer.appendChild(dot);
});

// Update slides
function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
  [...dotsContainer.children].forEach((dot) => dot.classList.replace("bg-cyan-500", "bg-gray-300"));
  dotsContainer.children[index].classList.replace("bg-gray-300", "bg-cyan-500");
}

// Navigation
nextBtn.addEventListener("click", () => {
  index = (index + 1) % totalSlides;
  updateSlide();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlide();
});

dotsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.index) {
    index = parseInt(e.target.dataset.index);
    updateSlide();
  }
});

// Autoplay
function startSlider() {
  interval = setInterval(() => {
    if (!isPaused) {
      index = (index + 1) % totalSlides;
      updateSlide();
    }
  }, 2500);
}

track.parentElement.addEventListener("mouseenter", () => isPaused = true);
track.parentElement.addEventListener("mouseleave", () => isPaused = false);

startSlider();
updateSlide();
