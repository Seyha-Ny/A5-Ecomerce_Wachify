// Collection Page JavaScript - Handles filtering, product display, and cart functionality

// Import product data
import products from "../js/data.js";

// Get DOM elements
const productsContainer = document.getElementById("productsContainer");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const categoryFilters = document.querySelectorAll(".category-filter");
const applyFiltersBtn = document.getElementById("applyFilters");
const clearFiltersBtn = document.getElementById("clearFilters");
const cartCount = document.getElementById("cartCount");

// Get current category from page URL or filename
function getCurrentCategory() {
    const pathname = globalThis.location.pathname;
    if (pathname.includes("smartwatch")) return "watch";
    if (pathname.includes("phone")) return "phone";
    if (pathname.includes("laptop")) return "computer";
    return "watch";
}

const currentCategory = getCurrentCategory();

// Update price range display
priceRange.addEventListener("input", (e) => {
    priceValue.textContent = e.target.value;
});

// Filter products by category and criteria
function filterProducts() {
    const maxPrice = Number.parseInt(priceRange.value, 10);
    const selectedBrands = Array.from(categoryFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Filter by category
    let filtered = products.filter(product => product.category === currentCategory);

    // Filter by price
    filtered = filtered.filter(product => product.price <= maxPrice);

    // Filter by brand (if any selected)
    if (selectedBrands.length > 0) {
        filtered = filtered.filter(product => {
            const brand = product.title.toLowerCase().split(" ")[0];
            return selectedBrands.some(selected => brand.includes(selected));
        });
    }

    return filtered;
}

// Render products to the DOM
function renderProducts(productsToRender) {
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-inbox"></i>
                <p>No products found matching your filters.</p>
            </div>
        `;
        return;
    }

    productsContainer.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <span class="product-badge">${product.discount || 'New'}</span>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description || 'High-quality product'}</p>
                <div class="product-rating">
                    <span class="stars">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-half"></i>
                    </span>
                    <span class="rating-count">(${product.reviews || 156} reviews)</span>
                </div>
                <div class="product-price">
                    <div>
                        <span class="price">$${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
                    </div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(event, ${product.id}, '${product.title}', ${product.price}, '${product.image}')">
                    <i class="bi bi-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join("");
}

// Initialize page with products
function initializePage() {
    const filteredProducts = filterProducts();
    renderProducts(filteredProducts);
    updateCartCount();
}

// Add event listeners for filters
applyFiltersBtn.addEventListener("click", () => {
    const filteredProducts = filterProducts();
    renderProducts(filteredProducts);
});

clearFiltersBtn.addEventListener("click", () => {
    priceRange.value = priceRange.max;
    priceValue.textContent = priceRange.max;
    categoryFilters.forEach(checkbox => checkbox.checked = false);
    const filteredProducts = filterProducts();
    renderProducts(filteredProducts);
});

// Price range input event
priceRange.addEventListener("change", () => {
    const filteredProducts = filterProducts();
    renderProducts(filteredProducts);
});

// Add to cart functionality
function addToCart(event, productId, title, price, image) {
    event.preventDefault();
    event.stopPropagation();

    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: title,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show visual feedback
    showCartNotification(`${title} added to cart!`);

    // Update cart count
    updateCartCount();
}

// Update cart count badge
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show cart notification
function showCartNotification(message) {
    const notification = document.createElement("div");
    notification.className = "alert alert-success position-fixed top-0 end-0 m-3";
    notification.style.zIndex = "10000";
    notification.innerHTML = `
        <i class="bi bi-check-circle"></i> ${message}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Expose addToCart to window scope for onclick handlers
globalThis.addToCart = addToCart;

// Initialize on page load
document.addEventListener("DOMContentLoaded", initializePage);
