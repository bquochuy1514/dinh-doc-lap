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

document.addEventListener('DOMContentLoaded', function() {
    const mediaUpload = document.getElementById('media-upload');
    const mediaPreview = document.querySelector('.post-form__media-preview');
    const MAX_FILES = 10; // Giới hạn số lượng file tối đa

    mediaUpload.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        // Kiểm tra số lượng file
        if (files.length > MAX_FILES) {
            alert(`You can only upload up to ${MAX_FILES} files at once`);
            return;
        }

        // Kiểm tra số lượng file hiện tại + file mới
        const currentFiles = mediaPreview.querySelectorAll('.media-preview-item').length;
        if (currentFiles + files.length > MAX_FILES) {
            alert(`Total number of files cannot exceed ${MAX_FILES}`);
            return;
        }

        files.forEach(file => {
            // Kiểm tra kích thước file (giới hạn 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Maximum size is 5MB`);
                return;
            }

            const reader = new FileReader();
            const previewContainer = document.createElement('div');
            previewContainer.className = 'media-preview-item';

            reader.onload = function(event) {
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    previewContainer.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = event.target.result;
                    video.controls = true;
                    previewContainer.appendChild(video);
                }

                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '×';
                removeBtn.className = 'remove-media-btn';
                removeBtn.onclick = function() {
                    previewContainer.remove();
                };
                previewContainer.appendChild(removeBtn);
            };

            reader.readAsDataURL(file);
            mediaPreview.appendChild(previewContainer);
        });
    });
});
