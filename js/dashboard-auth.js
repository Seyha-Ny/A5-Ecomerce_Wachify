/**
 * Dashboard Authentication Script
 * Handles user session verification and logout functionality for the dashboard page
 * Ensures only authenticated users can access the dashboard
 */

// Retrieve current user session from localStorage
// Returns null if no user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Authentication check - verify user is logged in
if (!currentUser) {
  // Redirect to login page if no active session found
  window.location.href = "login.html";
} else {
  // User is authenticated - display user information on dashboard
  const accountNameSpan = document.getElementById('accountName');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const divider = document.getElementById('divider');

  if (accountNameSpan) accountNameSpan.textContent = currentUser.username;
  if (loginBtn) loginBtn.style.display = 'none';
  if (logoutBtn) logoutBtn.style.display = 'block';
  if (divider) divider.style.display = 'block';
}

// Logout functionality - clears session and redirects to login
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // Remove current user session from localStorage
    localStorage.removeItem('currentUser');
    // Redirect to login page after logout
    window.location.href = "login.html";
  });
}

// Also handle the logout button in the dropdown
const logoutDropdownBtn = document.getElementById('logoutBtn');
if (logoutDropdownBtn) {
  logoutDropdownBtn.addEventListener('click', () => {
    // Remove current user session from localStorage
    localStorage.removeItem('currentUser');
    // Redirect to login page after logout
    window.location.href = "login.html";
  });
}