let slideIndex = 0;
const slider = document.getElementById("slider");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slideIndex = index;

  slider.style.transform = `translateX(-${(slideIndex * 100) / 3}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));

  dots[slideIndex].classList.add("active");
}

function nextSlide() {
  slideIndex++;

  if (slideIndex > 2) {
    slideIndex = 0;
  }

  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;

  if (slideIndex < 0) {
    slideIndex = 2;
  }

  showSlide(slideIndex);
}
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('mainNavbar');
  
  // If user scrolls down past 50px, add the blue class. Otherwise, remove it.
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
    navbar.classList.remove('bg-transparent');
  } else {
    navbar.classList.remove('navbar-scrolled');
    navbar.classList.add('bg-transparent');
  }
});