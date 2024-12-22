let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Function to change slides
function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    updateSliderPosition();
}

// Function to update slider position
function updateSliderPosition() {
    const slider = document.querySelector('.slider');
    const slideWidth = slider.clientWidth;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Automatic slide change every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Initial setup
updateSliderPosition();COZE
