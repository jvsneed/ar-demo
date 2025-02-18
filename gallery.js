document.addEventListener('DOMContentLoaded', () => {
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || navigator.maxTouchPoints > 0;
    }

    if (!isMobileDevice()) {
        const desktopMessage = document.getElementById('desktop-message');
        const continueButton = document.getElementById('continue-anyway');
        const arButton = document.querySelector('.ar-button');
        
        if (arButton) {
            arButton.style.display = 'none';
        }

        desktopMessage.style.display = 'block';

        continueButton.addEventListener('click', () => {
            desktopMessage.style.display = 'none';
        });
    }

    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    let currentIndex = 1;

    function updateGallery(newIndex) {
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        thumbnails[newIndex].classList.add('active');
        
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
        "This is just pretend, but you have great taste! 👌",
        "Loading... just kidding, it's a demo page!",
        "Error 418: I'm a teapot... just kidding, I'm a demo page!",
        "In a parallel universe, this button totally works!"
    ];

    const getRandomResponse = () => {
        const index = Math.floor(Math.random() * sillyResponses.length);
        return sillyResponses[index];
    };

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
                
                const toast = document.createElement('div');
                toast.className = 'fun-toast';
                toast.textContent = getRandomResponse();
                document.body.appendChild(toast);

                setTimeout(() => {
                    toast.remove();
                }, 3000);
            });
        });
    });

    const mockButtons = [
        '.nav-icons button',        
        '.product-add-to-cart',     
        '.product-favorite',       
        '.footer-section a',       
        '.footer-section button'   
    ];

    mockButtons.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const existingToasts = document.querySelectorAll('.fun-toast');
                existingToasts.forEach(toast => toast.remove());
                
                const toast = document.createElement('div');
                toast.className = 'fun-toast';
                toast.textContent = getRandomResponse();
                document.body.appendChild(toast);

                toast.addEventListener('touchstart', e => e.preventDefault());
                
                setTimeout(() => {
                    toast.style.animation = 'toastIn 0.3s ease reverse';
                    setTimeout(() => toast.remove(), 300);
                }, 2700);
            });
        });
    });
});
