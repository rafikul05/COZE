
let cartCount = 0;

// Load cart from local storage on page load
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').innerText = cartCount;
    }
}

// Call loadCart on page load
window.onload = loadCart;

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice, productImage) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
        // If it exists, increase the quantity
        cart[existingProductIndex].quantity +=                1;
    } else {
        // If it doesn't exist, add it to the cart
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1 // Default quantity
        };
        cart.push(product);
    }

    // Save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;

    alert(`${productName} added to cart! Total items: ${cartCount}`);
}

function buyNow(productName, productPrice) {
    // Implement buy now functionality here
    alert(`Buying ${productName} for $${productPrice}`);
    // You can redirect to a checkout page or perform other actions here
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
});


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
function buyNow(productName, productPrice) {
    // Simulate a purchase action
    alert(`You have purchased ${productName} for $${productPrice.toFixed(2)}!`);
    
    // Optionally, redirect to a checkout page
    // window.location.href = 'checkout.html';
}