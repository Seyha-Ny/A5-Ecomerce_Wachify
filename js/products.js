// Enhanced Product Management System for Modern Product Page
class ProductManager {
    constructor() {
        this.products = this.initializeProducts();
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        this.compareList = JSON.parse(localStorage.getItem("compareList")) || [];
        this.init();
    }

    initializeProducts() {
        return [
            {
                id: "pixel01",
                name: "Google Pixel 8 Pro",
                price: 599,
                originalPrice: 799,
                image: "/img/menu9.png",
                category: "phone",
                brand: "Google",
                rating: 4.5,
                reviews: 234,
                badge: "New",
                description: "Latest flagship with AI camera"
            },
            {
                id: "blackwatch01",
                name: "Premium Black Watch",
                price: 899,
                originalPrice: null,
                image: "/img/menu1.png",
                category: "watch",
                brand: "Rolex",
                rating: 5,
                reviews: 512,
                badge: "Bestseller",
                description: "Classic elegance meets modern tech"
            },
            {
                id: "strixg16",
                name: "ROG Strix G16",
                price: 1199,
                originalPrice: 1499,
                image: "/img/menu3.png",
                category: "computer",
                brand: "ASUS",
                rating: 4.5,
                reviews: 189,
                badge: "Gaming",
                description: "Ultimate gaming machine"
            },
            {
                id: "iphone17",
                name: "iPhone 17 Pro Max",
                price: 699,
                originalPrice: 999,
                image: "/img/menu5.png",
                category: "phone",
                brand: "Apple",
                rating: 5,
                reviews: 1234,
                badge: "Popular",
                description: "Apple's latest innovation"
            },
            {
                id: "greenwatch01",
                name: "Green Watch",
                price: 999,
                originalPrice: null,
                image: "/img/menu2.png",
                category: "watch",
                brand: "Samsung",
                rating: 4,
                reviews: 89,
                badge: null,
                description: "Eco-friendly smart timepiece"
            },
            {
                id: "legion01",
                name: "Lenovo Legion",
                price: 999,
                originalPrice: null,
                image: "/img/menu4.png",
                category: "computer",
                brand: "Lenovo",
                rating: 4.5,
                reviews: 234,
                badge: null,
                description: "Professional gaming laptop"
            },
            {
                id: "dellg15",
                name: "Dell G15 Gaming",
                price: 999,
                originalPrice: null,
                image: "/img/menu11.png",
                category: "computer",
                brand: "Dell",
                rating: 4,
                reviews: 156,
                badge: null,
                description: "Affordable gaming powerhouse"
            },
            {
                id: "rolex01",
                name: "Rolex",
                price: 799,
                originalPrice: null,
                image: "/img/menu10.png",
                category: "watch",
                brand: "Rolex",
                rating: 5,
                reviews: 892,
                badge: "Premium",
                description: "Luxury Swiss timepiece"
            },
            {
                id: "samsung01",
                name: "Samsung Galaxy S24",
                price: 699,
                originalPrice: null,
                image: "/img/menu12.png",
                category: "phone",
                brand: "Samsung",
                rating: 4.5,
                reviews: 445,
                badge: null,
                description: "Flagship Android experience"
            },
            {
                id: "oppoa3",
                name: "Oppo A3",
                price: 499,
                originalPrice: null,
                image: "/img/menu13.png",
                category: "phone",
                brand: "Oppo",
                rating: 4,
                reviews: 123,
                badge: null,
                description: "Budget-friendly smartphone"
            },
            {
                id: "iphone15",
                name: "iPhone 15 Pro Max",
                price: 399,
                originalPrice: 699,
                image: "/img/menu14.png",
                category: "phone",
                brand: "Apple",
                rating: 4.5,
                reviews: 890,
                badge: "Sale",
                description: "Previous generation flagship"
            },
            {
                id: "hppavilion",
                name: "HP Pavilion 15",
                price: 699,
                originalPrice: null,
                image: "/img/menu15.png",
                category: "computer",
                brand: "HP",
                rating: 4,
                reviews: 234,
                badge: null,
                description: "Everyday productivity laptop"
            },
            {
                id: "asustuf",
                name: "ASUS TUF 2020",
                price: 899,
                originalPrice: null,
                image: "/img/menu16.png",
                category: "computer",
                brand: "ASUS",
                rating: 4.5,
                reviews: 345,
                badge: null,
                description: "Durable gaming laptop"
            },
            {
                id: "galaxywatch",
                name: "Galaxy Watch 5 Pro",
                price: 999,
                originalPrice: null,
                image: "/img/menu17.png",
                category: "watch",
                brand: "Samsung",
                rating: 4.5,
                reviews: 567,
                badge: null,
                description: "Advanced health tracking"
            },
            {
                id: "gts7pro",
                name: "GTS7 Pro",
                price: 1199,
                originalPrice: null,
                image: "/img/menu18.png",
                category: "watch",
                brand: "Amazfit",
                rating: 4,
                reviews: 234,
                badge: null,
                description: "Premium fitness watch"
            }
        ];
    }

