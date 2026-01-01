// WeShop Main Module
const WeShop = {
    init: () => {
        document.addEventListener('DOMContentLoaded', () => {
            WeShop.utils.init();
            WeShop.components.init();
            // Initialize page-specific modules
            if (document.querySelector('.auth-section')) {
                Auth.init();
            }
            if (document.querySelector('.products-grid') || document.querySelector('.featured-products')) {
                Products.init();
            }
            if (document.querySelector('.cart-btn')) {
                Cart.init();
            }
            // Add fade-in animations
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                setTimeout(() => {
                    section.classList.add('fade-in');
                }, index * 100);
            });
        });
    },

    utils: {
        init: () => {
            // Global utility initializations
            WeShop.utils.handleResponsiveNav();
            WeShop.utils.setupEventDelegation();
        },

        storage: {
            get: (key) => {
                try {
                    return JSON.parse(localStorage.getItem(key)) || [];
                } catch {
                    return [];
                }
            },
            set: (key, value) => {
                localStorage.setItem(key, JSON.stringify(value));
            },
            remove: (key) => {
                localStorage.removeItem(key);
            }
        },

        session: {
            get: (key) => {
                try {
                    return JSON.parse(sessionStorage.getItem(key));
                } catch {
                    return null;
                }
            },
            set: (key, value) => {
                sessionStorage.setItem(key, JSON.stringify(value));
            },
            remove: (key) => {
                sessionStorage.removeItem(key);
            }
        },

        debounce: (func, wait) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        },

        animate: (element, animation) => {
            element.classList.add(animation);
            setTimeout(() => element.classList.remove(animation), 600);
        },

        handleResponsiveNav: () => {
            const navMenu = document.querySelector('.nav-menu');
            if (!navMenu) return;

            // For mobile, add toggle if needed, but since using flex, maybe not necessary
            // Assuming responsive CSS handles it
        },

        setupEventDelegation: () => {
            // Global event listeners
            document.addEventListener('click', (e) => {
                // Close modal when clicking outside
                if (e.target.classList.contains('modal')) {
                    WeShop.components.modal.hide(e.target.id);
                }
                // Close modal with close button
                if (e.target.classList.contains('close-modal')) {
                    const modal = e.target.closest('.modal');
                    if (modal) WeShop.components.modal.hide(modal.id);
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const openModals = document.querySelectorAll('.modal.show');
                    openModals.forEach(modal => WeShop.components.modal.hide(modal.id));
                }
            });
        }
    },

    components: {
        init: () => {
            WeShop.components.setupAccordions();
            WeShop.components.setupTabs();
        },

        modal: {
            show: (id) => {
                const modal = document.getElementById(id);
                if (modal) {
                    modal.classList.add('show');
                    modal.setAttribute('aria-hidden', 'false');
                    // Focus management
                    const focusable = modal.querySelector('button, [href], input, select, textarea');
                    if (focusable) focusable.focus();
                }
            },
            hide: (id) => {
                const modal = document.getElementById(id);
                if (modal) {
                    modal.classList.remove('show');
                    modal.setAttribute('aria-hidden', 'true');
                }
            }
        },

        toast: {
            show: (message, type = 'info') => {
                const toast = document.createElement('div');
                toast.className = `toast toast-${type}`;
                toast.textContent = message;
                toast.setAttribute('role', 'alert');
                toast.setAttribute('aria-live', 'assertive');
                document.body.appendChild(toast);
                setTimeout(() => {
                    toast.classList.add('show');
                }, 100);
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            }
        },

        setupAccordions: () => {
            document.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    const content = header.nextElementSibling;
                    const isExpanded = header.getAttribute('aria-expanded') === 'true';
                    header.setAttribute('aria-expanded', !isExpanded);
                    content.style.maxHeight = isExpanded ? '0' : content.scrollHeight + 'px';
                });
            });
        },

        setupTabs: () => {
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const formId = tab.dataset.form;
                    // Remove active from siblings
                    tab.parentNode.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    // Show corresponding form
                    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
                    document.getElementById(formId + '-form').classList.add('active');
                });
            });
        }
    }
};

// Initialize the app
WeShop.init();