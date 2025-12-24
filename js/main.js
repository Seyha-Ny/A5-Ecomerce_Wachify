const products = [
    { id: 1, title: "Luxury Gold Watch", category: "luxury", price: 599.99, image: "...", rating: 4.8, badge: "New" },
    { id: 2, title: "Smart Watch Pro", category: "smart", price: 349.99, image: "...", rating: 4.9, badge: "Sale" },
    { id: 3, title: "Sports Watch Elite", category: "sports", price: 299.99, image: "...", rating: 4.7 }
];

const container = document.getElementById("productsContainer");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

function renderProducts(list) {
    container.innerHTML = "";
    list.forEach(p => {
        container.innerHTML += `
        <div class="col-md-4">
            <div class="product-card">
                <div class="product-image position-relative">
                    <img src="${p.image}">
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
                </div>
                <div class="p-3">
                    <h6>${p.title}</h6>
                    <p class="text-muted">$${p.price}</p>
                    <button class="btn btn-outline-primary w-100">
                        <i class="bi bi-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>`;
    });
}

priceRange.addEventListener("input", () => {
    priceValue.textContent = `$${priceRange.value}`;
});

document.getElementById("applyFilters").addEventListener("click", () => {
    const selected = [...document.querySelectorAll("input[type=checkbox]:checked")]
        .map(cb => cb.id);

    const maxPrice = priceRange.value;

    const filtered = products.filter(p =>
        (selected.length === 0 || selected.includes(p.category)) &&
        p.price <= maxPrice
    );

    renderProducts(filtered);
});

renderProducts(products);
