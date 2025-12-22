// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.btn--menu');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.textContent.includes('Collections')) {
                    e.preventDefault();
                }
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    }

    // Active nav link
    setActiveNavLink();
    window.addEventListener('popstate', setActiveNavLink);
});

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && (currentPath.includes(href) || 
            (currentPath.includes('index') && href === 'index.html'))) {
            link.classList.add('active');
        }
    });
}

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('[aria-label="Search"]');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = prompt('Search watches...');
            if (query) {
                // Redirect to products page with search query
                window.location.href = `pages/products.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
});

// Account button
document.addEventListener('DOMContentLoaded', () => {
    const accountBtn = document.querySelector('[aria-label="Account"]');
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            alert('Account login feature coming soon!');
        });
    }
});

export { setActiveNavLink };
