
const filters = document.querySelectorAll(".product-choose1");
const cards = document.querySelectorAll(".menu-product .card");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        const category = filter.getAttribute("data-filter");

        cards.forEach(card => {
            const cardCategory = card.getAttribute("data-category");

            if (category === "all" || cardCategory === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        // Active effect
        filters.forEach(f => f.classList.remove("active"));
        filter.classList.add("active");
    });
});

