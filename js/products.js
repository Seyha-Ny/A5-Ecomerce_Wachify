/**
 * =============================================================================
 * Products Page JavaScript - WatchStore
 * Clean, Organized, and Functional Code
 * =============================================================================
 */

// =============================================================================
// PRODUCT DATA
// =============================================================================

const allProducts = [
    {
        id: 'luxury-gold-watch',
        title: 'Luxury Gold Watch',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        category: 'luxury',
        badge: 'New',
        rating: 4.8,
        reviews: 127,
        description: 'Exquisite gold-plated luxury watch with Swiss movement'
    },
    {
        id: 'smart-watch-pro',
        title: 'Smart Watch Pro',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop',
        category: 'smart',
        badge: 'Sale',
        rating: 4.6,
        reviews: 89,
        description: 'Advanced smartwatch with health tracking and GPS'
    },
    {
        id: 'classic-leather',
        title: 'Classic Leather Watch',
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1515347619252-f638703af87e?w=400&h=300&fit=crop',
        category: 'classic',
        badge: 'Popular',
        rating: 4.7,
        reviews: 234,
        description: 'Timeless design with genuine leather strap'
    },
    {
        id: 'sport-digital',
        title: 'Sport Digital Watch',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1542496650-6ac245b5fb4a?w=400&h=300&fit=crop',
        category: 'sport',
        badge: 'Hot',
        rating: 4.5,
        reviews: 156,
        description: 'Rugged digital watch for outdoor adventures'
    },
    {
        id: 'elegant-rose',
        title: 'Elegant Rose Gold',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1515372039030-ce4a3668c0ff?w=400&h=300&fit=crop',
        category: 'luxury',
        badge: 'Limited',
        rating: 4.9,
        reviews: 67,
        description: 'Elegant rose gold timepiece with mother-of-pearl dial'
    },
    {
        id: 'fitness-tracker',
        title: 'Fitness Tracker Watch',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1575311372332-9cfe6d3b8b8f?w=400&h=300&fit=crop',
        category: 'smart',
        badge: 'New',
        rating: 4.3,
        reviews: 198,
        description: 'Comprehensive fitness tracking with heart rate monitor'
    },
    {
        id: 'vintage-automatic',
        title: 'Vintage Automatic',
        price: 749.99,
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
        category: 'classic',
        badge: 'Rare',
        rating: 4.8,
        reviews: 45,
        description: 'Vintage automatic movement with exhibition case back'
    },
    {
        id: 'diving-watch',
        title: 'Professional Diving Watch',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop',
        category: 'sport',
        badge: 'Pro',
        rating: 4.6,
        reviews: 112,
        description: 'Professional diving watch with 200m water resistance'
    },
    {
        id: 'minimalist-design',
        title: 'Minimalist Design Watch',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1515372039030-ce4a3668c0ff?w=400&h=300&fit=crop',
        category: 'classic',
        badge: 'Trending',
        rating: 4.4,
        reviews: 89,
        description: 'Clean minimalist design with Japanese movement'
    },
    {
        id: 'smartwatch-ultra',
        title: 'Smartwatch Ultra',
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop',
        category: 'smart',
        badge: 'Premium',
        rating: 4.7,
        reviews: 143,
        description: 'Premium smartwatch with advanced health features'
    },
    {
        id: 'chronograph-sport',
        title: 'Chronograph Sport Watch',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
        category: 'sport',
        badge: 'Sport',
        rating: 4.5,
        reviews: 78,
        description: 'Sport chronograph with tachymeter function'
    },
    {
        id: 'diamond-luxury',
        title: 'Diamond Luxury Watch',
        price: 2499.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        category: 'luxury',
        badge: 'Exclusive',
        rating: 5.0,
        reviews: 23,
        description: 'Luxury watch with genuine diamond bezel'
    }
];

// =============================================================================
// APPLICATION STATE
// =============================================================================

let currentProducts = [...allProducts];
let displayedProducts = 6;
let currentFilter = 'all';
let currentSort = 'featured';

// =============================================================================
// DOM ELEMENTS
// =============================================================================

const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const filterButtons = document.querySelectorAll('[data-filter]');

// =============================================================================
// PRODUCT RENDERING
// =============================================================================

/**
 * Create product card HTML
 */
function createProductCard(product) {
    return `
        <div class="col-lg-4 col-md-6 mb-4 product-item" data-category="${product.category}">
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-body">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="text-muted small">${product.description}</p>
                    <div class="product-rating mb-2">
                        ${generateStars(product.rating)}
                        <small class="text-muted">(${product.reviews} reviews)</small>
                    </div>
                    <div class="product-price">${formatCurrency(product.price)}</div>
                    <button class="btn btn-add-cart" onclick="WatchStore.addToCart('${product.id}')">
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

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }

    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-warning"></i>';
    }

    return stars;
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Render products to the grid
 */
function renderProducts() {
    if (!productsGrid) return;

    const productsToShow = currentProducts.slice(0, displayedProducts);

    productsGrid.innerHTML = productsToShow
        .map(product => createProductCard(product))
        .join('');

    // Update load more button
    if (loadMoreBtn) {
        loadMoreBtn.style.display = displayedProducts >= currentProducts.length ? 'none' : 'inline-block';
    }

    // Add animations
    setTimeout(() => {
        const cards = productsGrid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fade-in');
            }, index * 100);
        });
    }, 100);
}

// =============================================================================
// FILTERING AND SORTING
// =============================================================================

/**
 * Filter products by category
 */
function filterProducts(category) {
    currentFilter = category;

    if (category === 'all') {
        currentProducts = [...allProducts];
    } else {
        currentProducts = allProducts.filter(product => product.category === category);
    }

    // Apply current sort
    sortProducts(currentSort);

    // Reset displayed products
    displayedProducts = 6;

    // Render filtered products
    renderProducts();

    // Update active filter button
    updateFilterButtons(category);
}

/**
 * Sort products
 */
function sortProducts(sortBy) {
    currentSort = sortBy;

    switch (sortBy) {
        case 'price-low':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            currentProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'rating':
            currentProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'featured':
        default:
            // Keep original order (featured items first)
            break;
    }
}

/**
 * Search products
 */
function searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
        currentProducts = [...allProducts];
    } else {
        currentProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    // Reset displayed products
    displayedProducts = 6;

    // Render search results
    renderProducts();

    // Show message if no results
    if (currentProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>No products found</h4>
                <p class="text-muted">Try searching with different keywords</p>
            </div>
        `;
    }
}

/**
 * Update filter button states
 */
function updateFilterButtons(activeCategory) {
    filterButtons.forEach(button => {
        if (button.dataset.filter === activeCategory) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterProducts(button.dataset.filter);
        });
    });

    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortProducts(e.target.value);
            renderProducts();
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProducts(e.target.value);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts(e.target.value);
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchProducts(searchInput.value);
        });
    }

    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayedProducts = Math.min(displayedProducts + 6, currentProducts.length);
            renderProducts();

            // Scroll to newly loaded products
            if (displayedProducts < currentProducts.length) {
                setTimeout(() => {
                    const newProducts = productsGrid.querySelectorAll('.product-item');
                    const lastProduct = newProducts[newProducts.length - 1];
                    if (lastProduct) {
                        lastProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 300);
            }
        });
    }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize products page
 */
function initializeProductsPage() {
    console.log('🛍️ Products Page Initializing...');

    // Setup event listeners
    setupEventListeners();

    // Load initial products
    renderProducts();

    console.log('✅ Products Page Ready!');
}

// =============================================================================
// START APPLICATION
// =============================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializeProductsPage);
