import { getFeaturedProducts } from '../../data/products.js';

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
});

async function loadFeaturedProducts() {
    try {
        const products = getFeaturedProducts();
        const productsGrid = document.getElementById('featured-products');

        if (!productsGrid) return;

        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-card__actions">
                        <button class="btn btn--icon" aria-label="Add to wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="btn btn--icon" aria-label="Quick view">
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

        // Add event listeners to the add to cart buttons
        document.querySelectorAll('.product-card__add-to-cart').forEach(button => {
            button.addEventListener('click', addToCartHandler);
        });

    } catch (error) {
        console.error('Error loading featured products:', error);
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

function addToCartHandler(event) {
    const productCard = event.target.closest('.product-card');
    const productId = parseInt(productCard.dataset.id);

    // Add your cart logic here
    console.log('Added to cart:', productId);

    // Show success message
    const notification = document.createElement('div');
    notification.className = 'notification notification--success';
    notification.textContent = 'Product added to cart!';
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}