// Auth Module
const Auth = {
    init: () => {
        Auth.setupFormValidations();
        Auth.setupPasswordStrength();
        Auth.checkRememberedUser();
        Auth.setupSocialLogins();
    },

    setupFormValidations: () => {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (loginForm) {
            loginForm.addEventListener('submit', Auth.handleLogin);
        }

        if (registerForm) {
            registerForm.addEventListener('submit', Auth.handleRegister);
        }

        // Real-time validation
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('blur', Auth.validateField);
        });
    },

    handleLogin: (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const remember = document.querySelector('input[name="remember"]').checked;

        Auth.clearErrors();

        if (!Auth.validateEmail(email)) {
            Auth.showError('login-email', 'Please enter a valid email address.');
            return;
        }

        if (!password) {
            Auth.showError('login-password', 'Password is required.');
            return;
        }

        // Simulate login check
        const users = WeShop.utils.storage.get('users');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            if (remember) {
                WeShop.utils.storage.set('rememberedUser', { email: user.email });
            }
            WeShop.utils.session.set('currentUser', user);
            WeShop.components.toast.show('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            Auth.showError('login-password', 'Invalid email or password.');
        }
    },

    handleRegister: (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        Auth.clearErrors();

        if (!name) {
            Auth.showError('register-name', 'Full name is required.');
            return;
        }

        if (!Auth.validateEmail(email)) {
            Auth.showError('register-email', 'Please enter a valid email address.');
            return;
        }

        if (!Auth.validatePassword(password)) {
            Auth.showError('register-password', 'Password must be at least 8 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            Auth.showError('register-confirm-password', 'Passwords do not match.');
            return;
        }

        const users = WeShop.utils.storage.get('users');
        if (users.find(u => u.email === email)) {
            Auth.showError('register-email', 'An account with this email already exists.');
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            cart: [],
            wishlist: []
        };

        users.push(newUser);
        WeShop.utils.storage.set('users', users);

        WeShop.components.toast.show('Registration successful! Please log in.', 'success');

        // Switch to login form
        document.getElementById('login-tab').click();
    },

    setupPasswordStrength: () => {
        const passwordInput = document.getElementById('register-password');
        if (!passwordInput) return;

        passwordInput.addEventListener('input', WeShop.utils.debounce(() => {
            const strength = Auth.calculatePasswordStrength(passwordInput.value);
            const meter = document.querySelector('.password-strength::before');
            const text = document.getElementById('password-strength');

            if (meter) {
                meter.style.width = strength + '%';
            }
            if (text) {
                text.textContent = Auth.getStrengthText(strength);
                text.setAttribute('aria-live', 'polite');
            }
        }, 300));
    },

    calculatePasswordStrength: (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password) || /[^a-zA-Z0-9]/.test(password)) strength += 25;
        return strength;
    },

    getStrengthText: (strength) => {
        if (strength === 0) return '';
        if (strength <= 25) return 'Weak';
        if (strength <= 50) return 'Fair';
        if (strength <= 75) return 'Good';
        return 'Strong';
    },

    validateField: (e) => {
        const field = e.target;
        const value = field.value.trim();
        const errorId = field.id + '-error';
        const errorEl = document.getElementById(errorId);

        if (errorEl) {
            errorEl.style.display = 'none';
        }

        // Specific validations
        if (field.id === 'register-email' && value && !Auth.validateEmail(value)) {
            Auth.showError('register-email', 'Please enter a valid email address.');
        }
    },

    validateEmail: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    validatePassword: (password) => {
        return password.length >= 8;
    },

    showError: (fieldId, message) => {
        const errorEl = document.getElementById(fieldId + '-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
            errorEl.setAttribute('role', 'alert');
        }
        document.getElementById(fieldId).focus();
    },

    clearErrors: () => {
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
    },

    checkRememberedUser: () => {
        const remembered = WeShop.utils.storage.get('rememberedUser');
        if (remembered && remembered.email) {
            document.getElementById('login-email').value = remembered.email;
            document.querySelector('input[name="remember"]').checked = true;
        }
    },

    setupSocialLogins: () => {
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                WeShop.components.toast.show('Social login not implemented in demo.', 'info');
            });
        });
    }
};