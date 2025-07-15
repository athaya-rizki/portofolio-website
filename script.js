// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    initNavigation();
    
    // Hero slider functionality
    initHeroSlider();
    
    // Basketball slider functionality
    initBasketballSlider();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Mobile menu functionality
    initMobileMenu();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add background to navbar on scroll
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
        
        lastScrollY = currentScrollY;
    });
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Hero slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Auto-play slider
    let slideInterval = setInterval(nextSlide, 5000);
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            currentSlide = index;
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.hero-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Basketball slider functionality
function initBasketballSlider() {
    const basketballSlides = document.querySelectorAll('.basketball-slide');
    const basketballPrev = document.querySelector('.basketball-prev');
    const basketballNext = document.querySelector('.basketball-next');
    
    let currentBasketballSlide = 0;
    const totalBasketballSlides = basketballSlides.length;
    
    // Auto-play basketball slider
    let basketballInterval = setInterval(nextBasketballSlide, 6000);
    
    function showBasketballSlide(index) {
        basketballSlides.forEach(slide => slide.classList.remove('active'));
        basketballSlides[index].classList.add('active');
    }
    
    function nextBasketballSlide() {
        currentBasketballSlide = (currentBasketballSlide + 1) % totalBasketballSlides;
        showBasketballSlide(currentBasketballSlide);
    }
    
    function prevBasketballSlide() {
        currentBasketballSlide = (currentBasketballSlide - 1 + totalBasketballSlides) % totalBasketballSlides;
        showBasketballSlide(currentBasketballSlide);
    }
    
    // Event listeners
    if (basketballNext) {
        basketballNext.addEventListener('click', () => {
            clearInterval(basketballInterval);
            nextBasketballSlide();
            basketballInterval = setInterval(nextBasketballSlide, 6000);
        });
    }
    
    if (basketballPrev) {
        basketballPrev.addEventListener('click', () => {
            clearInterval(basketballInterval);
            prevBasketballSlide();
            basketballInterval = setInterval(nextBasketballSlide, 6000);
        });
    }
    
    // Pause auto-play on hover
    const basketballSliderContainer = document.querySelector('.basketball-slider');
    if (basketballSliderContainer) {
        basketballSliderContainer.addEventListener('mouseenter', () => {
            clearInterval(basketballInterval);
        });
        
        basketballSliderContainer.addEventListener('mouseleave', () => {
            basketballInterval = setInterval(nextBasketballSlide, 6000);
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scroll for hero buttons
    const heroButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    heroButtons.forEach(button => {
        if (button.textContent.includes('Jelajahi')) {
            button.addEventListener('click', () => {
                const educationSection = document.getElementById('education');
                if (educationSection) {
                    const offsetTop = educationSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .level-item, .basketball-card, .photo-card, .description-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for scroll animations
function addScrollAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item,
        .level-item,
        .basketball-card,
        .photo-card,
        .description-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .timeline-item.animate-in,
        .level-item.animate-in,
        .basketball-card.animate-in,
        .photo-card.animate-in,
        .description-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(2).animate-in {
            transition-delay: 0.2s;
        }
        
        .timeline-item:nth-child(3).animate-in {
            transition-delay: 0.4s;
        }
        
        .level-item:nth-child(2).animate-in {
            transition-delay: 0.15s;
        }
        
        .level-item:nth-child(3).animate-in {
            transition-delay: 0.3s;
        }
        
        .level-item:nth-child(4).animate-in {
            transition-delay: 0.45s;
        }
        
        .basketball-card:nth-child(2).animate-in {
            transition-delay: 0.2s;
        }
        
        .basketball-card:nth-child(3).animate-in {
            transition-delay: 0.4s;
        }
        
        .photo-card:nth-child(2).animate-in {
            transition-delay: 0.2s;
        }
        
        .photo-card:nth-child(3).animate-in {
            transition-delay: 0.4s;
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(0, 0, 0, 0.95);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                backdrop-filter: blur(10px);
                padding: 2rem 0;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu .nav-link {
                padding: 1rem 0;
                display: block;
                font-size: 1.1rem;
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .hamburger.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        }
        
        /* Additional hover effects */
        .timeline-item:hover {
            transform: translateY(-5px);
        }
        
        .level-item:hover {
            transform: translateY(-5px);
        }
        
        /* Basketball ornaments */
        .basketball::before {
            content: '';
            position: absolute;
            top: 10%;
            left: 5%;
            width: 50px;
            height: 50px;
            background: radial-gradient(circle, #ff8c00 30%, #ff6600 70%);
            border-radius: 50%;
            opacity: 0.3;
            animation: float 6s ease-in-out infinite;
        }
        
        .basketball::after {
            content: '';
            position: absolute;
            bottom: 15%;
            right: 8%;
            width: 70px;
            height: 70px;
            background: radial-gradient(circle, #ff8c00 30%, #ff6600 70%);
            border-radius: 50%;
            opacity: 0.2;
            animation: float 8s ease-in-out infinite reverse;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        
        /* Loading animation for images */
        img {
            transition: opacity 0.3s ease;
        }
        
        img:not([src]) {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}

// Call the function to add CSS
addScrollAnimationCSS();

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-slider');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax
initParallax();

// Add typing effect to hero text
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeTimer);
            }
        }, 100);
    }
}

// Initialize typing effect after a delay
setTimeout(initTypingEffect, 1000);