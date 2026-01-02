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


function checkUserSession() {
    const storedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    const accountNameSpan = document.getElementById('accountName');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const divider = document.getElementById('divider');

    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            accountNameSpan.textContent = user.name || user.username || 'Account';
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            divider.style.display = 'block';
        } catch (error) {
            clearUserSession();
        }
    } else {
        accountNameSpan.textContent = 'Account';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        divider.style.display = 'none';
    }
}

function clearUserSession() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedUser');
    sessionStorage.removeItem('currentUser');
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    clearUserSession();
    globalThis.location.href = '../index.html';
});

// Check session on page load
checkUserSession();

// Listen for storage changes (logout in other tabs)
globalThis.addEventListener('storage', checkUserSession);