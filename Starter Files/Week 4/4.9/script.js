/*
    Author: Tevin Donegan
    Date: 10/04/2026
    Purpose: Adds interactive behavior to the portfolio page, including a
    welcome modal, a skills loop, conditional featured content, a dark mode
    toggle with localStorage persistence, and form submission handling.

*/

"use strict";

// ==========================================
// WELCOME MODAL
// ==========================================

// Select the modal overlay and the Close button.
var welcomeModal = document.getElementById("welcomeModal");
var closeModalBtn = document.getElementById("closeModalBtn");

// Hide the modal when the Close button is clicked.
closeModalBtn.addEventListener("click", function () {
    welcomeModal.style.display = "none";
});

// Also allow clicking anywhere on the dark overlay to close the modal.
welcomeModal.addEventListener("click", function (event) {
    if (event.target === welcomeModal) {
        welcomeModal.style.display = "none";
    }
});


// ==========================================
// IMPLEMENT A LOOP
// ==========================================

// Array containing skills and technologies
const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "GitHub"
];

// Select the skills list
const skillsList = document.getElementById("skillsList");

// Use a for loop to display each skill
for (let i = 0; i < skills.length; i++) {
    const listItem = document.createElement("li");

    listItem.innerText = skills[i];

    skillsList.appendChild(listItem);
}


// ==========================================
// CONDITIONAL LOGIC FOR FEATURED CONTENT
// ==========================================

// Count the number of projects
const projectCount = document.querySelectorAll("#projects .project").length;

// Select the Featured Content divs
const universityResources =
    document.getElementById("universityResources");

const personalProjects =
    document.getElementById("personalProjects");

// Determine which Featured Content should be displayed
if (projectCount < 3) {

    // Show both sections if there are fewer than three projects
    universityResources.style.display = "block";
    personalProjects.style.display = "block";

} else {

    // Show Personal Projects and hide University Resources
    universityResources.style.display = "none";
    personalProjects.style.display = "block";
}


// ==========================================
// DARK MODE SLIDER WITH PERSISTENCE
// ==========================================

// Select the Dark Mode checkbox
const darkMode = document.getElementById("darkMode");

// On page load, check localStorage for a saved dark mode preference
// and apply it if it was previously enabled.
if (localStorage.getItem("darkModeEnabled") === "true") {
    document.body.classList.add("dark-mode");
    darkMode.checked = true;
}

// Add a change event listener to handle the user toggling dark mode
darkMode.addEventListener("change", function () {

    // Toggle the visual class
    document.body.classList.toggle("dark-mode");

    // Save the new preference to localStorage so it persists
    // across browser sessions.
    if (darkMode.checked) {
        localStorage.setItem("darkModeEnabled", "true");
    } else {
        localStorage.setItem("darkModeEnabled", "false");
    }
});


// ==========================================
// DYNAMICALLY ADD A NEW SECTION / MESSAGE
// ==========================================

/*
 * Dynamically create and append a new paragraph to the About section
 * that introduces a recent project. Uses document.createElement() and
 * appendChild() to build the element from scratch.
 */
function addRecentProjectParagraph() {
    var aboutSection = document.getElementById("about");

    // Create the new paragraph element.
    var newParagraph = document.createElement("p");

    // Give it a class so we can style it in CSS.
    newParagraph.className = "recent-project";

    // Add the text content.
    newParagraph.innerText =
        "Recently I built a JavaScript project that combined " +
        "DOM manipulation, event handling, and persistent storage " +
        "to create an interactive portfolio experience.";

    // Append the new paragraph to the About section.
    aboutSection.appendChild(newParagraph);
}

// Run the paragraph insertion on page load.
addRecentProjectParagraph();


/*
 * Show a notification at the top of the page after a short delay.
 * Uses setTimeout() to defer the notification so it slides in
 * after the page has settled.
 */
function showNotification() {
    // Create the notification container.
    var notification = document.createElement("div");
    notification.id = "notification";
    notification.innerText =
        "New content added — scroll down to check out my recent project!";

    // Insert it at the top of the body, before everything else.
    document.body.insertBefore(notification, document.body.firstChild);

    // Slide the notification in by adding a class after a tick.
    setTimeout(function () {
        notification.classList.add("visible");
    }, 100);

    // Automatically hide the notification after 6 seconds.
    setTimeout(function () {
        notification.classList.remove("visible");
        setTimeout(function () {
            notification.remove();
        }, 400); // Wait for the fade-out transition before removing.
    }, 6000);
}

// Trigger the notification 1.5 seconds after page load.
window.addEventListener("load", function () {
    setTimeout(showNotification, 1500);
});


// ==========================================
// REFERENCE AND MODIFY EXISTING ELEMENTS
// ==========================================

/*
 * Use querySelector and getElementById to select existing elements
 * and modify their content and style.
 */

// 1) Update the About section heading text and color.
var aboutHeading = document.querySelector("#about h2");
aboutHeading.innerText = "About Tevin Donegan";
aboutHeading.style.backgroundColor = "#04819E";
aboutHeading.style.color = "#FFFFFF";

// 2) Add a border and adjust font size on the Projects heading.
var projectsHeading = document.getElementById("projects").querySelector("h2");
projectsHeading.style.borderBottom = "4px solid #04819E";
projectsHeading.style.fontSize = "1.8em";


// ==========================================
// TIMED CONFIRMATION FOR FORM SUBMISSION
// ==========================================

// Select the Submit button and the form.
const submitButton = document.getElementById("submitButton");
const contactForm = document.getElementById("contactForm");

/*
 * Handle the form submission:
 *  1. Prevent the default form behavior.
 *  2. Show a "Sending message..." loading indicator.
 *  3. After 2.5 seconds, replace it with a confirmation message.
 *  4. Clear the form fields.
 */
submitButton.addEventListener("click", function (event) {

    // Prevent the form from refreshing the page.
    event.preventDefault();

    // Remove any previous status message so we don't stack them.
    var oldStatus = document.getElementById("formStatus");
    if (oldStatus) {
        oldStatus.remove();
    }

    // Create the loading message.
    var statusMessage = document.createElement("p");
    statusMessage.id = "formStatus";
    statusMessage.className = "loading";
    statusMessage.innerText = "Sending message...";

    // Insert it right after the Submit button's container.
    submitButton.parentNode.parentNode.appendChild(statusMessage);

    // After 2.5 seconds, replace the loading text with a confirmation.
    setTimeout(function () {
        var senderName = document.getElementById("sender-name").value;

        statusMessage.className = "success";
        statusMessage.innerText =
            "Message sent successfully! Thank you, " + senderName + ".";

        // Clear the form so the user can send another message.
        contactForm.reset();

        // Fade the confirmation out after 4 more seconds.
        setTimeout(function () {
            statusMessage.style.opacity = "0";
            setTimeout(function () {
                statusMessage.remove();
            }, 400);
        }, 4000);
    }, 2500);
});