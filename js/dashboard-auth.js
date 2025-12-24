// js/dashboard-auth.js
// Protects dashboard and shows user info

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  // Not logged in → go to login
  window.location.href = "login.html";
} else {
  // Display user information
  document.getElementById('user-name').textContent = currentUser.username;
  document.getElementById('user-email').textContent = currentUser.email;
}

// Logout button
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = "login.html";
});