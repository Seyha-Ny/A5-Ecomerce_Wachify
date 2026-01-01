/**
 * Enhanced Product Management System
 * Handles all product-related functionality including:
 * - Product display and rendering
 * - Shopping cart management
 * - Wishlist functionality
 * - Product comparison
 * - Search and filtering
 * - Sorting and view options
 * - Quick view modals
 */

class ProductManager {
    /**
     * Initialize the ProductManager with product data and user preferences
     * Sets up localStorage data structures and initializes the system
     */
    constructor() {
        // Initialize product catalog with sample data
        this.products = this.initializeProducts();
        // Load user's shopping cart from localStorage or create empty cart
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Load user's wishlist from localStorage or create empty wishlist
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        // Load product comparison list from localStorage or create empty list
        this.compareList = JSON.parse(localStorage.getItem('compareList')) || [];
        // Initialize all system components
        this.init();
    }

    /**
     * Initialize product catalog with sample product data
     * Returns an array of product objects with various properties
     * @returns {Array} Array of product objects
     */
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

    /**
     * Initialize all system components and set up event listeners
     * This method is called in the constructor to set up the entire system
     */
    init() {
        this.setupCart();           // Initialize shopping cart functionality
        this.setupSearch();         // Set up search functionality
        this.setupFilters();        // Set up product filters
        this.setupWishlist();       // Initialize wishlist system
        this.setupCompare();        // Set up product comparison
        this.setupSorting();        // Set up product sorting options
        this.setupViewToggle();     // Set up grid/list view toggle
        this.setupLoadMore();       // Set up load more functionality
        this.updateCartCount();     // Update cart item count display
        this.updateWishlistCount(); // Update wishlist count display
        this.renderProducts();      // Render all products to the page
        this.handleURLParameters(); // Handle URL parameters for filtering
    }

    /**
     * Render all products to the product grid
     * Clears existing grid and repopulates with current products
     */
    renderProducts() {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return; // Exit if grid element doesn't exist

        // Clear existing products from grid
        productGrid.innerHTML = '';

        // Create and append product card for each product
        this.products.forEach((product, index) => {
            const productCard = this.createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }

    /**
     * Create a product card element for display in the grid
     * @param {Object} product - Product object with all product properties
     * @returns {HTMLElement} Product card DOM element
     */
    createProductCard(product) {
        // Create card container element
        const card = document.createElement('div');
        card.className = 'product-card';
        // Set data attributes for filtering and sorting
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

    /**
     * Generate star rating display HTML
     * @param {number} rating - Product rating (1-5)
     * @returns {string} HTML string with star icons
     */
    generateStars(rating) {
        let stars = '';
        // Calculate number of full stars
        const fullStars = Math.floor(rating);
        // Check if there's a half star
        const hasHalfStar = rating % 1 !== 0;

        // Add full star icons
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        // Add half star if needed
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        // Calculate and add empty stars
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    /**
     * Set up shopping cart functionality
     * Cart operations are handled by individual methods like addToCart
     */
    setupCart() {
        // Cart functionality is now handled by the addToCart method
    }

    /**
     * Add a product to the shopping cart
     * Handles both new items and quantity updates for existing items
     * @param {string} productId - ID of the product to add to cart
     */
    addToCart(productId) {
        // Find the product in the catalog
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            this.showAlert('Product not found', 'error');
            return;
        }

        // Get the button that triggered this action for visual feedback
        const button = event.target;
        const originalHTML = button.innerHTML;

        // Show loading state on button
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Adding...';
        button.disabled = true;

        // Simulate async operation for better user experience
        setTimeout(() => {
            // Check if product already exists in cart
            const exist = this.cart.find(item => item.id === product.id);

            if (exist) {
                // Increment quantity if product already in cart
                exist.qty++;
            } else {
                // Add new product to cart with quantity 1
                this.cart.push({ ...product, qty: 1 });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));
            // Update cart count display
            this.updateCartCount();

            // Show success feedback on button
            button.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
            button.classList.add('btn-success');

            // Reset button after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('btn-success');
                button.disabled = false;
            }, 2000);

            // Show success notification
            this.showAlert(`${product.name} added to cart!`, 'success');
        }, 500);
    }

    /**
     * Update the shopping cart item count display
     * Calculates total items and updates the cart count badge
     */
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (!cartCount) return; // Exit if cart count element doesn't exist

