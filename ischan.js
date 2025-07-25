
   
        // Global variables for slider functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;
        let autoPlayInterval;
        let isAutoPlayActive = true;

        /**
         * Initialize the slider when the page loads
         */
        function initializeSlider() {
            showSlide(currentSlideIndex);
            startAutoPlay();
        }

        /**
         * Display the slide at the specified index
         * @param {number} index - The index of the slide to display
         */
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Show the current slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        /**
         * Change slide by a specified direction
         * @param {number} direction - 1 for next, -1 for previous
         */
        function changeSlide(direction) {
            currentSlideIndex += direction;

            // Loop back to first slide if at the end
            if (currentSlideIndex >= totalSlides) {
                currentSlideIndex = 0;
            }
            // Loop to last slide if at the beginning
            else if (currentSlideIndex < 0) {
                currentSlideIndex = totalSlides - 1;
            }

            showSlide(currentSlideIndex);
        }

        /**
         * Jump to a specific slide
         * @param {number} slideNumber - The slide number (1-based)
         */
        function currentSlide(slideNumber) {
            currentSlideIndex = slideNumber - 1;
            showSlide(currentSlideIndex);
        }

        /**
         * Start the automatic slideshow
         */
        function startAutoPlay() {
            if (isAutoPlayActive) {
                autoPlayInterval = setInterval(() => {
                    changeSlide(1);
                }, 3000); // Change slide every 3 seconds
            }
        }

        /**
         * Stop the automatic slideshow
         */
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        /**
         * Toggle the automatic slideshow on/off
         */
        function toggleAutoPlay() {
            const toggleSwitch = document.querySelector('.toggle-switch');
            isAutoPlayActive = !isAutoPlayActive;

            if (isAutoPlayActive) {
                toggleSwitch.classList.add('active');
                startAutoPlay();
            } else {
                toggleSwitch.classList.remove('active');
                stopAutoPlay();
            }
        }

        // Keyboard navigation support
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (event.key === 'ArrowRight') {
                changeSlide(1);
            } else if (event.key === ' ') {
                event.preventDefault();
                toggleAutoPlay();
            }
        });

        // Touch/swipe support for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        });

        /**
         * Handle swipe gestures
         */
        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    changeSlide(-1); // Swipe right - previous slide
                } else {
                    changeSlide(1); // Swipe left - next slide
                }
            }
        }

        // Pause auto-play when user hovers over the slider
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => {
            if (isAutoPlayActive) {
                stopAutoPlay();
            }
        });

        sliderContainer.addEventListener('mouseleave', () => {
            if (isAutoPlayActive) {
                startAutoPlay();
            }
        });

        // Initialize the slider when the page loads
        document.addEventListener('DOMContentLoaded', initializeSlider);