    init() {
        this.setupCart();
        this.setupSearch();
        this.setupFilters();
        this.setupWishlist();
        this.setupCompare();
        this.setupSorting();
        this.setupViewToggle();
        this.setupLoadMore();
        this.updateCartCount();
        this.updateWishlistCount();
        this.renderProducts();
        this.handleURLParameters();
    }

    renderProducts() {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return;

        productGrid.innerHTML = '';

        this.products.forEach((product, index) => {
            const productCard = this.createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        card.dataset.price = product.price;
        card.dataset.brand = product.brand;
        card.dataset.rating = product.rating;

        card.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                <div class="quick-actions">
                    <button class="quick-action-btn" onclick="productManager.quickView('${product.id}')" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="quick-action-btn" onclick="productManager.compareProduct('${product.id}')" title="Compare">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                </div>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-subtitle">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${this.generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="productManager.addToCart('${product.id}')">
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                    <button class="wishlist-btn ${this.wishlist.includes(product.id) ? 'active' : ''}" 
                            onclick="productManager.toggleWishlist('${product.id}', this)" 
                            title="Add to Wishlist">
                        <i class="${this.wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    setupCart() {
        // Cart functionality is now handled by the addToCart method
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            this.showAlert('Product not found', 'error');
            return;
        }

        const button = event.target;
        const originalHTML = button.innerHTML;

        // Add loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Adding...';
        button.disabled = true;

        // Simulate async operation
        setTimeout(() => {
            const exist = this.cart.find(item => item.id === product.id);

            if (exist) {
                exist.qty++;
            } else {
                this.cart.push({ ...product, qty: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(this.cart));
            this.updateCartCount();

            // Show success feedback
            button.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
            button.classList.add('btn-success');

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('btn-success');
                button.disabled = false;
            }, 2000);

            this.showAlert(`${product.name} added to cart!`, 'success');
        }, 500);
    }

    updateCartCount() {
        const cartCount = document.getElementById("cartCount");
        if (!cartCount) return;

        const total = this.cart.reduce((sum, item) => sum + item.qty, 0);
        cartCount.textContent = total;
    }

    setupSearch() {
        const searchForm = document.querySelector("form.d-flex");
        if (!searchForm) return;

        const searchInput = searchForm.querySelector("input[type='search']");

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const searchValue = searchInput.value.toLowerCase().trim();

            if (searchValue) {
                window.location.href = `product.html?search=${encodeURIComponent(searchValue)}`;
            }
        });

