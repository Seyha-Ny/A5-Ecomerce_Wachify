function checkUserSession() {
    const currentUser = sessionStorage.getItem('currentUser');
    const accountNameSpan = document.getElementById('accountName');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const divider = document.getElementById('divider');

    if (currentUser) {
        const user = JSON.parse(currentUser);
        accountNameSpan.textContent = user.name;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        divider.style.display = 'block';
    } else {
        accountNameSpan.textContent = 'Account';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        divider.style.display = 'none';
    }
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedUser');
    globalThis.location.href = 'registeration/index.html';
});

// Check session on page load
checkUserSession();

// Listen for storage changes (logout in other tabs)
globalThis.addEventListener('storage', checkUserSession);

// ========== Partner Logo Scrolling Animation ==========
document.addEventListener('DOMContentLoaded', () => {
    const partnerImg = document.querySelector('.partner-img');
    
    if (!partnerImg) return; // Exit if element doesn't exist
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    let isAnimating = true;

    // Get the width of one set of images (before duplication)
    const singleSetWidth = partnerImg.scrollWidth / 2;

    function animateScroll() {
        if (isAnimating) {
            scrollPosition += scrollSpeed;
            
            // Reset position when scrolled halfway (seamless loop)
            if (scrollPosition >= singleSetWidth) {
                scrollPosition = 0;
            }
            
            partnerImg.style.transform = `translateX(-${scrollPosition}px)`;
        }
        
        requestAnimationFrame(animateScroll);
    }

    // Start animation
    animateScroll();

    // Pause animation on hover
    partnerImg.addEventListener('mouseenter', () => {
        isAnimating = false;
    });

    // Resume animation on mouse leave
    partnerImg.addEventListener('mouseleave', () => {
        isAnimating = true;
    });
});