        // Calculate total number of items (sum of all quantities)
        const total = this.cart.reduce((sum, item) => sum + item.qty, 0);
        cartCount.textContent = total;
    }

    /**
     * Set up search functionality for products
     * Handles search form submission and URL search parameters
     */
    setupSearch() {
        const searchForm = document.querySelector('form.d-flex');
        if (!searchForm) return; // Exit if search form doesn't exist

        const searchInput = searchForm.querySelector('input[type="search"]');

        // Handle search form submission
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from refreshing page
            const searchValue = searchInput.value.toLowerCase().trim();

            if (searchValue) {
                // Redirect to product page with search parameter
                window.location.href = `product.html?search=${encodeURIComponent(searchValue)}`;
            }
        });

        // Handle search parameter from URL for page load
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam && searchInput) {
            // Set search input value and filter products
            searchInput.value = searchParam;
            this.filterProducts(searchParam);
        }
    }

    /**
     * Filter products based on search term
     * Shows/hides product cards based on title and description matching
     * @param {string} searchTerm - Search term to filter by (optional)
     */
    filterProducts(searchTerm = '') {
        const cards = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        cards.forEach(card => {
            // Get product title and description from card
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-subtitle').textContent.toLowerCase();

            // Check if product matches search term
            const matchesSearch = !searchTerm ||
                title.includes(searchTerm.toLowerCase()) ||
                description.includes(searchTerm.toLowerCase());

            // Show or hide card based on search match
            if (matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update product count display
        const productCount = document.getElementById('productCount');
        if (productCount) {
            productCount.textContent = visibleCount;
        }
    }

    /**
     * Set up product filtering functionality
     * Initializes event listeners for category, price, brand, and rating filters
     */
    setupFilters() {
        // Define category filter mappings
        const categoryFilters = {
            'catPhone': 'phone',
            'catLaptop': 'computer',
            'catWatch': 'watch'
        };

        // Set up category filter event listeners
        Object.entries(categoryFilters).forEach(([checkboxId, category]) => {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.applyFilters());
            }
        });

        // Set up price range filters
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        const priceSlider = document.getElementById('priceSlider');

        if (minPriceInput) minPriceInput.addEventListener('input', () => this.applyFilters());
        if (maxPriceInput) maxPriceInput.addEventListener('input', () => this.applyFilters());
        if (priceSlider) priceSlider.addEventListener('input', () => this.applyFilters());

        // Set up brand filter event listeners
        const brandFilters = ['brandApple', 'brandSamsung', 'brandGoogle'];
        brandFilters.forEach(brandId => {
            const checkbox = document.getElementById(brandId);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.applyFilters());
            }
        });

        // Set up rating filter event listeners
        const ratingFilters = document.querySelectorAll('input[name="rating"]');
        ratingFilters.forEach(radio => {
            radio.addEventListener('change', () => this.applyFilters());
        });
    }

    /**
     * Apply all active filters to product display
     * Filters products by price, category, and rating criteria
     */
    applyFilters() {
        const cards = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        // Get filter values from DOM elements
        const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
        const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;

        const catPhone = document.getElementById('catPhone')?.checked ?? true;
        const catLaptop = document.getElementById('catLaptop')?.checked ?? true;
        const catWatch = document.getElementById('catWatch')?.checked ?? true;

        const selectedRating = document.querySelector('input[name="rating"]:checked')?.value;

        cards.forEach(card => {
            // Get product data from card dataset
            const price = parseFloat(card.dataset.price);
            const category = card.dataset.category;
            const rating = parseFloat(card.dataset.rating);

            // Check if product matches category filter
            let showByCategory = false;
            if (category === 'phone' && catPhone) showByCategory = true;
            if (category === 'computer' && catLaptop) showByCategory = true;
            if (category === 'watch' && catWatch) showByCategory = true;

            // Check if product matches rating filter
            let showByRating = true;
            if (selectedRating) {
                showByRating = rating >= parseFloat(selectedRating);
            }

            // Show/hide product based on all filter criteria
            if (price >= minPrice && price <= maxPrice && showByCategory && showByRating) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update product count display
        const productCount = document.getElementById('productCount');
        if (productCount) {
            productCount.textContent = visibleCount;
        }
    }

    /**
     * Set up wishlist functionality
     * Wishlist operations are handled by the toggleWishlist method
     */
    setupWishlist() {
        // Wishlist functionality is handled by toggleWishlist method
    }

    /**
     * Toggle product in wishlist (add/remove)
     * Updates UI and persists changes to localStorage
     * @param {string} productId - ID of the product to toggle
     * @param {HTMLElement} button - Button element that triggered the action
     */
    toggleWishlist(productId, button) {
        // Find product index in wishlist array
        const index = this.wishlist.indexOf(productId);

        if (index > -1) {
            // Product exists in wishlist - remove it
            this.wishlist.splice(index, 1);
            // Update button UI to show inactive state
            button.classList.remove('active');
            button.querySelector('i').className = 'far fa-heart';
            // Show removal notification
            this.showAlert('Removed from wishlist', 'info');
        } else {
            // Product not in wishlist - add it
            this.wishlist.push(productId);
            // Update button UI to show active state
            button.classList.add('active');
            button.querySelector('i').className = 'fas fa-heart';
            // Show addition notification
            this.showAlert('Added to wishlist', 'success');
        }

        // Save updated wishlist to localStorage
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        // Update wishlist count display
        this.updateWishlistCount();
    }

    /**
     * Update the wishlist item count display
     * Currently not implemented but could be used for wishlist badge
     */
    updateWishlistCount() {
        // Could add a wishlist count indicator if needed
    }

    /**
     * Set up product comparison functionality
     * Comparison operations are handled by the compareProduct method
     */
    setupCompare() {
        // Compare functionality is handled by compareProduct method
    }

    /**
     * Add a product to the comparison list
     * Limits comparison to maximum 3 products for better UX
     * @param {string} productId - ID of the product to compare
     */
    compareProduct(productId) {
        // Check if comparison list is already full (max 3 products)
        if (this.compareList.length >= 3) {
            this.showAlert('You can compare up to 3 products', 'error');
            return;
        }

        // Check if product is already in comparison list
        if (!this.compareList.includes(productId)) {
            // Add product to comparison list
            this.compareList.push(productId);
            // Save updated list to localStorage
            localStorage.setItem('compareList', JSON.stringify(this.compareList));
            // Show success notification
            this.showAlert('Product added to comparison', 'success');
        } else {
            // Product already in list - show info message
            this.showAlert('Product already in comparison list', 'info');
        }
    }

    /**
     * Set up product sorting functionality
     * Initializes event listener for sort dropdown
     */
    setupSorting() {
        const sortSelect = document.querySelector('select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
            });
        }
    }

    /**
     * Sort products based on selected criteria
     * Supports sorting by price (low to high, high to low) and rating
     * @param {string} sortBy - Sorting criteria (e.g., 'Price: Low to High')
     */
    sortProducts(sortBy) {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return; // Exit if grid doesn't exist

        // Convert HTMLCollection to array for sorting
        const cards = Array.from(productGrid.children);

        // Sort cards based on criteria
        cards.sort((a, b) => {
            // Get data attributes for comparison
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
                    return 0; // No sorting
            }
        });

        // Re-append sorted cards to grid
        cards.forEach(card => productGrid.appendChild(card));
    }

    /**
     * Set up view toggle functionality
     * View toggle is handled by setView function in HTML
     */
    setupViewToggle() {
        // View toggle functionality is handled by setView function in HTML
    }

    /**
     * Set up load more functionality
     * Placeholder for implementing pagination or infinite scroll
     */
    setupLoadMore() {
        // Load more functionality - to be implemented
    }

    /**
     * Display quick view modal for a product
     * Shows product details in a popup modal without page navigation
     * @param {string} productId - ID of the product to view
     */
    quickView(productId) {
        // Find product in catalog
        const product = this.products.find(p => p.id === productId);
        if (!product) return; // Exit if product not found

        // Create and show quick view modal
        this.showQuickViewModal(product);
    }

    /**
     * Create and display quick view modal for a product
     * Generates modal HTML with product details and action buttons
     * @param {Object} product - Product object to display in modal
     */
    showQuickViewModal(product) {
        // Remove any existing modal to prevent duplicates
        const existingModal = document.querySelector('.quick-view-modal');
        if (existingModal) existingModal.remove();

        // Create modal element with product details
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

        // Add modal to page
        document.body.appendChild(modal);

        // Add modal styles if not already present
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

    /**
     * Display alert notification to user
     * Shows styled alert message with auto-dismiss functionality
     * @param {string} message - Alert message to display
     * @param {string} type - Alert type: 'success', 'error', or 'info'
     */
    showAlert(message, type = 'info') {
        // Remove any existing alerts to prevent duplicates
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert element
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

        // Add alert to page
        document.body.appendChild(alert);

        // Auto-remove alert after 3 seconds
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }

    /**
     * Handle URL parameters for page initialization
     * Processes category and search parameters from URL
     * Applies appropriate filters based on URL parameters
     */
    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);

        // Handle category parameter for filtering
        const category = urlParams.get('category');
        if (category) {
            // Uncheck all category checkboxes first
            document.getElementById('catPhone').checked = false;
            document.getElementById('catLaptop').checked = false;
            document.getElementById('catWatch').checked = false;

            // Check the relevant category based on URL parameter
            if (category === 'phone') document.getElementById('catPhone').checked = true;
            if (category === 'computer') document.getElementById('catLaptop').checked = true;
            if (category === 'watch') document.getElementById('catWatch').checked = true;

            // Apply filters to show only selected category
            this.applyFilters();
        }
    }
}

