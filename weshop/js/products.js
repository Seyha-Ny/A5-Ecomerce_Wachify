// Products Module
const Products = {
    data: [
        { id: 1, name: 'iPhone 15', price: 999, category: 'phones', brand: 'apple', rating: 4.5, image: 'https://via.placeholder.com/300x200?text=iPhone+15', description: 'Latest iPhone with advanced features.', inStock: true },
        { id: 2, name: 'MacBook Pro', price: 1999, category: 'laptops', brand: 'apple', rating: 4.8, image: 'https://via.placeholder.com/300x200?text=MacBook+Pro', description: 'Powerful laptop for professionals.', inStock: true },
        { id: 3, name: 'Apple Watch', price: 399, category: 'watches', brand: 'apple', rating: 4.6, image: 'https://via.placeholder.com/300x200?text=Apple+Watch', description: 'Smartwatch with health tracking.', inStock: true },
        { id: 4, name: 'Samsung Galaxy S23', price: 899, category: 'phones', brand: 'samsung', rating: 4.4, image: 'https://via.placeholder.com/300x200?text=Samsung+Galaxy+S23', description: 'Android flagship phone.', inStock: true },
        { id: 5, name: 'Dell XPS 13', price: 1299, category: 'laptops', brand: 'dell', rating: 4.3, image: 'https://via.placeholder.com/300x200?text=Dell+XPS+13', description: 'Ultrabook with premium design.', inStock: true },
        { id: 6, name: 'Samsung Galaxy Watch 5', price: 349, category: 'watches', brand: 'samsung', rating: 4.2, image: 'https://via.placeholder.com/300x200?text=Samsung+Galaxy+Watch+5', description: 'Fitness-focused smartwatch.', inStock: true },
        // Add more products as needed
        { id: 7, name: 'Google Pixel 7', price: 699, category: 'phones', brand: 'google', rating: 4.3, image: 'https://via.placeholder.com/300x200?text=Google+Pixel+7', description: 'Pure Android experience.', inStock: true },
        { id: 8, name: 'HP Spectre x360', price: 1499, category: 'laptops', brand: 'hp', rating: 4.4, image: 'https://via.placeholder.com/300x200?text=HP+Spectre+x360', description: '2-in-1 laptop with premium build.', inStock: true },
        { id: 9, name: 'Fitbit Versa 3', price: 229, category: 'watches', brand: 'fitbit', rating: 4.1, image: 'https://via.placeholder.com/300x200?text=Fitbit+Versa+3', description: 'Advanced fitness tracker.', inStock: true }
    ],

    currentFilters: {},
    currentSort: 'name',
    currentPage: 1,
    itemsPerPage: 12,

    init: () => {
        Products.loadProducts();
        Products.setupFilters();
        Products.setupSearch();
        Products.setupSort();
        Products.setupViewToggle();
        Products.setupPagination();
        Products.setupQuickView();
        Products.setupWishlist();
        Products.setupAddToCart();
        Products.updatePriceDisplay();
    },

    loadProducts: () => {
        const container = document.getElementById('products-container');
        const featuredContainer = document.querySelector('.carousel-container');

        if (container) {
            Products.renderProducts(container, Products.getFilteredProducts());
        }

        if (featuredContainer) {
            Products.renderFeatured(featuredContainer);
        }
    },

    getFilteredProducts: () => {
        let products = [...Products.data];

        // Apply category filter based on current page
        const path = window.location.pathname;
        if (path.includes('phones.html')) {
            products = products.filter(p => p.category === 'phones');
        } else if (path.includes('laptops.html')) {
            products = products.filter(p => p.category === 'laptops');
        } else if (path.includes('watches.html')) {
            products = products.filter(p => p.category === 'watches');
        }

        // Apply sidebar filters
        if (Products.currentFilters.category && Products.currentFilters.category.length) {
            products = products.filter(p => Products.currentFilters.category.includes(p.category));
        }

        if (Products.currentFilters.brand && Products.currentFilters.brand.length) {
            products = products.filter(p => Products.currentFilters.brand.includes(p.brand));
        }

        if (Products.currentFilters.priceMin !== undefined && Products.currentFilters.priceMin > 0) {
            products = products.filter(p => p.price >= Products.currentFilters.priceMin);
        }

        if (Products.currentFilters.priceMax !== undefined && Products.currentFilters.priceMax < 3000) {
            products = products.filter(p => p.price <= Products.currentFilters.priceMax);
        }

        if (Products.currentFilters.rating) {
            products = products.filter(p => p.rating >= Products.currentFilters.rating);
        }

        if (Products.currentFilters.search) {
            const search = Products.currentFilters.search.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search)
            );
        }

        // Sort
        products.sort((a, b) => {
            switch (Products.currentSort) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'rating': return b.rating - a.rating;
                default: return a.name.localeCompare(b.name);
            }
        });

        return products;
    },

    renderProducts: (container, products) => {
        const start = (Products.currentPage - 1) * Products.itemsPerPage;
        const end = start + Products.itemsPerPage;
        const paginatedProducts = products.slice(start, end);

        container.innerHTML = paginatedProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <button class="wishlist-btn" data-product-id="${product.id}" aria-label="Add to wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="quick-view-btn" data-product-id="${product.id}" aria-label="Quick view">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="rating">
                        ${Products.renderStars(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                    <p class="price">$${product.price}</p>
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');

        Products.updatePagination(products.length);
        WeShop.utils.animate(container, 'fade-in');
    },

    renderFeatured: (container) => {
        const featured = Products.data.slice(0, 3);
        container.innerHTML = featured.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="btn btn-secondary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `).join('');
    },

    renderStars: (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
        if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) stars += '<i class="far fa-star"></i>';
        return stars;
    },

    setupFilters: () => {
        const applyBtn = document.getElementById('apply-filters');
        const clearBtn = document.getElementById('clear-filters');

        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                Products.currentFilters.category = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
                Products.currentFilters.brand = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
                Products.currentFilters.rating = parseInt(document.querySelector('input[name="rating"]:checked')?.value) || 0;
                Products.currentPage = 1;
                Products.loadProducts();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                Products.currentFilters = {};
                Products.currentPage = 1;
                Products.loadProducts();
            });
        }
    },

    setupSearch: () => {
        const searchInput = document.querySelector('.search-form input');
        const searchBtn = document.querySelector('.search-form button');

        if (searchInput) {
            searchInput.addEventListener('input', WeShop.utils.debounce(() => {
                Products.currentFilters.search = searchInput.value.trim();
                Products.currentPage = 1;
                Products.loadProducts();
            }, 300));
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const form = e.target.closest('.search-form');
                const input = form.querySelector('input');
                Products.currentFilters.search = input.value.trim();
                Products.currentPage = 1;
                Products.loadProducts();
            });
        }
    },

    setupSort: () => {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                Products.currentSort = sortSelect.value;
                Products.loadProducts();
            });
        }
    },

    setupViewToggle: () => {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const container = document.getElementById('products-container');
                if (btn.id === 'list-view') {
                    container.classList.add('list-view');
                } else {
                    container.classList.remove('list-view');
                }
            });
        });
    },

    setupPagination: () => {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn') && !e.target.disabled) {
                if (e.target.classList.contains('prev') && Products.currentPage > 1) {
                    Products.currentPage--;
                } else if (e.target.classList.contains('next')) {
                    Products.currentPage++;
                }
                Products.loadProducts();
                // Scroll to top of products
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
    },

    updatePagination: (totalItems) => {
        const totalPages = Math.ceil(totalItems / Products.itemsPerPage);
        const pageInfo = document.querySelector('.page-info');
        const prevBtn = document.querySelector('.page-btn.prev');
        const nextBtn = document.querySelector('.page-btn.next');

        if (pageInfo) pageInfo.textContent = `Page ${Products.currentPage} of ${totalPages}`;
        if (prevBtn) prevBtn.disabled = Products.currentPage <= 1;
        if (nextBtn) nextBtn.disabled = Products.currentPage >= totalPages;
    },

    setupQuickView: () => {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quick-view-btn')) {
                e.preventDefault();
                const productId = parseInt(e.target.closest('.quick-view-btn').dataset.productId);
                const product = Products.data.find(p => p.id === productId);
                if (product) {
                    document.getElementById('modal-image').src = product.image;
                    document.getElementById('modal-image').alt = product.name;
                    document.getElementById('modal-title').textContent = product.name;
                    document.getElementById('modal-description').textContent = product.description;
                    document.getElementById('modal-price').textContent = `$${product.price}`;
                    document.getElementById('modal-add-to-cart').dataset.productId = product.id;
                    WeShop.components.modal.show('quick-view-modal');
                }
            }
        });
    },

    setupWishlist: () => {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-btn')) {
                e.preventDefault();
                const btn = e.target.closest('.wishlist-btn');
                const icon = btn.querySelector('i');
                const productId = parseInt(btn.dataset.productId);
                // Toggle
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    WeShop.components.toast.show('Added to wishlist!', 'success');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    WeShop.components.toast.show('Removed from wishlist!', 'info');
                }
                // In real app, update user data
            }
        });
    },

    setupAddToCart: () => {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                e.preventDefault();
                const productId = parseInt(e.target.dataset.productId);
                Cart.add(productId);
            }
        });
    },

    updatePriceDisplay: () => {
        const minInput = document.getElementById('price-min');
        const maxInput = document.getElementById('price-max');
        const minDisplay = document.getElementById('min-price');
        const maxDisplay = document.getElementById('max-price');

        if (minInput && maxInput) {
            [minInput, maxInput].forEach(input => {
                input.addEventListener('input', () => {
                    Products.currentFilters.priceMin = parseInt(minInput.value) || 0;
                    Products.currentFilters.priceMax = parseInt(maxInput.value) || 3000;
                    if (minDisplay) minDisplay.textContent = `$${Products.currentFilters.priceMin}`;
                    if (maxDisplay) maxDisplay.textContent = `$${Products.currentFilters.priceMax}`;
                });
            });
        }
    },

    updateCartCount: () => {
        // Placeholder; integrate with Cart
        const cartBtns = document.querySelectorAll('.cart-btn');
        cartBtns.forEach(btn => {
            const count = parseInt(btn.dataset.cartCount) || 0;
            btn.dataset.cartCount = count + 1;
        });
    }
};