import { getAllProducts, getProductsByCategory, getProductById } from '../../data/products.js';
import { cartManager } from './cart.js';

// Products Page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('products-grid')) {
        initProductsPage();
    }
});

function initProductsPage() {
    let allProducts = getAllProducts();
    let filteredProducts = allProducts;

    const productsGrid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');
    const sortSelect = document.getElementById('sort-select');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const resetBtn = document.getElementById('reset-filters');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const ratingFilters = document.querySelectorAll('.rating-filter');

    // Initial render
    renderProducts(filteredProducts);

    // Sort handler
    sortSelect?.addEventListener('change', (e) => {
        filteredProducts = sortProducts(filteredProducts, e.target.value);
        renderProducts(filteredProducts);
    });

    // Price filter
    priceRange?.addEventListener('input', (e) => {
        priceValue.textContent = `$${e.target.value}`;
        applyFilters();
    });

    // Category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Rating filters
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Reset filters
    resetBtn?.addEventListener('click', () => {
        priceRange.value = 500;
        priceValue.textContent = '$500';
        categoryFilters.forEach(f => f.checked = false);
        ratingFilters.forEach(f => f.checked = false);
        applyFilters();
    });

    function applyFilters() {
        filteredProducts = allProducts;

        // Price filter
        const maxPrice = parseInt(priceRange.value);
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

        // Category filter
        const selectedCategories = Array.from(categoryFilters)
            .filter(f => f.checked)
            .map(f => f.value);
        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category));
        }

        // Rating filter
        const selectedRatings = Array.from(ratingFilters)
            .filter(f => f.checked)
            .map(f => parseFloat(f.value));
        if (selectedRatings.length > 0) {
            filteredProducts = filteredProducts.filter(p =>
                selectedRatings.some(r => p.rating >= r)
            );
        }

        renderProducts(filteredProducts);
    }

    function renderProducts(products) {
        if (products.length === 0) {
            productsGrid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        productsGrid.style.display = 'grid';
        emptyState.style.display = 'none';

        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-card__actions">
                        <button class="btn btn--icon" aria-label="Add to wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="btn btn--icon quick-view-btn" data-id="${product.id}" aria-label="Quick view">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <button class="btn btn--primary btn--block product-card__add-to-cart">
                        Add to Cart
                    </button>
                </div>
                <div class="product-card__content">
                    <div class="product-card__rating">
                        ${generateStarRating(product.rating)}
                        <span class="product-card__reviews">(${product.reviews})</span>
                    </div>
                    <h3 class="product-card__title">${product.name}</h3>
                    <div class="product-card__price">
                        $${product.price.toFixed(2)}
                    </div>
                </div>
            </div>
        `).join('');

        // Update product count
        document.getElementById('product-count').textContent = products.length;

        // Add event listeners
        document.querySelectorAll('.product-card__add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                const id = parseInt(card.dataset.id);
                const product = allProducts.find(p => p.id === id);
                if (product) {
                    cartManager.addItem(product);
                }
            });
        });

        // Quick view
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                window.location.href = `product-detail.html?id=${id}`;
            });
        });
    }
}

// Product Detail Page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-detail')) {
        initProductDetailPage();
    }
});

function initProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = getProductById(productId);

    if (!product) {
        document.getElementById('product-detail').innerHTML = '<p>Product not found</p>';
        return;
    }

    // Render product details
    renderProductDetail(product);
    renderRelatedProducts(product.category);
}

function renderProductDetail(product) {
    const detail = document.getElementById('product-detail');

    detail.innerHTML = `
        <div class="product-gallery">
            <div class="gallery-main">
                <img id="main-image" src="${product.image}" alt="${product.name}" class="gallery-main__image">
            </div>
            <div class="gallery-thumbnails" id="gallery-thumbnails">
                <div class="gallery-thumbnail active">
                    <img src="${product.image}" alt="View 1">
                </div>
            </div>
        </div>

        <div class="product-info">
            <div class="product-header">
                <h1 id="product-name" class="product-name">${product.name}</h1>
                <button class="btn btn--icon wishlist-btn" aria-label="Add to wishlist">
                    <i class="far fa-heart"></i>
                </button>
            </div>

            <div class="product-rating" id="product-rating">
                <div class="stars">${generateStarRating(product.rating)}</div>
                <span class="reviews-count">(${product.reviews} reviews)</span>
            </div>

            <div class="product-price">
                <span id="product-price" class="price">$${product.price.toFixed(2)}</span>
            </div>

            <div class="product-description">
                <h3>Description</h3>
                <p id="product-description">${product.description}</p>
            </div>

            <div class="product-options">
                <div class="option-group">
                    <label for="color-select">Color:</label>
                    <select id="color-select" class="select-input">
                        <option value="">Select Color</option>
                        <option value="black">Black</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                    </select>
                </div>

                <div class="option-group">
                    <label for="quantity">Quantity:</label>
                    <div class="quantity-selector">
                        <button id="decrease-qty" class="qty-btn">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" id="quantity" value="1" min="1" max="10" class="qty-input">
                        <button id="increase-qty" class="qty-btn">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="product-actions">
                <button class="btn btn--primary btn--large" id="add-to-cart-btn">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn--outline btn--large" id="add-to-wishlist-btn">
                    <i class="fas fa-heart"></i> Add to Wishlist
                </button>
            </div>

            <div class="product-info-box">
                <div class="info-item">
                    <i class="fas fa-shipping-fast"></i>
                    <div>
                        <strong>Free Shipping</strong>
                        <p>On orders over $100</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-undo"></i>
                    <div>
                        <strong>30-Day Returns</strong>
                        <p>Hassle-free returns</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-shield-alt"></i>
                    <div>
                        <strong>Secure Payment</strong>
                        <p>100% secure checkout</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Quantity controls
    const qtyInput = document.getElementById('quantity');
    document.getElementById('increase-qty').addEventListener('click', () => {
        qtyInput.value = Math.min(10, parseInt(qtyInput.value) + 1);
    });
    document.getElementById('decrease-qty').addEventListener('click', () => {
        qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
    });

    // Add to cart
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const quantity = parseInt(qtyInput.value);
        cartManager.addItem(product, quantity);
    });

    // Wishlist
    document.getElementById('add-to-wishlist-btn').addEventListener('click', () => {
        cartManager.showNotification('Added to wishlist!');
    });
}

function renderRelatedProducts(category) {
    const relatedContainer = document.getElementById('related-products');
    const products = getProductsByCategory(category).slice(0, 4);

    if (relatedContainer && products.length > 0) {
        relatedContainer.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <button class="btn btn--primary btn--block product-card__add-to-cart">
                        Add to Cart
                    </button>
                </div>
                <div class="product-card__content">
                    <div class="product-card__rating">
                        ${generateStarRating(product.rating)}
                        <span class="product-card__reviews">(${product.reviews})</span>
                    </div>
                    <h3 class="product-card__title">${product.name}</h3>
                    <div class="product-card__price">
                        $${product.price.toFixed(2)}
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.product-card__add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                const id = parseInt(card.dataset.id);
                const product = getProductById(id);
                if (product) {
                    cartManager.addItem(product);
                }
            });
        });
    }
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }

    return stars;
}

function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'newest':
            return sorted.reverse();
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
}

export { generateStarRating };