/**
 * Global functions for HTML onclick handlers
 * These functions bridge HTML onclick events to the ProductManager instance
 * Ensures proper context and error handling
 */

// Global reference to ProductManager instance
window.productManager = null;

/**
 * Global function to add product to cart
 * Called from HTML onclick handlers
 * @param {string} productId - ID of product to add to cart
 * @param {string} name - Product name (unused, kept for compatibility)
 * @param {number} price - Product price (unused, kept for compatibility)
 * @param {string} image - Product image (unused, kept for compatibility)
 */
window.addToCart = function (productId, name, price, image) {
    if (window.productManager) {
        window.productManager.addToCart(productId);
    }
};

/**
 * Global function to toggle product in wishlist
 * Called from HTML onclick handlers
 * @param {string} productId - ID of product to toggle
 * @param {HTMLElement} button - Button element that triggered the action
 */
window.toggleWishlist = function (productId, button) {
    if (window.productManager) {
        window.productManager.toggleWishlist(productId, button);
    }
};

/**
 * Global function to show quick view modal
 * Called from HTML onclick handlers
 * @param {string} productId - ID of product to view
 */
window.quickView = function (productId) {
    if (window.productManager) {
        window.productManager.quickView(productId);
    }
};

/**
 * Global function to add product to comparison list
 * Called from HTML onclick handlers
 * @param {string} productId - ID of product to compare
 */
