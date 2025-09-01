// =========================
// PARTICLE SYSTEM
// =========================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// =========================
// HEADER SCROLL EFFECTS
// =========================
function handleHeaderScroll() {
    const header = document.getElementById('header');
    const scrolled = window.scrollY > 50;
    header.classList.toggle('scrolled', scrolled);
}

window.addEventListener('scroll', handleHeaderScroll);

// =========================
// SMOOTH SCROLLING NAVIGATION
// =========================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =========================
// SCROLL ANIMATIONS
// =========================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animations for stats
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    if (!counter.hasAttribute('data-animated')) {
                        animateCounter(counter);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up, .service-card').forEach(el => {
        observer.observe(el);
    });
}

// =========================
// COUNTER ANIMATIONS
// =========================
function animateCounter(counter) {
    counter.setAttribute('data-animated', 'true');
    
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2500;
    const start = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Enhanced easing function
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(target * easeOutExpo);
        
        counter.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// =========================
// SERVICE CARD INTERACTIONS
// =========================
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
            this.style.boxShadow = '0 30px 60px rgba(14, 165, 233, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
}

// =========================
// BUTTON RIPPLE EFFECTS
// =========================
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.className = 'btn-ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 700);
        });
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// =========================
// INIT ON DOM CONTENT LOADED
// =========================
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initSmoothScrolling();
    initScrollAnimations();
    initServiceCardEffects();
    initButtonEffects();
});
