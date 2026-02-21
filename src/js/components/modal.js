/**
 * Logic for the Contact Modal and Scroll-to-Top Button
 */

function initModalAndScroll() {
    // 1. Scroll-to-Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('is-visible');
            } else {
                scrollTopBtn.classList.remove('is-visible');
            }
        });

        // Smooth scroll to top on click
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 2. Contact Modal
    const modal = document.getElementById('contactModal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('[data-close="contactModal"]');

    if (modal) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('is-open');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                modal.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
    }
}
