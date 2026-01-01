// Cart Module
const Cart = {
    items: [],

    init: () => {
        Cart.load();
        Cart.setupCartButton();
        Cart.updateCount();
    },

    add: (productId, quantity = 1) => {
        const product = Products.data.find(p => p.id === productId);
        if (!product) {
            WeShop.components.toast.show('Product not found!', 'error');
            return;
        }

        const existing = Cart.items.find(item => item.id === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            Cart.items.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity });
        }

        Cart.save();
        Cart.updateCount();
        WeShop.components.toast.show(`${product.name} added to cart!`, 'success');
    },

    remove: (productId) => {
        Cart.items = Cart.items.filter(item => item.id !== productId);
        Cart.save();
        Cart.updateCount();
        WeShop.components.toast.show('Item removed from cart!', 'info');
    },

    updateQuantity: (productId, newQuantity) => {
        const item = Cart.items.find(item => item.id === productId);
        if (item) {
            const quantity = Math.max(0, parseInt(newQuantity) || 0);
            if (quantity === 0) {
                Cart.remove(productId);
            } else {
                item.quantity = quantity;
                Cart.save();
                Cart.updateCount();
            }
        }
    },

    getTotal: () => {
        return Cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    getCount: () => {
        return Cart.items.reduce((count, item) => count + item.quantity, 0);
    },

    clear: () => {
        Cart.items = [];
        Cart.save();
        Cart.updateCount();
        WeShop.components.toast.show('Cart cleared!', 'info');
    },

    load: () => {
        Cart.items = WeShop.utils.storage.get('cart') || [];
    },

    save: () => {
        WeShop.utils.storage.set('cart', Cart.items);
    },

    updateCount: () => {
        const count = Cart.getCount();
        document.querySelectorAll('.cart-btn').forEach(btn => {
            btn.dataset.cartCount = count;
            const after = btn.querySelector('::after');
            if (after) after.textContent = count;
        });
    },

    setupCartButton: () => {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-btn') && !e.target.closest('.cart-btn').querySelector('i')) {
                e.preventDefault();
                // For demo, show cart summary
                Cart.showSummary();
            }
        });
    },

    showSummary: () => {
        if (Cart.items.length === 0) {
            WeShop.components.toast.show('Your cart is empty!', 'info');
            return;
        }

        const total = Cart.getTotal();
        const count = Cart.getCount();
        let summary = `Cart: ${count} item${count > 1 ? 's' : ''}\n`;
        Cart.items.forEach(item => {
            summary += `${item.name} x${item.quantity} - $${item.price * item.quantity}\n`;
        });
        summary += `Total: $${total}`;

        // Since toast may not handle multiline, use alert for demo
        alert(summary);
    },

    checkout: () => {
        if (Cart.items.length === 0) {
            WeShop.components.toast.show('Your cart is empty!', 'warning');
            return;
        }

        // For demo, simulate checkout
        const total = Cart.getTotal();
        if (confirm(`Proceed to checkout? Total: $${total}`)) {
            Cart.clear();
            WeShop.components.toast.show('Checkout successful! Thank you for shopping.', 'success');
        }
    }
};