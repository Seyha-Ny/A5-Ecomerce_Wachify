 // 1. Get the partner container
    let partner = document.querySelector(".partner");

    // 2. Copy all images and add them again
    // This helps the animation look endless
    partner.innerHTML = partner.innerHTML + partner.innerHTML;

    // 3. Starting position (from left)
    let positionX = 0;

    // 4. Speed of movement
    // Bigger number = faster
    let moveSpeed = 0.5;

    // 5. Function to move images
    function moveImages() {

        // Move images to the left
        positionX = positionX - moveSpeed;

        // If half of images are gone, reset position
        if (positionX <= -partner.scrollWidth / 2) {
            positionX = 0;
        }

        // Apply movement
        partner.style.transform = "translateX(" + positionX + "px)";

        // Repeat forever
        requestAnimationFrame(moveImages);
    }

    // 6. Start animation
    moveImages();