/**
 * =============================================================================
 * Contact Page JavaScript - WatchStore
 * Clean, Organized, and Functional Code
 * =============================================================================
 */

// =============================================================================
// CONTACT FORM HANDLING
// =============================================================================

/**
 * Handle contact form submission
 */
function handleContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        subject: form.querySelector('#subject').value.trim(),
        message: form.querySelector('#message').value.trim()
    };

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    if (!isValidEmail(formData.email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    // Simulate form submission (in real app, this would be an API call)
    setTimeout(() => {
        // Success feedback
        showToast('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');

        // Reset form
        form.reset();

        // Restore button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Log the message (in real app, this would be sent to a server)
        console.log('Contact form submission:', formData);

    }, 2000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

// =============================================================================
// FAQ ACCORDION FUNCTIONALITY
// =============================================================================

/**
 * Initialize FAQ accordion
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const chevron = question.querySelector('.fa-chevron-down');

        if (question && answer && chevron) {
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherChevron = otherItem.querySelector('.fa-chevron-down');
                        if (otherAnswer && otherChevron) {
                            otherAnswer.style.display = 'none';
                            otherChevron.style.transform = 'rotate(0deg)';
                        }
                    }
                });

                // Toggle current item
                if (isOpen) {
                    answer.style.display = 'none';
                    chevron.style.transform = 'rotate(0deg)';
                } else {
                    answer.style.display = 'block';
                    chevron.style.transform = 'rotate(180deg)';
                }
            });
        }
    });
}

// =============================================================================
// NEWSLETTER FORM HANDLING
// =============================================================================

/**
 * Handle newsletter subscription
 */
function handleNewsletterSubmit(event) {
    event.preventDefault();

    const email = event.target.querySelector('input[type="email"]').value;

    if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Show success message
    showToast('Newsletter subscription successful!', 'success');

    // Reset form
    event.target.reset();
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize contact page
 */
function initializeContactPage() {
    console.log('📧 Contact Page Initializing...');

    // Setup contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Initialize FAQ accordion
    initializeFAQ();

    // Setup newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    console.log('✅ Contact Page Ready!');
}

// =============================================================================
// START APPLICATION
// =============================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializeContactPage);
