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


function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// Show dropdown on hover for desktop
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        dropdown.querySelector('.dropdown-menu').style.display = 'block';
    });
    dropdown.addEventListener('mouseleave', () => {
        dropdown.querySelector('.dropdown-menu').style.display = 'none';
    });
});

// Optional: Show search suggestions on input focus
const searchInput = document.querySelector('.search-bar input');
const searchSuggestions = document.querySelector('.search-suggestions');

searchInput.addEventListener('focus', () => {
    searchSuggestions.style.display = 'block';
});

searchInput.addEventListener('blur', () => {
    // Delay hiding to allow click on suggestions
    setTimeout(() => {
        searchSuggestions.style.display = 'none';
    }, 200);
});

// Keyboard navigation for dropdowns
dropdowns.forEach(dropdown => {
    const toggleButton = dropdown.querySelector('a');
    const menu = dropdown.querySelector('.dropdown-menu');

    toggleButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Prevent default action
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            toggleButton.setAttribute('aria-expanded', !isExpanded);
            menu.style.display = isExpanded ? 'none' : 'block';
            menu.style.opacity = isExpanded ? '0' : '1'; // Adjust opacity for transition
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            menu.style.display = 'none';
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
});