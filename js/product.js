// ===== CART SYSTEM =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart badge
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = total;
}

// Add product to cart
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Add event listener to cart buttons
document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        if (!card) return;

        // Get price safely
        let priceText = btn.dataset.price || (card.querySelector(".price")?.innerText) || "0";
        priceText = priceText.replace("$", "").replace(",", "").trim(); // remove $ and commas
        let priceNumber = parseFloat(priceText);
        if (isNaN(priceNumber)) priceNumber = 0;

        // Get product info
        const product = {
            id: btn.dataset.id || card.querySelector(".title")?.innerText || `product-${Date.now()}`,
            name: btn.dataset.name || card.querySelector(".title")?.innerText || "Unnamed Product",
            price: priceNumber,
            image: btn.dataset.image || card.querySelector("img")?.src || "",
            qty: 1
        };

        addToCart(product);

        // Feedback animation
        btn.innerHTML = "✔ Added";
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to cart`;
            btn.disabled = false;
        }, 1000);
    });
});

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});
