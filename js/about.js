
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart badge
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = total;
}

// Add to cart on navbar
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

       
    });
});



// Load cart count on page load
updateCartCount();
// 1. Get the partner container
let partner = document.querySelector(".partner");

// 2. Copy all images and add them again
// This helps the animation look endless
partner.innerHTML = partner.innerHTML + partner.innerHTML;

// 3. Starting position (from left)
let positionX = 0;

// 4. Speed of movement
// Bigger number = faster
let moveSpeed = 0.5;

// 5. Function to move images
function moveImages() {

    // Move images to the left
    positionX = positionX - moveSpeed;

    // If half of images are gone, reset position
    if (positionX <= -partner.scrollWidth / 2) {
        positionX = 0;
    }

    // Apply movement
    partner.style.transform = "translateX(" + positionX + "px)";

    // Repeat forever
    requestAnimationFrame(moveImages);
}

// 6. Start animation
moveImages();

//move button buy now to product page
document.getElementById("buyBtn").addEventListener("click", function () {
    window.location.href = "product.html";
});