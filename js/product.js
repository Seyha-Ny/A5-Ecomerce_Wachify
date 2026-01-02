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

        // SAFELY get price: either data-price or .price text
        let priceText = btn.dataset.price || card.querySelector(".price").innerText || "0";
        // Remove $ and any spaces, then convert to Number
        let priceNumber = Number(priceText.replace("$", "").trim());

        if (isNaN(priceNumber)) priceNumber = 0; // fallback

        const product = {
            id: btn.dataset.id || card.querySelector(".title").innerText,
            name: btn.dataset.name || card.querySelector(".title").innerText,
            price: priceNumber,
            image: btn.dataset.image || card.querySelector("img").src,
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

// ===== PRODUCT FILTER =====
const filters = document.querySelectorAll(".product-choose1");
const cards = document.querySelectorAll(".menu-product .card");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        const category = filter.dataset.filter;
        cards.forEach(card => {
            card.style.display = category === "all" || card.dataset.category === category ? "block" : "none";
        });
        filters.forEach(f => f.classList.remove("active"));
        filter.classList.add("active");
    });
});

// ===== LOAD MORE =====
document.querySelector(".load").addEventListener("click", () => {
    cards.forEach(card => card.style.display = "block");
});

// ===== ORDER FORM =====
document.querySelector(".buy-product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const productName = document.getElementById("productName").value;
    const model = document.getElementById("model").value;

    const msg = document.createElement("div");
    msg.textContent = `Thank you ${firstName}! Your order for ${productName} (${model}) has been received.`;
    msg.className = "alert alert-success mt-3";

    const existing = document.querySelector(".buy-product-form + .alert");
    if (existing) existing.remove();

    document.querySelector(".buy-product-form").after(msg);
    e.target.reset();
});

// ===== SEARCH PRODUCT =====
document.querySelector("form.d-flex").addEventListener("submit", (e) => {
    e.preventDefault();
    const searchValue = e.target.querySelector("input[type='search']").value.toLowerCase().trim();
    cards.forEach(card => {
        const name = card.querySelector(".title").innerText.toLowerCase();
        card.style.display = name.includes(searchValue) ? "block" : "none";
    });
});

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});
