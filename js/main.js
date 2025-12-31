/**
 * =============================================================================
 * WatchStore E-Commerce Website - Main JavaScript
 * Clean, Organized, and Functional Code
 * =============================================================================
 */

// =============================================================================
// GLOBAL VARIABLES AND CONFIGURATION
// =============================================================================

const CONFIG = {
    API_BASE_URL: '/api',
    STORAGE_KEYS: {
        CART: 'watchstore_cart',
        USER: 'watchstore_user',
        WISHLIST: 'watchstore_wishlist'
    },
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000
};

// Application state
let cart = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CART)) || [];
let currentUser = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USER)) || null;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Format currency with proper formatting
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Show toast notification with enhanced UX
 */
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    const icon = type === 'success' ? 'fa-check-circle' :
        type === 'error' ? 'fa-exclamation-circle' :
            type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';

    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${icon} me-2"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'var(--success-color)' :
            type === 'error' ? 'var(--danger-color)' :
                type === 'warning' ? 'var(--warning-color)' : 'var(--info-color)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        maxWidth: '350px',
        fontSize: '14px'
    });

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, CONFIG.TOAST_DURATION);
}

/**
 * Update cart count with animation
 */
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;

    const total = cart.reduce((sum, item) => sum + item.qty, 0);

    // Add bounce animation
    cartCount.style.transform = 'scale(1.3)';
    cartCount.style.transition = 'transform 0.3s ease';

    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);

    cartCount.textContent = total;
}

/**
 * Save cart to localStorage
 */
function saveCart() {
    localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartCount();
}

/**
 * Get product data from card element
 */
function getProductDataFromCard(card) {
    const title = card.querySelector('.product-title')?.textContent ||
        card.querySelector('h3')?.textContent ||
        card.querySelector('h2')?.textContent;
    const priceText = card.querySelector('.product-price')?.textContent ||
        card.querySelector('.price')?.textContent;
    const image = card.querySelector('img')?.src;
    const id = card.dataset.productId || title?.toLowerCase().replace(/\s+/g, '-');

    if (!title || !priceText) {
        throw new Error('Missing product information');
    }

    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

    return { id, title, price, image };
}

// =============================================================================
// CART FUNCTIONALITY
// =============================================================================

/**
 * Add product to cart with enhanced UX
 */
function addToCart(productId, quantity = 1) {
    try {
        const card = document.querySelector(`[data-product-id="${productId}"]`) ||
            document.querySelector('.product-card');

        if (!card) {
            showToast('Product not found', 'error');
            return;
        }

        const productData = getProductDataFromCard(card);

        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === productData.id);

        if (existingItem) {
            existingItem.qty += quantity;
            showToast(`${productData.title} quantity updated (${existingItem.qty} in cart)`, 'success');
        } else {
            cart.push({
                ...productData,
                qty: quantity
            });
            showToast(`${productData.title} added to cart!`, 'success');
        }

        saveCart();

        // Animate button if it exists
        const button = card.querySelector('.btn-add-cart');
        if (button) {
            animateButton(button);
        }

    } catch (error) {
        console.error('Error adding to cart:', error);
        showToast('Failed to add product to cart', 'error');
    }
}

/**
 * Animate button for better UX
 */
function animateButton(button) {
    const originalText = button.innerHTML;
    const originalBg = button.style.background;

    // Success state
    button.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
    button.style.background = 'var(--success-color)';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = originalBg;
        button.disabled = false;
    }, 1000);
}

/**
 * Remove item from cart
 */
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        const item = cart[index];
        cart.splice(index, 1);
        saveCart();
        showToast(`${item.title} removed from cart`, 'success');
    }
}

/**
 * Update cart item quantity
 */
function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.qty = newQuantity;
            saveCart();
        }
    }
}

/**
 * Get cart total
 */
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

// =============================================================================
// USER AUTHENTICATION
// =============================================================================

/**
 * Check user session and update UI
 */
function checkUserSession() {
    const accountName = document.getElementById('accountName');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const divider = document.getElementById('divider');

    if (currentUser && accountName) {
        // User is logged in
        accountName.textContent = currentUser.name || currentUser.username || 'User';

        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (divider) divider.style.display = 'block';
    } else {
        // User is not logged in
        if (accountName) accountName.textContent = 'Account';

        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (divider) divider.style.display = 'none';
    }
}

/**
 * Handle user logout
 */
function logout() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
    currentUser = null;
    checkUserSession();
    showToast('Logged out successfully', 'success');

    // Redirect to home after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// =============================================================================
// PRODUCT DATA
// =============================================================================

/**
 * Sample product data for demonstration
 */
const sampleProducts = [
    {
        id: 'luxury-gold-watch',
        title: 'Luxury Gold Watch',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        category: 'luxury',
        badge: 'New',
        rating: 4.8,
        reviews: 127
    },
    {
        id: 'smart-watch-pro',
        title: 'Smart Watch Pro',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop',
        category: 'smart',
        badge: 'Sale',
        rating: 4.6,
        reviews: 89
    },
    {
        id: 'classic-leather',
        title: 'Classic Leather Watch',
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1515347619252-f638703af87e?w=400&h=300&fit=crop',
        category: 'classic',
        badge: 'Popular',
        rating: 4.7,
        reviews: 234
    },
    {
        id: 'sport-digital',
        title: 'Sport Digital Watch',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1542496650-6ac245b5fb4a?w=400&h=300&fit=crop',
        category: 'sport',
        badge: 'Hot',
        rating: 4.5,
        reviews: 156
    }
];

/**
 * Create product card HTML
 */
function createProductCard(product) {
    return `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-body">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-rating mb-2">
                        ${generateStars(product.rating)}
                        <small class="text-muted">(${product.reviews})</small>
                    </div>
                    <div class="product-price">${formatCurrency(product.price)}</div>
                    <button class="btn btn-add-cart" onclick="addToCart('${product.id}')">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generate star rating HTML
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }

    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-warning"></i>';
    }

    return stars;
}

/**
 * Load featured products
 */
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    container.innerHTML = sampleProducts
        .slice(0, 4)
        .map(product => createProductCard(product))
        .join('');
}

// =============================================================================
// FORM HANDLERS
// =============================================================================

/**
 * Handle newsletter subscription
 */
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;

    // Here you would normally send this to your backend
    showToast('Newsletter subscription successful!', 'success');
    event.target.reset();
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize application when DOM is ready
 */
function initializeApp() {
    console.log('🚀 WatchStore Application Initializing...');

    // Check user session
    checkUserSession();

    // Update cart count
    updateCartCount();

    // Load featured products
    loadFeaturedProducts();

    // Setup event listeners
    setupEventListeners();

    // Add animations to elements
    addScrollAnimations();

    console.log('✅ WatchStore Application Ready!');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Cart button (if it's not just a link to cart page)
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn && !cartBtn.hasAttribute('href')) {
        cartBtn.addEventListener('click', () => {
            showToast(`You have ${cart.length} items in cart`, 'info');
        });
    }
}

/**
 * Add scroll animations to elements
 */
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards and product cards
    document.querySelectorAll('.feature-card, .product-card').forEach(el => {
        observer.observe(el);
    });
}

// =============================================================================
// START APPLICATION
// =============================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Export functions for global access
window.WatchStore = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    showToast,
    formatCurrency
};
