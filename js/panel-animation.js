/**
 * Panel Animation Script
 * Handles the switching animation between Sign In and Sign Up panels
 * Provides smooth transitions and visual feedback for user authentication forms
 */

// Get DOM elements for panel switching functionality
const signUpBtn = document.getElementById('sign-up-btn');
const signInBtn = document.getElementById('sign-in-btn');
const container = document.querySelector('.container');

/**
 * Switch to Sign Up panel
 * Adds CSS class to trigger sliding animation to show registration form
 */
signUpBtn.addEventListener('click', () => {
  container.classList.add('sign-up-mode');
});

/**
 * Switch to Sign In panel
 * Removes CSS class to trigger sliding animation to show login form
 */
signInBtn.addEventListener('click', () => {
  container.classList.remove('sign-up-mode');
});