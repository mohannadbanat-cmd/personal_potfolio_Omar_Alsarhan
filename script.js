/* ========================================
   Omar Al Sarhan — Portfolio Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. TYPED TEXT ANIMATION (manual, no lib)
    // ==========================================
    const typedElement = document.getElementById('typed-output');
    const phrases = [
        'Financial Markets Specialist',
        'Wealth Management Consultant',
        'Forex & Crypto Expert',
        'Entrepreneur & Founder'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // pause before next
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ==========================================
    // 2. STICKY HEADER
    // ==========================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 60);
    });

    // ==========================================
    // 3. MOBILE NAVIGATION
    // ==========================================
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('open');
        menuIcon.classList.toggle('bx-x'); // morph hamburger to X
    });

    // Close nav on link click
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            menuIcon.classList.remove('bx-x');
        });
    });

    // ==========================================
    // 4. ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            const link = document.querySelector(`.navbar a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ==========================================
    // 5. ANIMATED COUNTERS
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            function updateCount() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    return;
                }
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            }

            updateCount();
        });

        countersAnimated = true;
    }

    // ==========================================
    // 6. METHOD BARS ANIMATION
    // ==========================================
    const methodBars = document.querySelectorAll('.method-bar');
    let barsAnimated = false;

    function animateMethodBars() {
        if (barsAnimated) return;

        methodBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.setProperty('--bar-width', width + '%');
            bar.classList.add('animated');
        });

        barsAnimated = true;
    }

    // ==========================================
    // 7. INTERSECTION OBSERVER for counters & bars
    // ==========================================
    const trackRecordSection = document.getElementById('track-record');

    if (trackRecordSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    animateMethodBars();
                }
            });
        }, { threshold: 0.2 });

        observer.observe(trackRecordSection);
    }

    // ==========================================
    // 8. SCROLL REVEAL ANIMATIONS
    // ==========================================
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 800,
            delay: 100,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            reset: false,
        });

        sr.reveal('.section-heading', { delay: 50 });
        sr.reveal('.section-subtext', { delay: 100 });
        sr.reveal('.hero-greeting', { origin: 'left', delay: 200 });
        sr.reveal('.hero-name', { origin: 'left', delay: 300 });
        sr.reveal('.hero-title', { origin: 'left', delay: 400 });
        sr.reveal('.hero-description', { origin: 'left', delay: 500 });
        sr.reveal('.hero-cta', { origin: 'left', delay: 600 });
        sr.reveal('.hero-socials', { origin: 'left', delay: 700 });
        sr.reveal('.hero-image', { origin: 'right', delay: 400 });

        sr.reveal('.about-text', { origin: 'left' });
        sr.reveal('.about-experience', { origin: 'right' });

        sr.reveal('.expertise-card', { interval: 120 });
        sr.reveal('.stat-card', { interval: 100 });
        sr.reveal('.method-item', { interval: 100 });
        sr.reveal('.risk-section', { delay: 200 });
        sr.reveal('.vision-card', { interval: 150 });
        sr.reveal('.goal-item', { interval: 100 });

        sr.reveal('.contact-info', { origin: 'left' });
        sr.reveal('.contact-form', { origin: 'right' });
    }

    // ==========================================
    // 9. HERO PARTICLES
    // ==========================================
    const particlesContainer = document.getElementById('particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 4;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.bottom = '-10px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        particlesContainer.appendChild(particle);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    // Create initial batch
    for (let i = 0; i < 25; i++) {
        createParticle();
    }

    // Continue creating
    setInterval(createParticle, 800);

    // ==========================================
    // 10. CONTACT FORM HANDLER
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = '✓ Message sent successfully!';
            formStatus.style.color = '#d4af37';
            contactForm.reset();

            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

});