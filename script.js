
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
const carouselInner = document.getElementById('carousel-inner');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let currentIndex = 0;

prev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

next.addEventListener('click', () => {
    if (currentIndex < carouselInner.children.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

function updateCarousel() {
    const itemWidth = carouselInner.children[0].offsetWidth + 20; // 20 is the margin
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}
document.addEventListener('DOMContentLoaded', function() {
    const leftNav = document.querySelector('.carousel-nav.left');
    const rightNav = document.querySelector('.carousel-nav.right');
    const carousel = document.querySelector('.product-carousel');
    let scrollAmount = 0;

    leftNav.addEventListener('click', function() {
        const productWidth = document.querySelector('.product').offsetWidth + 20; // Including margin
        scrollAmount -= productWidth;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });

    rightNav.addEventListener('click', function() {
        const productWidth = document.querySelector('.product').offsetWidth + 20; // Including margin
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        scrollAmount += productWidth;
        if (scrollAmount > maxScroll) {
            scrollAmount = maxScroll;
        }
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });
});
        // descrive
        const images = [
            'https://storage.googleapis.com/a1aa/image/a6hZbTPbZZb5L5F4Veo8UcIc5bFUcGI2Na7OANjQGUCuRREKA.jpg',
            'https://storage.googleapis.com/a1aa/image/Nqb2NyLtRCIPOpbOg9LRJ8Dd9lyhZQVwehXh1e9dZWVajiIUA.jpg',
            'https://storage.googleapis.com/a1aa/image/wO0HnIJTSKJmNhezfu8n8rOkqsvBxvWVPKJI5AqSA9EdjiIUA.jpg'
        ];
        let currentImageIndex = 0;

        function changeImage(index) {
            document.getElementById('main-image').src = images[index];
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
            changeImage(currentImageIndex);
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
            changeImage(currentImageIndex);
        }

        function decreaseQuantity() {
            let quantity = document.getElementById('quantity').value;
            if (quantity > 1) {
                document.getElementById('quantity').value = --quantity;
            }
        }

        function increaseQuantity() {
            let quantity = document.getElementById('quantity').value;
            document.getElementById('quantity').value = ++quantity;
        }

        // Swipe functionality for mobile
        let startX;
        const mainImageContainer = document.getElementById('main-image-container');

        mainImageContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        mainImageContainer.addEventListener('touchmove', (e) => {
            if (!startX) return;
            let moveX = e.touches[0].clientX;
            let diffX = startX - moveX;

            if (diffX > 50) {
                nextImage();
                startX = null;
            } else if (diffX < -50) {
                prevImage();
                startX = null;
            }
        });

        // fun
        // Shows the product details in the description container
  function showProductDetails(name, title, description, price, imageUrl) {
    const descriptionContainer = document.getElementById('containerDes');
    descriptionContainer.style.display = 'flex'; // Show the container

    document.querySelector('.product-carousel-wrapper').style.display = 'none'; // Hide carousel
    document.querySelector('.hero').style.display = 'none'; 
    document.querySelector('.header').style.display = 'none'; 
    document.querySelector('.cat').style.display = 'none'; 
    document.querySelector('.containerBrand').style.display = 'none'; 
    document.querySelector('.main').style.display = 'none'; 
    document.querySelector('.containerSize').style.display = 'none'; 
    document.querySelector('.containerTenti').style.display = 'none'; 
    document.querySelector('.our-store').style.display = 'none'; 
    document.querySelector('.containerSEC').style.display = 'none';
    document.querySelector('.containerLast').style.display = 'none';  

    // Populate the details in the container
    document.getElementById('details-title').innerText = title;
    document.getElementById('details-price').innerText = price;
    document.getElementById('details-image').src = imageUrl;
  }

  // Hides the product details and returns to the carousel view
  function hideProductDetails() {
    const descriptionContainer = document.getElementById('product-description');
    descriptionContainer.style.display = 'none'; // Hide the container

    document.querySelector('.product-carousel-wrapper').style.display = 'flex'; // Show carousel
  }