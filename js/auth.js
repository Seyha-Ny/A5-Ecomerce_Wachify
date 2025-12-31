/**
 * =============================================================================
 * Authentication System - WatchStore
 * Clean, Organized, and Functional Code
 * =============================================================================
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const AUTH_CONFIG = {
    STORAGE_KEYS: {
        USER: 'watchstore_user',
        REMEMBER: 'watchstore_remember'
    },
    MIN_PASSWORD_LENGTH: 8,
    TOKEN_EXPIRY: 24 * 60 * 60 * 1000 // 24 hours
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    const icon = type === 'success' ? 'fa-check-circle' :
        type === 'error' ? 'fa-exclamation-circle' :
            type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';

    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${icon} me-2"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'var(--success-color)' :
            type === 'error' ? 'var(--danger-color)' :
                type === 'warning' ? 'var(--warning-color)' : 'var(--info-color)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        maxWidth: '350px',
        fontSize: '14px'
    });

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Check password strength
 */
function checkPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    return strength;
}

/**
 * Update password strength indicator
 */
function updatePasswordStrength(password) {
    const strengthBar = document.getElementById('passwordStrength');
    if (!strengthBar) return;

    const strength = checkPasswordStrength(password);

    // Remove all strength classes
    strengthBar.classList.remove('strength-weak', 'strength-medium', 'strength-strong');

    if (password.length === 0) {
        strengthBar.style.display = 'none';
    } else {
        strengthBar.style.display = 'block';

        if (strength <= 2) {
            strengthBar.classList.add('strength-weak');
        } else if (strength <= 4) {
            strengthBar.classList.add('strength-medium');
        } else {
            strengthBar.classList.add('strength-strong');
        }
    }
}

/**
 * Store user data
 */
function storeUser(userData, remember = false) {
    const user = {
        ...userData,
        loginTime: new Date().toISOString(),
        token: generateToken()
    };

    localStorage.setItem(AUTH_CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));

    if (remember) {
        localStorage.setItem(AUTH_CONFIG.STORAGE_KEYS.REMEMBER, JSON.stringify({
            email: userData.email,
            name: userData.name
        }));
    }
}

/**
 * Generate simple token
 */
function generateToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Get stored user data
 */
function getStoredUser() {
    try {
        const userData = localStorage.getItem(AUTH_CONFIG.STORAGE_KEYS.USER);
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    const user = getStoredUser();
    if (!user) return false;

    // Check if token is still valid (simple implementation)
    const loginTime = new Date(user.loginTime);
    const now = new Date();
    const diff = now - loginTime;

    return diff < AUTH_CONFIG.TOKEN_EXPIRY;
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem(AUTH_CONFIG.STORAGE_KEYS.USER);
    showToast('Logged out successfully', 'success');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

/**
 * Redirect if already logged in
 */
function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        window.location.href = 'index.html';
    }
}

// =============================================================================
// LOGIN FUNCTIONALITY
// =============================================================================

/**
 * Handle login form submission
 */
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Validation
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Simulate authentication (in real app, this would be an API call)
    const users = getUsersFromStorage();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Successful login
        storeUser({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'customer'
        }, remember);

        showToast('Login successful! Redirecting...', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } else {
        // Failed login
        showToast('Invalid email or password', 'error');
    }
}

// =============================================================================
// REGISTRATION FUNCTIONALITY
// =============================================================================

/**
 * Handle registration form submission
 */
function handleRegister(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    if (password.length < AUTH_CONFIG.MIN_PASSWORD_LENGTH) {
        showToast(`Password must be at least ${AUTH_CONFIG.MIN_PASSWORD_LENGTH} characters long`, 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    if (!termsAccepted) {
        showToast('Please accept the terms and conditions', 'error');
        return;
    }

    // Check if user already exists
    const users = getUsersFromStorage();
    if (users.some(u => u.email === email)) {
        showToast('An account with this email already exists', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: fullName,
        email: email,
        password: password, // In real app, this should be hashed
        role: 'customer',
        createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);
    localStorage.setItem('watchstore_users', JSON.stringify(users));

    // Auto-login after registration
    storeUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    });

    showToast('Registration successful! Redirecting...', 'success');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

/**
 * Get users from localStorage
 */
function getUsersFromStorage() {
    try {
        const users = localStorage.getItem('watchstore_users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Error parsing users:', error);
        return [];
    }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize login page
 */
function initializeLoginPage() {
    console.log('🔐 Login Page Initializing...');

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Load remembered user if any
    const rememberedUser = localStorage.getItem(AUTH_CONFIG.STORAGE_KEYS.REMEMBER);
    if (rememberedUser) {
        try {
            const user = JSON.parse(rememberedUser);
            document.getElementById('email').value = user.email;
            document.getElementById('remember').checked = true;
        } catch (error) {
            console.error('Error loading remembered user:', error);
        }
    }

    console.log('✅ Login Page Ready!');
}

/**
 * Initialize registration page
 */
function initializeRegisterPage() {
    console.log('👤 Registration Page Initializing...');

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            updatePasswordStrength(e.target.value);
        });
    }

    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', (e) => {
            const password = passwordInput.value;
            if (e.target.value && e.target.value !== password) {
                e.target.setCustomValidity('Passwords do not match');
            } else {
                e.target.setCustomValidity('');
            }
        });
    }

    console.log('✅ Registration Page Ready!');
}

// =============================================================================
// START APPLICATION
// =============================================================================

// Determine which page we're on and initialize accordingly
document.addEventListener('DOMContentLoaded', () => {
    const isLoginPage = window.location.pathname.includes('login.html');
    const isRegisterPage = window.location.pathname.includes('register.html');

    if (isLoginPage) {
        redirectIfLoggedIn();
        initializeLoginPage();
    } else if (isRegisterPage) {
        redirectIfLoggedIn();
        initializeRegisterPage();
    }
});

// Export functions for global access
window.WatchStoreAuth = {
    isLoggedIn,
    logout,
    showToast
};
