
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

// CART SYSTEM
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart badge
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = total;
}

// Add to cart
document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price),
            image: btn.dataset.image,
            qty: 1
        };

        const exist = cart.find(item => item.id === product.id);

        if (exist) {
            exist.qty++;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        // UI feedback
        btn.innerHTML = "✔ Added";
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to cart`;
            btn.disabled = false;
        }, 1000);
    });
});

// Load cart count on page load
updateCartCount();

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    //  Get the Load More button
    const loadButton = document.querySelector(".load");

    //  Get ALL product cards
    const products = document.querySelectorAll(".menu-product .card");

    //  When user clicks the button
    loadButton.addEventListener("click", function () {

        // Show every product
        products.forEach(function (product) {
            product.style.display = "block";
        });

        //  Hide the Load More button after click (optional)
        loadButton.style.display = "block";
    });

});
