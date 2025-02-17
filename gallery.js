document.addEventListener('DOMContentLoaded', () => {
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || navigator.maxTouchPoints > 0;
    }

    if (!isMobileDevice()) {
        const desktopMessage = document.getElementById('desktop-message');
        const continueButton = document.getElementById('continue-anyway');
        const arButton = document.querySelector('.ar-button');
        
        // Hide AR button on desktop
        if (arButton) {
            arButton.style.display = 'none';
        }

        // Show desktop message
        desktopMessage.style.display = 'block';

        // Handle continue anyway button
        continueButton.addEventListener('click', () => {
            desktopMessage.style.display = 'none';
        });
    }

    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    let currentIndex = 1; // Start with middle image

    function updateGallery(newIndex) {
        // Remove active class from all thumbnails
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to current thumbnail
        thumbnails[newIndex].classList.add('active');
        
        // Update main image
        mainImage.src = thumbnails[newIndex].src;
        mainImage.alt = thumbnails[newIndex].alt;
        
        currentIndex = newIndex;
    }

    // Add click handlers to thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const index = parseInt(thumbnail.dataset.index);
            updateGallery(index);
        });
    });

    // Add click handlers to navigation buttons
    prevButton.addEventListener('click', () => {
        const newIndex = currentIndex === 0 ? thumbnails.length - 1 : currentIndex - 1;
        updateGallery(newIndex);
    });

    nextButton.addEventListener('click', () => {
        const newIndex = currentIndex === thumbnails.length - 1 ? 0 : currentIndex + 1;
        updateGallery(newIndex);
    });

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevButton.click();
        if (e.key === 'ArrowRight') nextButton.click();
    });

    // Fun responses for various interactions
    const sillyResponses = [
        "This is just a demo, but I appreciate your enthusiasm! ",
        "Sorry, this chair only exists in our dreams... for now!",
        "But this is just a mockup. Pretty though, right? ✨",
        "If I could actually add this to cart, I'd buy 10!",
        "Psst... this is just pretend, but you have great taste! 👌",
        "Loading... just kidding, it's a demo page!",
        "Error 418: I'm a teapot... just kidding, I'm a demo page!",
        "In a parallel universe, this button totally works!"
    ];

    // Get random response
    const getRandomResponse = () => {
        const index = Math.floor(Math.random() * sillyResponses.length);
        return sillyResponses[index];
    };

    // Add fun responses to various elements
    const funElements = [
        '.product-add-to-cart',
        '.product-favorite',
        '.nav-icons button',
        '.logo',
        '.product-price'
    ];

    funElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create and show toast message
                const toast = document.createElement('div');
                toast.className = 'fun-toast';
                toast.textContent = getRandomResponse();
                document.body.appendChild(toast);

                // Remove toast after animation
                setTimeout(() => {
                    toast.remove();
                }, 3000);
            });
        });
    });

    // Specifically target only the non-functional interactive elements
    const mockButtons = [
        '.nav-icons button',        // Navigation menu icons
        '.product-add-to-cart',     // Add to cart button
        '.product-favorite',        // Heart/favorite button
        '.footer-section a',        // All footer links
        '.footer-section button'    // Any footer buttons
    ];

    mockButtons.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Remove any existing toasts first
                const existingToasts = document.querySelectorAll('.fun-toast');
                existingToasts.forEach(toast => toast.remove());
                
                const toast = document.createElement('div');
                toast.className = 'fun-toast';
                toast.textContent = getRandomResponse();
                document.body.appendChild(toast);

                // Handle touch events
                toast.addEventListener('touchstart', e => e.preventDefault());
                
                // Remove toast after animation
                setTimeout(() => {
                    toast.style.animation = 'toastIn 0.3s ease reverse';
                    setTimeout(() => toast.remove(), 300);
                }, 2700);
            });
        });
    });
});
