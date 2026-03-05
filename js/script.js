/**
 * SU Tour and Travel - Interactions & Functionality
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Sticky Header & Active Link Highlighting
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();

    // 3. Scroll Reveal Animations utilizing Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px" // Slight offset
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});

// 4. Preloader
const preloader = document.querySelector(".preloader");
window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => {
            preloader.style.display = "none";
        }, 300);
    }, 150);
});

// 5. Custom Cursor
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

// Check if device supports hover
if (window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Instantly move the dot
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Smoothly animate the follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Add hover effect to interactive elements
    const hoverTargets = document.querySelectorAll("a, button, input, textarea, select, .hover-target");
    hoverTargets.forEach(target => {
        target.addEventListener("mouseenter", () => {
            cursor.classList.add("hover");
            follower.classList.add("hover");
        });
        target.addEventListener("mouseleave", () => {
            cursor.classList.remove("hover");
            follower.classList.remove("hover");
        });
    });
}

// 6. Vanilla Tilt for 3D Cards
// Using VanillaTilt.init directly for elements with class .tilt-card
if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02
    });

    VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
        max: 5,
        speed: 500,
        perspective: 1000
    });
}

// 7. Parallax Effect on Scroll
const parallaxElements = document.querySelectorAll(".parallax");
const parallaxItems = document.querySelectorAll(".parallax-element");

window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    parallaxElements.forEach(el => {
        let speed = el.getAttribute("data-speed");
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });

    parallaxItems.forEach(el => {
        let speed = el.getAttribute("data-speed");
        // Only apply if element is in viewport for performance, simplified here:
        el.style.transform = `translateY(${scrollY * speed * 0.1}px)`;
    });
});

// 8. Contact Form WhatsApp Redirect
const contactForm = document.getElementById('su-contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const service = document.getElementById('form-service').value;
        const message = document.getElementById('form-message').value.trim();

        // Format the message using standard newlines which get encoded properly
        let whatsappMessage = `*New Inquiry from SU Tour & Travel Website*\n\n`;
        whatsappMessage += `*Name:* ${name}\n`;
        if (email) whatsappMessage += `*Email:* ${email}\n`;
        whatsappMessage += `*Phone:* ${phone}\n`;
        if (service) whatsappMessage += `*Service/Package:* ${service}\n`;
        whatsappMessage += `*Message:*\n${message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp number
        const whatsappNumber = '918171311827';

        // Open WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        // Optional: Reset form
        contactForm.reset();
    });
}

// 9. Google Reviews Infinite Slider
const reviewsTrack = document.getElementById('reviewsTrack');
if (reviewsTrack) {
    // Clone all review cards and append them for seamless infinite scroll
    const reviewCards = reviewsTrack.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        const clone = card.cloneNode(true);
        reviewsTrack.appendChild(clone);
    });
}
