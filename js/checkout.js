
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutContainer = document.getElementById('checkout');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalPriceElement.textContent = '$0.00';
            checkoutBtn.disabled = true;
            return;
        }

        let totalPrice = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                </div>
                <p class="item-subtotal">$${(item.quantity * item.price).toFixed(2)}</p>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.quantity * item.price;
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        checkoutBtn.disabled = false;

        // Add event listeners for new buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', handleQuantityChange);
        });
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', handleRemoveItem);
        });
    }

    function handleQuantityChange(event) {
        const index = event.target.dataset.index;
        const action = event.target.dataset.action;

        if (action === 'increase') {
            cart[index].quantity++;
        } else if (action === 'decrease') {
            cart[index].quantity--;
            if (cart[index].quantity === 0) {
                cart.splice(index, 1); // Remove item if quantity is 0
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
    }

    function handleRemoveItem(event) {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
    }

    function handleCheckout() {
        // Clear the cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));

        // Display a confirmation message
        checkoutContainer.innerHTML = `
            <h1>Thank you for your order!</h1>
            <p>Your order has been placed successfully.</p>
            <a href="dashboard.html">Continue Shopping</a>
        `;

        // Update the cart count in the header
        updateCartCount();
    }

    checkoutBtn.addEventListener('click', handleCheckout);

    renderCartItems();
});

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    cartCount.textContent = total;
}

