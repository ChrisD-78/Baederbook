// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and other animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .solution-item, .benefit-card');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Add parallax effect to hero section and rotate floating cards on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.opacity = 1 - (scrolled / 800);
    }
    
    // Calculate elliptical positions for all cards
    const scrollProgress = Math.min(scrolled / (window.innerHeight * 0.8), 1);
    const rotation = scrollProgress * 180; // Slower, more elegant rotation
    
    // Ellipse parameters
    const centerX = 50; // 50% from left
    const centerY = 50; // 50% from top
    const radiusX = 35; // Horizontal radius
    const radiusY = 20; // Vertical radius
    
    // Position each card in ellipse and apply rotation
    floatingCards.forEach((card, index) => {
        // Calculate angle for this card (6 cards = 60 degrees apart)
        const baseAngle = (index * 60) * (Math.PI / 180); // Convert to radians
        const totalAngle = baseAngle + (rotation * Math.PI / 180); // Add scroll rotation
        
        // Calculate elliptical position
        const x = centerX + radiusX * Math.cos(totalAngle);
        const y = centerY + radiusY * Math.sin(totalAngle);
        
        // Apply position and add subtle floating effect
        const floatOffset = Math.sin(scrolled * 0.01 + index) * 3;
        card.style.left = `${x}%`;
        card.style.top = `${y}%`;
        card.style.transform = `translate(-50%, -50%) translateY(${floatOffset}px)`;
        card.style.transition = 'all 0.1s ease-out';
    });
});

// Interactive button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add dynamic hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Mobile menu toggle (for responsive design)
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');
    
    // Check if we're on mobile
    if (window.innerWidth <= 968) {
        // Create hamburger menu if it doesn't exist
        let hamburger = document.querySelector('.hamburger');
        if (!hamburger) {
            hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            navContainer.appendChild(hamburger);
            
            // Add hamburger styles
            const style = document.createElement('style');
            style.textContent = `
                .hamburger {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    cursor: pointer;
                    z-index: 1001;
                }
                .hamburger span {
                    width: 25px;
                    height: 2px;
                    background: var(--dark-color);
                    transition: var(--transition);
                }
                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(8px, 8px);
                }
                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }
                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(8px, -8px);
                }
                @media (max-width: 968px) {
                    .nav-links {
                        position: fixed;
                        top: 0;
                        right: -100%;
                        height: 100vh;
                        width: 70%;
                        max-width: 300px;
                        background: var(--white);
                        flex-direction: column;
                        padding: 100px 40px;
                        gap: 24px;
                        box-shadow: -5px 0 20px rgba(0,0,0,0.1);
                        transition: right 0.3s ease;
                    }
                    .nav-links.active {
                        right: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
    }
};

// Initialize mobile menu
createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Counter animation for statistics
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    };
    
    updateCounter();
};

// Observe benefit stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text);
            
            if (!isNaN(number)) {
                // Animate numbers
                entry.target.dataset.suffix = text.replace(number, '');
                animateCounter(entry.target, number);
            }
            // Text elements will just appear normally without special animation
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.benefit-stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Demo Modal functionality
function initializeDemoModal() {
    const modal = document.getElementById('demoModal');
    const demoBtn = document.getElementById('demoRequestBtn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const demoForm = document.getElementById('demoForm');

    // Open modal
    if (demoBtn) {
        demoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close modal functions
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Handle form submission
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(demoForm);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                badName: formData.get('badName'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Simple validation
            if (!data.firstName || !data.lastName || !data.badName || !data.email) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }

            // Simulate form submission
            console.log('Demo Request Data:', data);
            
            // Show success message
            alert('Vielen Dank für Ihre Demo-Anfrage! Wir melden uns in Kürze bei Ihnen.');
            
            // Close modal and reset form
            closeModal();
            demoForm.reset();
        });
    }
}

// Contact Modal functionality
function initializeContactModal() {
    const modal = document.getElementById('contactModal');
    const contactBtn = document.getElementById('contactLink');
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = document.getElementById('contactCancelBtn');
    const contactForm = document.getElementById('contactForm');

    // Open modal
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal functions
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('contactName'),
                email: formData.get('contactEmail'),
                subject: formData.get('contactSubject'),
                message: formData.get('contactMessage')
            };

            // Validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }

            console.log('Contact Form Data:', data);
            alert('Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.');
            closeModal();
            contactForm.reset();
        });
    }
}

// Support Modal functionality
function initializeSupportModal() {
    const modal = document.getElementById('supportModal');
    const supportBtn = document.getElementById('supportLink');
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = document.getElementById('supportCancelBtn');
    const supportForm = document.getElementById('supportForm');

    // Open modal
    if (supportBtn) {
        supportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal functions
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Handle form submission
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(supportForm);
            const data = {
                name: formData.get('supportName'),
                email: formData.get('supportEmail'),
                bad: formData.get('supportBad'),
                message: formData.get('supportMessage')
            };

            // Validation
            if (!data.name || !data.email || !data.message) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }

            console.log('Support Form Data:', data);
            alert('Ihr Support-Ticket wurde erstellt! Wir bearbeiten Ihre Anfrage schnellstmöglich.');
            closeModal();
            supportForm.reset();
        });
    }
}

// About Modal functionality
function initializeAboutModal() {
    const modal = document.getElementById('aboutModal');
    const aboutBtn = document.getElementById('aboutLink');
    const mehrErfahrenBtn = document.getElementById('mehrErfahrenLink');
    const closeBtn = modal.querySelector('.close');

    // Open modal function
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Open modal from header link
    if (aboutBtn) {
        aboutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    // Open modal from "Mehr erfahren" button
    if (mehrErfahrenBtn) {
        mehrErfahrenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    // Close modal
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
}

// Initialize all modals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDemoModal();
    initializeContactModal();
    initializeSupportModal();
    initializeAboutModal();
});

console.log('🌊 Bäderbook - Digital Solutions initialized');