        // Handle search parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam && searchInput) {
            searchInput.value = searchParam;
            this.filterProducts(searchParam);
        }
    }

    filterProducts(searchTerm = '') {
        const cards = document.querySelectorAll(".product-card");
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-subtitle').textContent.toLowerCase();

            const matchesSearch = !searchTerm ||
                title.includes(searchTerm.toLowerCase()) ||
                description.includes(searchTerm.toLowerCase());

            if (matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const productCount = document.getElementById('productCount');
        if (productCount) {
            productCount.textContent = visibleCount;
        }
    }

    setupFilters() {
        // Category filters
        const categoryFilters = {
            'catPhone': 'phone',
            'catLaptop': 'computer',
            'catWatch': 'watch'
        };

        Object.entries(categoryFilters).forEach(([checkboxId, category]) => {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.applyFilters());
            }
        });

        // Price range
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        const priceSlider = document.getElementById('priceSlider');

        if (minPriceInput) minPriceInput.addEventListener('input', () => this.applyFilters());
        if (maxPriceInput) maxPriceInput.addEventListener('input', () => this.applyFilters());
        if (priceSlider) priceSlider.addEventListener('input', () => this.applyFilters());

        // Brand filters
        const brandFilters = ['brandApple', 'brandSamsung', 'brandGoogle'];
        brandFilters.forEach(brandId => {
            const checkbox = document.getElementById(brandId);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.applyFilters());
            }
        });

        // Rating filters
        const ratingFilters = document.querySelectorAll('input[name="rating"]');
        ratingFilters.forEach(radio => {
            radio.addEventListener('change', () => this.applyFilters());
        });
    }

    applyFilters() {
        const cards = document.querySelectorAll(".product-card");
        let visibleCount = 0;

        // Get filter values
        const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
        const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;

        const catPhone = document.getElementById('catPhone')?.checked ?? true;
        const catLaptop = document.getElementById('catLaptop')?.checked ?? true;
        const catWatch = document.getElementById('catWatch')?.checked ?? true;

        const selectedRating = document.querySelector('input[name="rating"]:checked')?.value;

        cards.forEach(card => {
            const price = parseFloat(card.dataset.price);
            const category = card.dataset.category;
            const rating = parseFloat(card.dataset.rating);

            // Check category filter
            let showByCategory = false;
            if (category === 'phone' && catPhone) showByCategory = true;
            if (category === 'computer' && catLaptop) showByCategory = true;
            if (category === 'watch' && catWatch) showByCategory = true;

            // Check rating filter
            let showByRating = true;
            if (selectedRating) {
                showByRating = rating >= parseFloat(selectedRating);
            }

            // Show/hide based on all filters
            if (price >= minPrice && price <= maxPrice && showByCategory && showByRating) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const productCount = document.getElementById('productCount');
        if (productCount) {
            productCount.textContent = visibleCount;
        }
    }

    setupWishlist() {
        // Wishlist functionality is handled by toggleWishlist method
    }

    toggleWishlist(productId, button) {
        const index = this.wishlist.indexOf(productId);

        if (index > -1) {
            this.wishlist.splice(index, 1);
            button.classList.remove('active');
            button.querySelector('i').className = 'far fa-heart';
            this.showAlert('Removed from wishlist', 'info');
        } else {
            this.wishlist.push(productId);
            button.classList.add('active');
            button.querySelector('i').className = 'fas fa-heart';
            this.showAlert('Added to wishlist', 'success');
        }

        localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
        this.updateWishlistCount();
    }

    updateWishlistCount() {
        // Could add a wishlist count indicator if needed
    }

    setupCompare() {
        // Compare functionality
    }

    compareProduct(productId) {
        if (this.compareList.length >= 3) {
            this.showAlert('You can compare up to 3 products', 'error');
            return;
        }

        if (!this.compareList.includes(productId)) {
            this.compareList.push(productId);
            localStorage.setItem("compareList", JSON.stringify(this.compareList));
            this.showAlert('Product added to comparison', 'success');
        } else {
            this.showAlert('Product already in comparison list', 'info');
        }
    }

    setupSorting() {
        const sortSelect = document.querySelector('select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
            });
        }
    }

    sortProducts(sortBy) {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return;

        const cards = Array.from(productGrid.children);

        cards.sort((a, b) => {
            const aPrice = parseFloat(a.dataset.price);
            const bPrice = parseFloat(b.dataset.price);
            const aRating = parseFloat(a.dataset.rating);
            const bRating = parseFloat(b.dataset.rating);

            switch (sortBy) {
                case 'Price: Low to High':
                    return aPrice - bPrice;
                case 'Price: High to Low':
                    return bPrice - aPrice;
                case 'Best Rated':
                    return bRating - aRating;
                default:
                    return 0;
            }
        });

        cards.forEach(card => productGrid.appendChild(card));
    }

    setupViewToggle() {
        // View toggle functionality is handled by setView function in HTML
    }

    setupLoadMore() {
        // Load more functionality
    }

    quickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Create and show quick view modal
        this.showQuickViewModal(product);
    }

    showQuickViewModal(product) {
        // Remove existing modal
        const existingModal = document.querySelector('.quick-view-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${product.name}</h3>
                    <button class="close-btn" onclick="this.closest('.quick-view-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        </div>
                        <div class="col-md-6">
                            <p>${product.description}</p>
                            <div class="product-rating">
                                <div class="stars">${this.generateStars(product.rating)}</div>
                                <span class="rating-count">(${product.reviews} reviews)</span>
                            </div>
                            <div class="product-price">
                                <span class="current-price">$${product.price}</span>
                                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                            </div>
                            <div class="modal-actions">
                                <button class="add-to-cart-btn" onclick="productManager.addToCart('${product.id}')">
                                    <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                </button>
                                <button class="wishlist-btn ${this.wishlist.includes(product.id) ? 'active' : ''}" 
                                        onclick="productManager.toggleWishlist('${product.id}', this)">
                                    <i class="${this.wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        if (!document.querySelector('#quick-view-styles')) {
            const styles = document.createElement('style');
            styles.id = 'quick-view-styles';
            styles.textContent = `
                .quick-view-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .modal-content {
                    background: white;
                    border-radius: 15px;
                    max-width: 800px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                .modal-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .modal-body {
                    padding: 1.5rem;
                }
                .close-btn {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                }
                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            ${type === 'success'
                ? 'background: linear-gradient(135deg, #28a745, #20c997); color: white;'
                : type === 'error'
                    ? 'background: linear-gradient(135deg, #dc3545, #f86c6b); color: white;'
                    : 'background: linear-gradient(135deg, #17a2b8, #6c757d); color: white;'
            }
        `;

        document.body.appendChild(alert);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }

    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);

        // Handle category parameter
        const category = urlParams.get('category');
        if (category) {
            // Uncheck all categories first
            document.getElementById('catPhone').checked = false;
            document.getElementById('catLaptop').checked = false;
            document.getElementById('catWatch').checked = false;

            // Check the relevant category
            if (category === 'phone') document.getElementById('catPhone').checked = true;
            if (category === 'computer') document.getElementById('catLaptop').checked = true;
            if (category === 'watch') document.getElementById('catWatch').checked = true;

            this.applyFilters();
        }
    }
}

// Global functions for HTML onclick handlers
window.productManager = null;
window.addToCart = function (productId, name, price, image) {
    if (window.productManager) {
        window.productManager.addToCart(productId);
    }
};

window.toggleWishlist = function (productId, button) {
    if (window.productManager) {
        window.productManager.toggleWishlist(productId, button);
    }
};

window.quickView = function (productId) {
    if (window.productManager) {
        window.productManager.quickView(productId);
    }
};

window.compareProduct = function (productId) {
    if (window.productManager) {
        window.productManager.compareProduct(productId);
    }
};

window.setView = function (viewType) {
    const grid = document.getElementById('productGrid');
    if (grid) {
        if (viewType === 'list') {
            grid.style.gridTemplateColumns = '1fr';
        } else {
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        }
    }
};

window.clearFilters = function () {
    document.querySelectorAll('.form-check-input').forEach(cb => cb.checked = false);
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    if (window.productManager) {
        window.productManager.applyFilters();
    }
};

window.loadMoreProducts = function () {
    console.log('Loading more products...');
    // Implement load more functionality
};

window.filterProducts = function () {
    if (window.productManager) {
        window.productManager.applyFilters();
    }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    window.productManager = new ProductManager();
});

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
