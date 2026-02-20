/**
 * Navbar interactions and state management
 */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.navbar__mobile-toggle');
    const navLinks = document.querySelectorAll('.navbar__link');

    // Handle scroll state for transparent-to-solid transition
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Initial check
    handleScroll();

    // Listen for scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('menu-open');
            const isExpanded = navbar.classList.contains('menu-open');
            mobileToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('menu-open')) {
                navbar.classList.remove('menu-open');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', false);
                }
            }
        });
    });

    // Active state spy
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // offset for nav height
            const sectionId = current.getAttribute('id');

            const link = document.querySelector(`.navbar__menu a[href*=${sectionId}]`);
            if (!link) return;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', scrollActive, { passive: true });
}
