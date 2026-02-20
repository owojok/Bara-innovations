/**
 * Global scroll animations using Intersection Observer
 */

function initAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // If they prefer reduced motion, reveal everything immediately
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // Set up standard animation properties
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            will-change: opacity, transform;
        }
        
        .animate-on-scroll.is-visible {
            opacity: 1;
            transform: translate(0, 0);
        }
        
        .fade-up { transform: translateY(40px); }
        .fade-left { transform: translateX(40px); }
        .fade-right { transform: translateX(-40px); }
        
        /* Support for grouped staggering */
        .sector-card.animate-on-scroll {
            transition-delay: calc(var(--delay, 0) * 150ms);
        }
    `;
    document.head.appendChild(styleSheet);

    // Initialise intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS transition
                entry.target.classList.add('is-visible');
                // Stop observing once animated in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Find all elements to animate and observe them
    const animationElements = document.querySelectorAll('.animate-on-scroll');
    animationElements.forEach(el => {
        // Set default animation direction if none specified
        if (!el.classList.contains('fade-up') &&
            !el.classList.contains('fade-left') &&
            !el.classList.contains('fade-right')) {
            el.classList.add('fade-up');
        }

        animateObserver.observe(el);
    });
}
