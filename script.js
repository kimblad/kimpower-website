// KimPower Website JavaScript

// Carousel state
const carouselState = {};

// Initialize carousels
function initCarousel(carouselId) {
    if (!carouselState[carouselId]) {
        carouselState[carouselId] = {
            currentSlide: 0,
            totalSlides: document.querySelectorAll(`#${carouselId} .carousel-slide`).length
        };
    }
}

// Move carousel
function moveCarousel(carouselId, direction) {
    initCarousel(carouselId);
    const state = carouselState[carouselId];
    state.currentSlide = (state.currentSlide + direction + state.totalSlides) % state.totalSlides;
    updateCarousel(carouselId);
}

// Go to specific slide
function goToSlide(carouselId, slideIndex) {
    initCarousel(carouselId);
    carouselState[carouselId].currentSlide = slideIndex;
    updateCarousel(carouselId);
}

// Update carousel display
function updateCarousel(carouselId) {
    const state = carouselState[carouselId];
    const carousel = document.getElementById(carouselId);
    const track = carousel.querySelector('.carousel-track');
    const indicators = carousel.querySelectorAll('.carousel-indicator');

    // Move track
    track.style.transform = `translateX(-${state.currentSlide * 100}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === state.currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Initialize all carousels on page load
document.addEventListener('DOMContentLoaded', function() {
    initCarousel('hero-carousel');
    initCarousel('about-carousel');
});

// Lightbox functions
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close lightbox on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
