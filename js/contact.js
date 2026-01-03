function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;

    const total = cart.reduce((sum, item) => {
        const quantity = typeof item.quantity === 'number' ? item.quantity : (typeof item.qty === 'number' ? item.qty : 0);
        return sum + quantity;
    }, 0);

    cartCount.textContent = total;
}

// Call it on initial page load
document.addEventListener('DOMContentLoaded', updateCartCount);

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
            window.location.href = 'index.html';
        });

        // Check session on page load
        document.addEventListener('DOMContentLoaded', checkUserSession);

        // Listen for storage changes (logout in other tabs)
        window.addEventListener('storage', checkUserSession);