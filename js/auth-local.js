/**
 * Local Authentication Script
 * Handles user registration (sign up) and login (sign in) functionality using localStorage
 * Provides client-side authentication without backend server
 */

// Initialize users array from localStorage or create empty array if none exists
// This stores all registered user accounts
let users = JSON.parse(localStorage.getItem('users')) || [];

/**
 * Handle user registration (Sign Up)
 * Validates input, creates new user account, and saves to localStorage
 */
document.getElementById('sign-up-form').addEventListener('submit', (e) => {
  // Prevent form from submitting and refreshing the page
  e.preventDefault();

  // Extract and sanitize form input values
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;

  // Get password input elements for error handling
  const passwordBox = document.getElementById('signup-password');
  const passwordContainer = passwordBox.parentElement;

  // Clear any previous error styling
  passwordContainer.classList.remove('error');

  // Validate: Check if username or email already exists in the system
  if (users.some(user => user.username === username || user.email === email)) {
    alert('This username or email is already taken!');
    return; // Stop registration process
  }

  // Validate: Password must be at least 8 characters long
  if (password.length < 8) {
    // Add error styling to password field
    passwordContainer.classList.add('error');
    alert('Your password must be at least 8 characters long!');
    // Return focus to password field for user convenience
    passwordBox.focus();
    return; // Stop registration process
  }

  // All validations passed - create new user account
  const newUser = { username, email, password };
  users.push(newUser);

  // Save updated users list to localStorage for persistence
  localStorage.setItem('users', JSON.stringify(users));

  // Notify user of successful registration
  alert('Sign up successful! 🎉 You can now log in.');

  // Reset form fields to clear input
  e.target.reset();

  // Automatically switch to sign in panel for better user experience
  document.querySelector('.container').classList.remove('sign-up-mode');
});
/**
 * Handle user authentication (Sign In)
 * Validates credentials and creates user session if authentication succeeds
 */
document.getElementById('sign-in-form').addEventListener('submit', (e) => {
  // Prevent form from submitting and refreshing the page
  e.preventDefault();

  // Extract login credentials from form
  // Accepts either username or email as the identifier
  const input = e.target.querySelector('input[type="text"]').value.trim();
  const password = e.target.querySelector('input[type="password"]').value;

  // Search for user matching both identifier (username/email) and password
  const foundUser = users.find(user =>
    (user.username.toLowerCase() === input.toLowerCase() || user.email === input.toLowerCase()) &&
    user.password === password
  );

  if (foundUser) {
    // Authentication successful - create user session
    // Store user info (excluding password) in localStorage for session management
    localStorage.setItem('currentUser', JSON.stringify({
      username: foundUser.username,
      email: foundUser.email
    }));

    // Redirect to dashboard page after successful login
    window.location.href = 'dashboard.html';
  } else {
    // Authentication failed - invalid credentials
    alert('Incorrect username/email or password!');
  }
});

