// FILTER PRODUCTS

const filters = document.querySelectorAll(".product-choose1");
const cards = document.querySelectorAll(".menu-product .card");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        const category = filter.dataset.filter;

        cards.forEach(card => {
            card.style.display =
                category === "all" || card.dataset.category === category
                    ? "block"
                    : "none";
        });

        filters.forEach(f => f.classList.remove("active"));
        filter.classList.add("active");
    });
});

// CART SYSTEM - ProductManager Class
class ProductManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        this.products = [];
        this.initializeProducts();
        this.updateCartCount();
    }

    initializeProducts() {
        this.products = [
            {
                id: "pixel01",
                name: "Google Pixel 8 Pro",
                price: 599,
                originalPrice: null,
                image: "/img/menu9.png",
                category: "phone",
                brand: "Google",
                rating: 4.8,
                reviews: 234,
                badge: null,
                description: "Advanced computational photography"
            },
            {
                id: "blackwatch01",
                name: "Premium Black Watch",
                price: 899,
                originalPrice: null,
                image: "/img/menu10.png",
                category: "watch",
                brand: "Premium",
                rating: 4.7,
                reviews: 456,
                badge: null,
                description: "Luxury timepiece with elegant design"
            },
            {
                id: "greenwatch01",
                name: "Green Watch",
                price: 999,
                originalPrice: null,
                image: "/img/menu11.png",
                category: "watch",
                brand: "Smart",
                rating: 4.6,
                reviews: 389,
                badge: null,
                description: "Stylish green smartwatch"
            },
            {
                id: "strixg16",
                name: "ROG Strix G16",
                price: 1199,
                originalPrice: null,
                image: "/img/menu12.png",
                category: "computer",
                brand: "ASUS",
                rating: 4.9,
                reviews: 512,
                badge: null,
                description: "Ultimate gaming performance laptop"
            },
            {
                id: "legion01",
                name: "Lenovo Legion",
                price: 999,
                originalPrice: null,
                image: "/img/menu13.png",
                category: "computer",
                brand: "Lenovo",
                rating: 4.7,
                reviews: 423,
                badge: null,
                description: "Professional gaming machine"
            },
            {
                id: "iphone17",
                name: "iPhone 17 Pro Max",
                price: 699,
                originalPrice: null,
                image: "/img/menu1.png",
                category: "phone",
                brand: "Apple",
                rating: 4.8,
                reviews: 678,
                badge: null,
                description: "Latest iPhone with advanced features"
            },
            {
                id: "dellg15",
                name: "Dell G15 Gaming",
                price: 999,
                originalPrice: null,
                image: "/img/menu14.png",
                category: "computer",
                brand: "Dell",
                rating: 4.6,
                reviews: 345,
                badge: null,
                description: "Powerful gaming laptop"
            },
            {
                id: "rolex01",
                name: "Rolex",
                price: 799,
                originalPrice: null,
                image: "/img/menu2.png",
                category: "watch",
                brand: "Rolex",
                rating: 4.9,
                reviews: 234,
                badge: null,
                description: "Swiss luxury watch"
            },
            {
                id: "samsung01",
                name: "Samsung Galaxy S24",
                price: 699,
                originalPrice: null,
                image: "/img/menu3.png",
                category: "phone",
                brand: "Samsung",
                rating: 4.7,
                reviews: 567,
                badge: null,
                description: "Flagship Android phone"
            },
            {
                id: "oppoa3",
                name: "Oppo A3",
                price: 499,
                originalPrice: null,
                image: "/img/menu4.png",
                category: "phone",
                brand: "Oppo",
                rating: 4.5,
                reviews: 289,
                badge: null,
                description: "Budget-friendly smartphone"
            },
            {
                id: "iphone15",
                name: "iPhone 15 Pro Max",
                price: 399,
                originalPrice: null,
                image: "/img/menu5.png",
                category: "phone",
                brand: "Apple",
                rating: 4.6,
                reviews: 456,
                badge: null,
                description: "Powerful iPhone with Pro features"
            },
            {
                id: "hppavilion",
                name: "HP Pavilion 15",
                price: 699,
                originalPrice: null,
                image: "/img/menu15.png",
                category: "computer",
                brand: "HP",
                rating: 4.4,
                reviews: 267,
                badge: null,
                description: "Modern everyday laptop"
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
                rating: 4.5,
                reviews: 234,
                badge: null,
                description: "Professional smartwatch"
            }
        ];
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            console.error(`Product ${productId} not found`);
            return;
        }

        const exist = this.cart.find(item => item.id === productId);
        if (exist) {
            exist.qty++;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.updateCartCount();

        // Find the button and show feedback
        const buttons = document.querySelectorAll(`.add-to-cart-btn`);
        buttons.forEach(btn => {
            if (btn.onclick?.toString().includes(productId)) {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check me-2"></i>Added to Cart';
                btn.style.backgroundColor = '#28a745';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.backgroundColor = '';
                }, 1500);
            }
        });
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.updateCartCount();
    }

    updateCartItemQty(productId, qty) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.qty = Number.parseInt(qty, 10) || 1;
            if (item.qty <= 0) {
                this.removeFromCart(productId);
            } else {
                localStorage.setItem("cart", JSON.stringify(this.cart));
                this.updateCartCount();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.qty), 0);
    }

    getCartCount() {
        return this.cart.reduce((sum, item) => sum + item.qty, 0);
    }

    updateCartCount() {
        const cartCount = document.getElementById("cartCount");
        if (cartCount) {
            cartCount.textContent = this.getCartCount();
        }
    }

    addToWishlist(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const exist = this.wishlist.find(item => item.id === productId);
        if (!exist) {
            this.wishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
        }
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    }

    getProduct(productId) {
        return this.products.find(p => p.id === productId);
    }

    getProductsByCategory(category) {
        return this.products.filter(p => p.category === category);
    }
}

// Initialize ProductManager globally
globalThis.productManager = new ProductManager();

// Update cart count on page load
document.addEventListener("DOMContentLoaded", function () {
    if (globalThis.productManager) {
        globalThis.productManager.updateCartCount();
    }

    // Get the Load More button
    const loadButton = document.querySelector(".load");
    if (loadButton) {
        const products = document.querySelectorAll(".menu-product .card");
        loadButton.addEventListener("click", function () {
            products.forEach(function (product) {
                product.style.display = "block";
            });
            loadButton.style.display = "block";
        });
    }

    // Buy form submission
    const buyForm = document.querySelector(".buy-product-form");
    if (buyForm) {
        buyForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const firstName = document.getElementById("firstName").value;
            const productName = document.getElementById("productName").value;
            const model = document.getElementById("model").value;

            // Show success message
            const messageBox = document.createElement("div");
            messageBox.textContent = `Thank you ${firstName}! Your order for ${productName} (${model}) has been received.`;
            messageBox.style.background = "#d4edda";
            messageBox.style.color = "#155724";
            messageBox.style.padding = "15px";
            messageBox.style.borderRadius = "8px";
            messageBox.style.marginTop = "20px";
            messageBox.style.textAlign = "center";
            messageBox.style.fontWeight = "500";

            const formContainer = buyForm.parentElement;
            formContainer.appendChild(messageBox);

            // Reset form
            buyForm.reset();

            // Remove message after 3 seconds
            setTimeout(() => {
                messageBox.remove();
            }, 3000);
        });
    }
});
