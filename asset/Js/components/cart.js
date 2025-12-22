// Cart Management
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartBadge();
    }

    addItem(product, quantity = 1) {
        const existing = this.cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity
            });
        }
        this.saveCart();
        this.showNotification('Product added to cart!');
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getCart() {
        return this.cart;
    }

    isEmpty() {
        return this.cart.length === 0;
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    updateCartBadge() {
        const cartCount = this.cart.reduce((count, item) => count + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(badge => {
            badge.textContent = cartCount;
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification notification--success show';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ${message}
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    init() {
        this.updateCartBadge();
    }
}

// Initialize Cart
const cartManager = new CartManager();

// Cart Page Specific
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        renderCartItems();
    }
});

function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    const cart = cartManager.getCart();

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item__image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item__details">
                <div class="cart-item__name">${item.name}</div>
                <div class="cart-item__price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item__actions">
                <div class="quantity-control">
                    <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

function removeFromCart(productId) {
    cartManager.removeItem(productId);
    renderCartItems();
}

function updateCartSummary() {
    const cart = cartManager.getCart();
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;

    // Update summary in checkout if present
    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('summary-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}

// Apply promo code
document.addEventListener('DOMContentLoaded', () => {
    const applyPromoBtn = document.getElementById('apply-promo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', () => {
            const promoCode = document.getElementById('promo-input').value;
            if (promoCode === 'SAVE10') {
                cartManager.showNotification('Promo code applied! 10% off');
            } else if (promoCode) {
                cartManager.showNotification('Invalid promo code');
            }
        });
    }
});

export { CartManager, cartManager };
