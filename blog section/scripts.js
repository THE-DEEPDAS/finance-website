let slideIndex = 0;
showSlides(slideIndex);

function currentSlide(index) {
    showSlides(slideIndex = index);
}

function showSlides(index) {
    const slides = document.getElementsByClassName("blog-post");
    const dots = document.getElementsByClassName("dot");
    if (index >= slides.length) { slideIndex = 0 }
    if (index < 0) { slideIndex = slides.length - 1 }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}