window.compareProduct = function (productId) {
    if (window.productManager) {
        window.productManager.compareProduct(productId);
    }
};

/**
 * Global function to toggle between grid and list view
 * Called from HTML onclick handlers
 * @param {string} viewType - View type: 'grid' or 'list'
 */
window.setView = function (viewType) {
    const grid = document.getElementById('productGrid');
    if (grid) {
        if (viewType === 'list') {
            // Set single column layout for list view
            grid.style.gridTemplateColumns = '1fr';
        } else {
            // Set multi-column layout for grid view
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        }
    }
};

/**
 * Global function to clear all active filters
 * Resets all filter checkboxes and inputs to default state
 */
window.clearFilters = function () {
    // Uncheck all filter checkboxes
    document.querySelectorAll('.form-check-input').forEach(cb => cb.checked = false);
    // Clear price range inputs
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    // Re-apply filters to show all products
    if (window.productManager) {
        window.productManager.applyFilters();
    }
};

/**
 * Global function to load more products
 * Placeholder for implementing pagination or infinite scroll
 */
window.loadMoreProducts = function () {
    console.log('Loading more products...');
    // Implement load more functionality here
};

/**
 * Global function to apply product filters
 * Called from filter change events
 */
window.filterProducts = function () {
    if (window.productManager) {
        window.productManager.applyFilters();
    }
};

/**
 * Initialize the ProductManager when DOM is ready
 * Sets up the global instance and starts the system
 */
document.addEventListener('DOMContentLoaded', () => {
    window.productManager = new ProductManager();
});

/**
 * Add CSS animations for alert notifications
 * Provides smooth slide-in and slide-out effects
 */
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
