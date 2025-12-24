// User Database
class UserDatabase {
    constructor() {
        this.users = this.loadUsers();
        this.nextId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    }

    loadUsers() {
        const stored = localStorage.getItem('userDatabase');
        return stored ? JSON.parse(stored) : [
            {
                id: 1,
                firstName: "Admin",
                lastName: "User",
                email: "admin@watch.com",
                username: "admin",
                password: this.hashPassword("Password123"),
                createdAt: new Date().toISOString()
            }
        ];
    }

    saveUsers() {
        localStorage.setItem('userDatabase', JSON.stringify(this.users));
    }

    hashPassword(password) {
        return btoa(password + 'watch_salt_2024');
    }

    verifyPassword(inputPassword, storedHash) {
        return this.hashPassword(inputPassword) === storedHash;
    }

    emailExists(email) {
        return this.users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    usernameExists(username) {
        return this.users.some(user => user.username.toLowerCase() === username.toLowerCase());
    }

    createUser(firstName, lastName, email, username, password) {
        const user = {
            id: this.nextId++,
            firstName,
            lastName,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: this.hashPassword(password),
            createdAt: new Date().toISOString()
        };
        this.users.push(user);
        this.saveUsers();
        return user;
    }

    authenticate(emailOrUsername, password) {
        const user = this.users.find(u =>
            u.email.toLowerCase() === emailOrUsername.toLowerCase() ||
            u.username.toLowerCase() === emailOrUsername.toLowerCase()
        );
        return user && this.verifyPassword(password, user.password) ? user : null;
    }
}

const userDB = new UserDatabase();

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');

// Toggle Forms
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    clearForms();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    clearForms();
});

// Password Toggle
function setupPasswordToggle(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    if (input && button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            button.querySelector('i').classList.toggle('fa-eye');
            button.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
}

setupPasswordToggle('loginPassword', 'toggleLoginPassword');
setupPasswordToggle('registerPassword', 'toggleRegisterPassword');
setupPasswordToggle('registerConfirmPassword', 'toggleConfirmPassword');

// Password Strength & Requirements
const passwordInput = document.getElementById('registerPassword');
if (passwordInput) {
    passwordInput.addEventListener('input', function () {
        const password = this.value;
        const strengthMeter = document.getElementById('passwordStrength');
        const requirements = document.querySelectorAll('.requirement');

        if (!password) {
            strengthMeter.className = 'password-strength';
            requirements.forEach(req => req.classList.remove('met'));
            return;
        }

        let strength = 0;
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password)
        };

        requirements.forEach(req => {
            const reqType = req.dataset.req;
            if (checks[reqType]) {
                req.classList.add('met');
                strength++;
            } else {
                req.classList.remove('met');
            }
        });

        strengthMeter.className = 'password-strength ' +
            (strength < 1 ? 'weak' :
                strength < 2 ? 'fair' :
                    strength < 3 ? 'good' : 'strong');
    });
}

// Show Message
function showMessage(formType, message, type) {
    const messageBox = document.getElementById(formType + 'Message');
    messageBox.textContent = message;
    messageBox.className = 'message-box ' + type;
    messageBox.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 4000);
    }
}

// Validate Login
function validateLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    let isValid = true;

    // Clear errors
    document.getElementById('loginEmailError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';

    if (!email) {
        document.getElementById('loginEmailError').textContent = 'Email or username required';
        isValid = false;
    }

    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password required';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    return isValid;
}

// Validate Register
function validateRegister() {
    const firstName = document.getElementById('registerFirstName').value.trim();
    const lastName = document.getElementById('registerLastName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    let isValid = true;

    // Clear errors
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

    if (!firstName) {
        document.getElementById('firstNameError').textContent = 'First name required';
        isValid = false;
    }

    if (!lastName) {
        document.getElementById('lastNameError').textContent = 'Last name required';
        isValid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('registerEmailError').textContent = 'Valid email required';
        isValid = false;
    } else if (userDB.emailExists(email)) {
        document.getElementById('registerEmailError').textContent = 'Email already registered';
        isValid = false;
    }

    if (!username || username.length < 3) {
        document.getElementById('registerUsernameError').textContent = 'Username must be at least 3 characters';
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        document.getElementById('registerUsernameError').textContent = 'Username can only contain letters, numbers, and underscores';
        isValid = false;
    } else if (userDB.usernameExists(username)) {
        document.getElementById('registerUsernameError').textContent = 'Username already taken';
        isValid = false;
    }

    if (!password || password.length < 8) {
        document.getElementById('registerPasswordError').textContent = 'Password must be at least 8 characters';
        isValid = false;
    } else if (!/[A-Z]/.test(password)) {
        document.getElementById('registerPasswordError').textContent = 'Password must contain an uppercase letter';
        isValid = false;
    } else if (!/[0-9]/.test(password)) {
        document.getElementById('registerPasswordError').textContent = 'Password must contain a number';
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    if (!agreeTerms) {
        document.getElementById('agreeTerms').style.borderColor = '#ff4757';
        showMessage('register', 'Please agree to Terms of Service', 'error');
        isValid = false;
    }

    return isValid;
}

// Login Handler
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const submitBtn = loginFormElement.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Signing In...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
        const user = userDB.authenticate(email, password);

        if (user) {
            if (rememberMe) {
                localStorage.setItem('rememberedUser', user.username);
            }

            sessionStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
                username: user.username
            }));

            showMessage('login', `✓ Welcome back, ${user.firstName}!`, 'success');

            setTimeout(() => {
                // Redirect to homepage after successful login
                window.location.href = '../index.html';
            }, 1500);
        } else {
            showMessage('login', '✗ Invalid email/username or password', 'error');
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Register Handler
registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateRegister()) return;

    const firstName = document.getElementById('registerFirstName').value.trim();
    const lastName = document.getElementById('registerLastName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;

    const submitBtn = registerFormElement.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Creating Account...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
        try {
            const user = userDB.createUser(firstName, lastName, email, username, password);
            showMessage('register', `✓ Account created! Redirecting to login...`, 'success');

            registerFormElement.reset();
            document.getElementById('passwordStrength').className = 'password-strength';
            document.querySelectorAll('.requirement').forEach(req => req.classList.remove('met'));

            setTimeout(() => {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                showMessage('login', '✓ Account created! Please sign in with your credentials', 'success');
                document.getElementById('loginEmail').value = email;
            }, 1500);
        } catch (error) {
            showMessage('register', '✗ Error creating account', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
});

// Forgot Password
document.querySelector('.forgot-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Enter your registered email address:');
    if (email) {
        const user = userDB.users.find(u => u.email === email.toLowerCase());
        if (user) {
            showMessage('login', `✓ Password reset link sent to ${email}`, 'success');
        } else {
            showMessage('login', '✗ Email not found', 'error');
        }
    }
});

// Social Login
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = btn.classList.contains('google') ? 'Google' :
            btn.classList.contains('facebook') ? 'Facebook' : 'Apple';
        showMessage(loginForm.style.display === 'none' ? 'register' : 'login',
            `${platform} login not available in this demo`, 'error');
    });
});

// Load Remembered User
window.addEventListener('load', () => {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
        document.getElementById('loginEmail').value = remembered;
        document.getElementById('rememberMe').checked = true;
    }
});

// Clear Forms
function clearForms() {
    loginFormElement.reset();
    registerFormElement.reset();
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    document.querySelectorAll('.message-box').forEach(el => el.style.display = 'none');
    document.getElementById('passwordStrength').className = 'password-strength';
    document.querySelectorAll('.requirement').forEach(req => req.classList.remove('met'));
}
