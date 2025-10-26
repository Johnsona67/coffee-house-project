import { getFavoriteProducts } from "../api/product";

window.addEventListener("DOMContentLoaded", async () => {
  const slidesContainer = document.querySelector(".carousel-slides") as HTMLElement;
  const progressContainer = document.querySelector(".carousel-progress") as HTMLElement;

  if (!slidesContainer || !progressContainer) return;

  try {
    const favorites = await getFavoriteProducts(3);
    favorites.sort((a, b) => a.id - b.id);

    slidesContainer.innerHTML = "";
    progressContainer.innerHTML = "";

    favorites.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.className = `slide${index === 0 ? " active" : ""}`;

      slide.innerHTML = `
        <img src="/images/coffee-${item.id}.jpg" alt="${item.name}">
        <div class="slide-text">
          <h3 class="heading-3">${item.name}</h3>
          <p class="slide-par body-medium">${item.description}</p>
          <p class="slide-price heading-3">$${item.discountPrice ?? item.price}</p>
        </div>
      `;

      slidesContainer.appendChild(slide);

      const progress = document.createElement("div");
      progress.className = `progress${index === 0 ? " active" : ""}`;
      progressContainer.appendChild(progress);
    });

    setupCarousel();
    initCarouselController()

  } catch (error) {
    console.error("Error loading favorites:", error);
    const section = document.getElementById("Favourites-Coffee");
    if (section) {
      section.innerHTML = `<p class="error">Something went wrong. Please, refresh the page.</p>`;
    }
  }
});

function setupCarousel(): void {
  const slides = document.querySelectorAll<HTMLDivElement>(".slide");
  const progress = document.querySelectorAll<HTMLDivElement>(".progress");
  const left = document.querySelector(".arrow-left") as HTMLButtonElement;
  const right = document.querySelector(".arrow-right") as HTMLButtonElement;
  let current = 0;

  const showSlide = (index: number) => {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    progress.forEach((p, i) => p.classList.toggle("active", i === index));
  };

  const next = () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  };

  const prev = () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  };

  right.addEventListener("click", next);
  left.addEventListener("click", prev);
}
function initCarouselController(): void {
  const carousel = document.querySelector(".carousel") as HTMLElement | null;
  const slidesContainer = document.querySelector(".carousel-slides") as HTMLElement | null;
  const progressContainer = document.querySelector(".carousel-progress") as HTMLElement | null;
  const prevBtn = document.querySelector(".arrow-left") as HTMLButtonElement | null;
  const nextBtn = document.querySelector(".arrow-right") as HTMLButtonElement | null;

  let currentIndex = 0;
  const slideDuration = 5000;
  let autoSlideInterval: number | null = null;

  let touchStartX = 0, touchEndX = 0, touchStartY = 0, touchEndY = 0;
  const minSwipeDistance = 50;

  function wireCarousel(): void {
    if (!carousel || !slidesContainer || !progressContainer || !prevBtn || !nextBtn) return;
    if (carousel.getAttribute("data-initialized") === "1") return;

    const slides = slidesContainer.querySelectorAll<HTMLDivElement>(".slide");
    const progressBars = progressContainer.querySelectorAll<HTMLDivElement>(".progress");
    if (slides.length === 0 || progressBars.length === 0) return;

    function updateActive(index: number): void {
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      currentIndex = index;

      slides.forEach((s) => s.classList.remove("active"));
      progressBars.forEach((p) => p.classList.remove("active"));
      slides[currentIndex].classList.add("active");
      progressBars[currentIndex].classList.add("active");

      slidesContainer!.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide(): void {
      updateActive(currentIndex + 1);
    }
    function startTimer(): void {
      autoSlideInterval = window.setInterval(nextSlide, slideDuration);
    }
    function stopTimer(): void {
      if (autoSlideInterval !== null) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }
    function restartTimer(): void {
      stopTimer();
      startTimer();
    }

    nextBtn.addEventListener("click", () => {
      updateActive(currentIndex + 1);
      restartTimer();
    });
    prevBtn.addEventListener("click", () => {
      updateActive(currentIndex - 1);
      restartTimer();
    });

    function handleTouchStart(e: TouchEvent): void {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }
    function handleTouchMove(e: TouchEvent): void {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
    }
    function handleTouchEnd(): void {
      const dx = touchEndX - touchStartX;
      const dy = Math.abs(touchEndY - touchStartY);
      if (Math.abs(dx) > minSwipeDistance && Math.abs(dx) > dy) {
        updateActive(dx > 0 ? currentIndex - 1 : currentIndex + 1);
        restartTimer();
      }
    }

    carousel.addEventListener("touchstart", handleTouchStart, { passive: true });
    carousel.addEventListener("touchmove", handleTouchMove, { passive: true });
    carousel.addEventListener("touchend", handleTouchEnd, { passive: true });

    updateActive(0);
    startTimer();
    carousel.setAttribute("data-initialized", "1");
  }

  if (slidesContainer && progressContainer) {
    const mo = new MutationObserver(() => wireCarousel());
    mo.observe(slidesContainer, { childList: true });
    mo.observe(progressContainer, { childList: true });
  }

  document.addEventListener("DOMContentLoaded", wireCarousel);
};


