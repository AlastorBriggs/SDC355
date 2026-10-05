/**
 * Automated Slideshow
 * Author: Tevin Donegan
 * Date:   09/30/2026
 * Purpose: To cycle through an array of slide images and their matching
 *          captions on a timer, updating the page automatically and
 *          starting over once the end of the array is reached.
 */

// Array of image file paths for the images in the starter file folder.
// Indexes 0 through 13 correspond to the 14 images provided.
var images = [
    "slide0.jpg",
    "slide1.jpg",
    "slide2.jpg",
    "slide3.jpg",
    "slide4.jpg",
    "slide5.jpg",
    "slide6.jpg",
    "slide7.jpg",
    "slide8.jpg",
    "slide9.jpg",
    "slide10.jpg",
    "slide11.jpg",
    "slide12.jpg",
    "slide13.jpg"
];

// Parallel array of captions matching each image by index.
var captions = [
    "International Space Station fourth expansion [2009]",
    "Assembling the International Space Station [1998]",
    "The Atlantis docks with the slide [2001]",
    "The Atlantis approaches the slide [2000]",
    "The Soyuz departs from the slide [2001]",
    "International Space Station over Earth [2002]",
    "The International Space Station first expansion [2002]",
    "Hurricane Ivan from the slide [2008]",
    "The Soyuz spacecraft approaches the slide [2005]",
    "The International Space Station from above [2006]",
    "Maneuvering in space with the Canadarm2 [2006]",
    "The International Space Station second expansion [2006]",
    "The International Space Station third expansion [2007]",
    "The slide over the Ionian Sea [2007]"
];

// Tracks which slide is currently displayed, starting at the first image.
var currentSlide = 0;

/**
 * Shows the next image in the slideshow. 
 * When the last slide is reached, it wraps around back to slide 0.
 */
function nextSlide() {
    // Move to the next slide index, wrapping to 0 after the last slide.
    currentSlide = (currentSlide === images.length - 1) ? 0 : currentSlide + 1;

    // Update the image source.
    document.getElementById("slideshow-img").src = images[currentSlide];

    // Update the caption text.
    document.getElementById("caption").textContent = captions[currentSlide];
}

// Start the slideshow automatically once the page has loaded.
window.addEventListener("load", function () {
    // Show the first image and caption immediately.
    document.getElementById("slideshow-img").src = images[0];
    document.getElementById("caption").textContent = captions[0];

    // Advance to the next slide every 3 seconds (3000 ms).
    setInterval(nextSlide, 3000);
});