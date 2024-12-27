/*=============== SHOW SLIDER ===============*/
const initSlider = () => {
    // Function to create slider functionality
    const createSlider = (containerId) => {
        const imageList = document.querySelector(`#image-list-${containerId}`);
        const slideButtons = document.querySelectorAll(`#prev-slide-${containerId}, #next-slide-${containerId}`);
        const sliderScrollbar = document.querySelector(`#slider-scrollbar-${containerId}`);
        const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar-thumb');
        
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

        // Thumb drag functionality
        scrollbarThumb.addEventListener('mousedown', (e) => {
            const startX = e.clientX;
            const thumbPosition = scrollbarThumb.offsetLeft;

            const handleMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                const newThumbPosition = thumbPosition + deltaX;
                const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
                
                const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
                const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
                
                scrollbarThumb.style.left = `${boundedPosition}px`;
                imageList.scrollLeft = scrollPosition;
            }

            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        });

        // Slide button functionality
        slideButtons.forEach(button => {
            button.addEventListener('click', () => {
                const direction = button.id.includes('prev') ? -1 : 1;
                const scrollAmount = imageList.clientWidth * direction;
                imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        });

        // Update button visibility and thumb position
        const handleSlideButtons = () => {
            slideButtons[0].style.display = imageList.scrollLeft <= 0 ? 'none' : 'block';
            slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? 'none' : 'block';
        }

        const updateScrollThumbPosition = () => {
            const scrollPosition = imageList.scrollLeft;
            const thumbPosition = (scrollPosition / maxScrollLeft) * 
            (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
            scrollbarThumb.style.left = `${thumbPosition}px`;
        }

        imageList.addEventListener('scroll', () => {
            handleSlideButtons();
            updateScrollThumbPosition();
        });

        // Initial setup
        handleSlideButtons();
        updateScrollThumbPosition();
    }

    // Initialize both sliders
    createSlider('outer');
    createSlider('inner');
}

window.addEventListener('load', initSlider);

