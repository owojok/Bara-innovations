/**
 * Custom Luxury Interactions (Cursor, Preloader)
 */

function initInteractions() {
    // 1. Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor__dot');

    // Only init if device supports hover (not touch devices)
    if (cursor && cursorDot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            // Fast follow for the dot
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;

            // Trailing animated follow for the outer ring
            cursor.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover state to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .sector-item');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
        });
    }

    // 2. Magnetic Elements Logic (Enhancement 3)
    initMagneticElements();
}

/**
 * Magnetic element logic for Luxury interactions
 */
function initMagneticElements() {
    // Select primary call to actions and main links
    const magnetics = document.querySelectorAll('.btn, .navbar__link');

    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate center of element
            const h = rect.width / 2;
            const w = rect.height / 2;
            // Calculate distance from center
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - w;

            // Limit the pull distance
            const pullX = x * 0.3;
            const pullY = y * 0.3;

            // Apply transform dynamically
            btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
        });

        // Reset transform on mouse leave
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
}

document.addEventListener('DOMContentLoaded', initInteractions);
