// js/auth-local.js
// Handles sign up, sign in, and stores users in localStorage

let users = JSON.parse(localStorage.getItem('users')) || [];


// Sign Up
document.getElementById('sign-up-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;

  // Check if user exists
  if (users.some(u => u.username === username || u.email === email)) {
    alert("Username or email already taken!");
    return;
  }

  // Add new user
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert("Sign up successful! You can now log in.");

  // Clear form and switch to sign in
  e.target.reset();
  document.querySelector(".container").classList.remove("sign-up-mode");
});

// Sign In
document.getElementById('sign-in-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const input = e.target.querySelector('input[type="text"]').value.trim();
  const password = e.target.querySelector('input[type="password"]').value;

  const user = users.find(u => 
    (u.username.toLowerCase() === input.toLowerCase() || u.email === input.toLowerCase()) && 
    u.password === password
  );

  if (user) {
    // Save current logged-in user
    localStorage.setItem('currentUser', JSON.stringify({
      username: user.username,
      email: user.email
    }));
    window.location.href = "dashboard.html";
  } else {
    alert("Incorrect username/email or password!");
  }
});