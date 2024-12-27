/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}
        else {
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)


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



