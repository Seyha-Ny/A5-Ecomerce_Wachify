
// This file handles everything for login and sign up using localStorage
//Get all users from localStorage (or start with empty list)
let users = JSON.parse(localStorage.getItem('users')) || [];

// SIGN UP - Create new account
document.getElementById('sign-up-form').addEventListener('submit', (e) => {
  e.preventDefault(); // Stop page from refreshing

  // Get values from the form
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;

  // Get the password input box and its container (for red border)
  const passwordBox = document.getElementById('signup-password');
  const passwordContainer = passwordBox.parentElement;

  // Remove any old red border
  passwordContainer.classList.remove('error');

  // Check if username or email already exists
  if (users.some(user => user.username === username || user.email === email)) {
    alert("This username or email is already taken!");
    return; // Stop here
  }

  //  Password must be MORE than 8 characters
  if (password.length <= 8) {
    // Make password box red
    passwordContainer.classList.add('error');
    // Show alert message
    alert("Your password must be more than 8 characters!");
    // Put cursor back in password field
    passwordBox.focus();
    return; // Stop here
  }

  // All checks passed → create new user
  const newUser = { username, email, password };
  users.push(newUser);

  // Save updated users list to localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Success message
  alert("Sign up successful! 🎉 You can now log in.");

  // Clear the form
  e.target.reset();

  // Switch back to Sign In panel automatically
  document.querySelector(".container").classList.remove("sign-up-mode");
});
// SIGN IN - Log in to account
document.getElementById('sign-in-form').addEventListener('submit', (e) => {
  e.preventDefault(); // Stop page from refreshing

  // Get what user typed
  const input = e.target.querySelector('input[type="text"]').value.trim(); // username or email
  const password = e.target.querySelector('input[type="password"]').value;

  // Look for a user that matches both input AND password
  const foundUser = users.find(user =>
    (user.username.toLowerCase() === input.toLowerCase() || user.email === input.toLowerCase()) &&
    user.password === password
  );

  if (foundUser) {
    // Login success → save current user
    localStorage.setItem('currentUser', JSON.stringify({
      username: foundUser.username,
      email: foundUser.email
    }));

    // Go to dashboard page
    window.location.href = "dashboard.html";
  } else {
    // Wrong username/email or password
    alert("Incorrect username/email or password!");
  }
});