
// // Check if user is logged in
// const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// if (!currentUser) {
//   // Not logged in → redirect to login page
//   window.location.href = "login.html";
// } else {
//   // User is logged in - display their information if elements exist
//   const userNameElement = document.getElementById('user-name');
//   const userEmailElement = document.getElementById('user-email');

//   if (userNameElement) {
//     userNameElement.textContent = currentUser.username;
//   }
//   if (userEmailElement) {
//     userEmailElement.textContent = currentUser.email;
//   }
// }

// // Logout button handler
// const logoutBtn = document.getElementById('logout-btn');
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', () => {
//     localStorage.removeItem('currentUser');
//     window.location.href = "login.html";
//   });
// }

  // Check if user is logged in on page load
        function checkUserSession() {
            const currentUser = localStorage.getItem('currentUser');
            const accountNameSpan = document.getElementById('accountName');
            const loginBtn = document.getElementById('loginBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            const divider = document.getElementById('divider');

            if (currentUser) {
                const user = JSON.parse(currentUser);
                accountNameSpan.textContent = user.username;
                loginBtn.style.display = 'none';
                logoutBtn.style.display = 'block';
                divider.style.display = 'block';
            } else {
                accountNameSpan.textContent = 'Account';
                loginBtn.style.display = 'block';
                logoutBtn.style.display = 'none';
                divider.style.display = 'none';
            }
        }

        // Handle logout
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });

        // Check session on page load
        checkUserSession();

        // Listen for storage changes (logout in other tabs)
        window.addEventListener('storage', checkUserSession);