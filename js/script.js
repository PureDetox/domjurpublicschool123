// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active nav link highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ============================================
// Hero Slider
// ============================================
const heroSlides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (index >= heroSlides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = heroSlides.length - 1;
    } else {
        currentSlide = index;
    }
    
    heroSlides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event listeners
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        stopSlideShow();
        startSlideShow();
    });
});

// Start slideshow if hero section exists
if (heroSlides.length > 0) {
    startSlideShow();
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideShow);
        heroSection.addEventListener('mouseleave', startSlideShow);
    }
}

// ============================================
// Stats Counter Animation
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

function observeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Initialize stats animation
if (document.querySelector('.stat-number')) {
    observeStats();
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Scroll Animations
// ============================================
function observeElements() {
    const elements = document.querySelectorAll('.program-card, .feature-item, .news-card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations
if (document.querySelector('.program-card, .feature-item, .news-card')) {
    observeElements();
}

// ============================================
// Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');
const admissionForm = document.getElementById('admissionForm');

function handleFormSubmit(form, e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
    `;
    successMessage.style.cssText = `
        background: #10b981;
        color: white;
        padding: 1.5rem;
        border-radius: 10px;
        margin-top: 1rem;
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;
    
    form.appendChild(successMessage);
    form.reset();
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => handleFormSubmit(contactForm, e));
}

if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => handleFormSubmit(admissionForm, e));
}

// ============================================
// Gallery Lightbox (if gallery page exists)
// ============================================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="" class="lightbox-img">
        <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
    `;
    document.body.appendChild(lightbox);
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(img => img.src);
    
    function openLightbox(index) {
        currentIndex = index;
        lightbox.classList.add('active');
        lightbox.querySelector('.lightbox-img').src = images[index];
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightbox.querySelector('.lightbox-img').src = images[currentIndex];
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightbox.querySelector('.lightbox-img').src = images[currentIndex];
    }
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });
}

// Initialize gallery if gallery items exist
if (document.querySelector('.gallery-item')) {
    initGallery();
}

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

