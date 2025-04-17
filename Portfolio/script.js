// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');
const exploreBtn = document.getElementById('explore-btn');
const navLinks = document.querySelectorAll('.nav-link');
const projectBook = document.getElementById('project-book');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section[id]');

// Mobile Menu Toggle
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
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

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize EmailJS with proper error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        emailjs.init("FcXDRqJ37VYlq-rKD"); // Replace with your actual EmailJS public key
    } catch (error) {
        console.error("EmailJS initialization error:", error);
    }
});

// Contact Form Functionality with EmailJS
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.send-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const templateParams = {
                to_name: 'Md Akhlak',
                to_email: 'mohammadakhlak121@gmail.com', // Your receiving email
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                message: formData.get('message')
            };

            await emailjs.send(
                'service_stir7zm',
                'template_5a4bx4l',
                templateParams
            );

            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.backgroundColor = '#10B981';
            contactForm.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send';
            submitBtn.style.backgroundColor = '#EF4444';
            alert('Failed to send email. Please try again or contact directly at mohammadakhlak121@gmail.com');
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Stagger terminal line animations
const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.5}s`;
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .skills-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Hero section animations
document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-text');
    const githubBtn = document.querySelector('.github-btn');

    // Add initial styles
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateX(-50px)';
    githubBtn.style.opacity = '0';
    githubBtn.style.transform = 'translateY(20px)';

    // Animate elements
    setTimeout(() => {
        heroText.style.transition = 'all 0.8s ease-out';
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateX(0)';
    }, 300);

    setTimeout(() => {
        githubBtn.style.transition = 'all 0.8s ease-out';
        githubBtn.style.opacity = '1';
        githubBtn.style.transform = 'translateY(0)';
    }, 700);
});

// Enhanced project card interactions
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    // Add tilt effect
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

    // Reset card position
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        setTimeout(() => {
            card.style.transform = '';
        }, 100);
    });
});

// Smooth scroll with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add GitHub link click handler
document.querySelectorAll('.github-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        window.open(url, '_blank');
    });
});

// Validate all external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    // Add security attributes
    link.setAttribute('rel', 'noopener noreferrer');
    
    // Add click handler
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
            console.warn('Invalid link detected:', link);
        }
    });
});

// Enhanced scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skills-box, .contact-container');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const { left, top } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Smooth scroll with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update URL without scrolling
            history.pushState(null, null, targetId);
        }
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});