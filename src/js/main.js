/**
 * Main application entry point
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize custom interactions (cursor, preloader)
    initInteractions();

    // Initialize Modal and Scroll-to-Top
    if (typeof initModalAndScroll === 'function') initModalAndScroll();

    // Initialize Navigation specific logic
    initNavbar();

    // Initialize global scroll animations
    initAnimations();

    // Initialize Interactive Pillars Hover (Enhancement 6)
    initPillarHoverEffects();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/**
 * Interactive "Pillars" Hover States (Enhancement 6)
 */
function initPillarHoverEffects() {
    const sectorsSection = document.getElementById('sectors');
    const sectorItems = document.querySelectorAll('.sector-item');

    if (!sectorsSection || sectorItems.length === 0) return;

    // Define subtle background colors for each sector index
    const hoverColors = [
        'rgba(140, 140, 140, 0.05)', // Raw Materials
        'rgba(46, 204, 113, 0.05)',  // Precious Stones (Emerald)
        'rgba(212, 175, 55, 0.05)',  // Mining (Gold)
        'rgba(241, 196, 15, 0.05)',  // Agriculture (Wheat)
        'rgba(52, 152, 219, 0.05)',  // Technology (Blue)
        'rgba(155, 89, 182, 0.05)'   // Consultancy (Purple)
    ];

    sectorItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Apply specific background color to the section
            sectorsSection.style.backgroundColor = hoverColors[index % hoverColors.length];
        });

        item.addEventListener('mouseleave', () => {
            // Revert to global background color variable
            sectorsSection.style.backgroundColor = 'var(--color-surface)';
        });
    });
}
