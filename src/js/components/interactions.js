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
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('is-hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('is-hovering');
            });
        });
    }
}
