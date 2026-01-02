// Shared cart functionality
function addToCart(productId, name, price, image) {
    try {
        // Validate inputs
        if (!productId || !name || typeof price !== 'number' || price < 0 || !image) {
            console.error('Invalid product data for addToCart');
            showCartFeedback('Error: Invalid product data', 'danger');
            return;
        }

        // Get existing cart from localStorage
        let cart = [];
        try {
            const cartData = localStorage.getItem('cart');
            cart = cartData ? JSON.parse(cartData) : [];
        } catch (e) {
            console.error('Error parsing cart data:', e);
            cart = [];
        }

        // Check if product already exists in cart
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            // Increase quantity if already in cart
            existingProduct.quantity += 1;
        } else {
            // Add new product to cart
            cart.push({
                id: productId,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        // Save cart back to localStorage
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (e) {
            console.error('Error saving cart to localStorage:', e);
            showCartFeedback('Error: Unable to save cart', 'danger');
            return;
        }

        // Update cart count badge
        updateCartCount();

        // Provide visual feedback
        showCartFeedback('Item added to cart successfully!', 'success');
    } catch (error) {
        console.error('Unexpected error in addToCart:', error);
        showCartFeedback('Error: Failed to add item to cart', 'danger');
    }
}

function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    } catch (e) {
        console.error('Error updating cart count:', e);
    }
}

function showCartFeedback(message, type = 'success') {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.cart-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Create new feedback
    const feedback = document.createElement('div');
    feedback.className = `alert alert-${type} position-fixed cart-feedback`;
    feedback.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 300px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
    feedback.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>${message}`;
    document.body.appendChild(feedback);

    // Animate in
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateX(100%)';
    setTimeout(() => {
        feedback.style.transition = 'all 0.3s ease';
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateX(100%)';
        setTimeout(() => feedback.remove(), 300);
    }, 3000);
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);