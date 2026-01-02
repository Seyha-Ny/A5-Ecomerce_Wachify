function quickView(productId) {
    console.log('Quick view for phone:', productId);
    // Implement quick view modal
}

function compareProduct(productId) {
    console.log('Compare phone:', productId);
    // Implement product comparison
}

function toggleWishlist(btn) {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');

    if (btn.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
    }

    else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

function addToCart(productId, name, price, image) {
    console.log('Adding to cart:', {
        productId, name, price, image
    });
    // Implement add to cart functionality
}
function checkUserSession() {
    const currentUser = sessionStorage.getItem('currentUser');
    const accountNameSpan = document.getElementById('accountName');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const divider = document.getElementById('divider');

    if (currentUser) {
        const user = JSON.parse(currentUser);
        accountNameSpan.textContent = user.name;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        divider.style.display = 'block';
    }

    else {
        accountNameSpan.textContent = 'Account';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        divider.style.display = 'none';
    }
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedUser');
    globalThis.location.href = '../login.html';
});

// Check session on page load
checkUserSession();

// Listen for storage changes (logout in other tabs)
globalThis.addEventListener('storage', checkUserSession);