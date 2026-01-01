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
  document.getElementById('user-name').textContent = currentUser.username;
  document.getElementById('user-email').textContent = currentUser.email;
}

// Logout functionality - clears session and redirects to login
document.getElementById('logout-btn').addEventListener('click', () => {
  // Remove current user session from localStorage
  localStorage.removeItem('currentUser');
  // Redirect to login page after logout
  window.location.href = "login.html";
});