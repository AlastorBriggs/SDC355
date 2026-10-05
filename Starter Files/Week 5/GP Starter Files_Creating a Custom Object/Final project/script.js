/*
    Author: Tevin Donegan
    Date: 10/04/2026
    Purpose: Adds interactive behavior to the portfolio page, including
    custom project objects rendered dynamically, session storage
    persistence, a skills loop, conditional featured content, a dark mode
    toggle with localStorage persistence, dynamically created elements,
    modified existing elements, and a timed confirmation for form
    submission.
*/

"use strict";


// ==========================================
// CUSTOM PROJECT OBJECTS
// ==========================================

/*
 * Each project is a plain JavaScript object with four properties:
 *   - title   : the project's display name
 *   - summary : a short 1–2 sentence description
 *   - icon    : path to the project's thumbnail image
 *   - link    : URL to the project's GitHub repository
 */
var projects = [
    {
        title: "JavaScript Project",
        summary: "A JavaScript project demonstrating programming " +
                 "and web development skills.",
        icon: "project1.jpg",
        link: "https://github.com/AlastorBriggs/SDC355.git"
    },
    {
        title: "Web Development Project",
        summary: "A web development project created as part of " +
                 "my coursework.",
        icon: "project2.jpg",
        link: "https://github.com/AlastorBriggs/SDC355.git"
    },
    {
        title: "Programming Project",
        summary: "A programming project demonstrating problem-solving " +
                 "and coding skills.",
        icon: "project3.jpg",
        link: "https://github.com/AlastorBriggs/SDC355.git"
    }
];


// ==========================================
// STORE AND PARSE WITH SESSION STORAGE
// ==========================================

/*
 * On page load, check whether the project data already exists in
 * session storage. If not, stringify the array and store it. If it
 * does exist, retrieve the string and parse it back into an array.
 *
 * sessionStorage is used because it persists across page reloads in the
 * same tab but is cleared when the tab is closed — perfect for temporary
 * project data that doesn't need to survive a browser restart.
 */
function loadProjectsFromStorage() {

    // Check if the stored key exists.
    if (!sessionStorage.getItem("portfolioProjects")) {

        // First visit: store the array as a JSON string.
        sessionStorage.setItem(
            "portfolioProjects",
            JSON.stringify(projects)
        );
    } else {

        // Returning: retrieve the string and parse it back into an array.
        projects = JSON.parse(sessionStorage.getItem("portfolioProjects"));
    }
}

// Load (or initialize) the projects on page load.
loadProjectsFromStorage();


// ==========================================
// RENDER PROJECTS DYNAMICALLY
// ==========================================

/*
 * Select the projects container, loop through the projects array, and
 * build a DOM element for each project showing its title, summary,
 * icon, and a link to its repository.
 */
function renderProjects() {
    var container = document.querySelector("#projects .projects");

    // Clear the container first so we don't duplicate anything that
    // may already be in the HTML.
    container.innerHTML = "";

    // Loop through each project object and build the DOM nodes.
    for (var i = 0; i < projects.length; i++) {
        var project = projects[i];

        // Wrapper div for the whole project card.
        var projectDiv = document.createElement("div");
        projectDiv.className = "project";

        // Clickable image link.
        var linkEl = document.createElement("a");
        linkEl.href = project.link;
        linkEl.target = "_blank";
        linkEl.rel = "noopener noreferrer";

        var img = document.createElement("img");
        img.src = project.icon;
        img.alt = project.title;

        linkEl.appendChild(img);
        projectDiv.appendChild(linkEl);

        // Title heading.
        var titleEl = document.createElement("h3");
        titleEl.innerText = project.title;
        projectDiv.appendChild(titleEl);

        // Summary paragraph.
        var summaryEl = document.createElement("p");
        summaryEl.innerText = project.summary;
        projectDiv.appendChild(summaryEl);

        // Add the finished card to the container.
        container.appendChild(projectDiv);
    }
}

// Render the projects on page load.
renderProjects();


// ==========================================
// IMPLEMENT A LOOP (skills list)
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

// Count the number of projects rendered
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
 * that introduces a recent project.
 */
function addRecentProjectParagraph() {
    var aboutSection = document.getElementById("about");

    var newParagraph = document.createElement("p");
    newParagraph.className = "recent-project";
    newParagraph.innerText =
        "Recently I built a JavaScript project that combined " +
        "DOM manipulation, event handling, and persistent storage " +
        "to create an interactive portfolio experience.";

    aboutSection.appendChild(newParagraph);
}

addRecentProjectParagraph();


/*
 * Show a notification at the top of the page after a short delay.
 */
function showNotification() {
    var notification = document.createElement("div");
    notification.id = "notification";
    notification.innerText =
        "New content added — scroll down to check out my recent project!";

    document.body.insertBefore(notification, document.body.firstChild);

    setTimeout(function () {
        notification.classList.add("visible");
    }, 100);

    setTimeout(function () {
        notification.classList.remove("visible");
        setTimeout(function () {
            notification.remove();
        }, 400);
    }, 6000);
}

window.addEventListener("load", function () {
    setTimeout(showNotification, 1500);
});


// ==========================================
// REFERENCE AND MODIFY EXISTING ELEMENTS
// ==========================================

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

const submitButton = document.getElementById("submitButton");
const contactForm = document.getElementById("contactForm");

submitButton.addEventListener("click", function (event) {

    event.preventDefault();

    var oldStatus = document.getElementById("formStatus");
    if (oldStatus) {
        oldStatus.remove();
    }

    var statusMessage = document.createElement("p");
    statusMessage.id = "formStatus";
    statusMessage.className = "loading";
    statusMessage.innerText = "Sending message...";

    submitButton.parentNode.appendChild(statusMessage);

    setTimeout(function () {
        var senderName = document.getElementById("sender-name").value;

        statusMessage.className = "success";
        statusMessage.innerText =
            "Message sent successfully! Thank you, " + senderName + ".";

        contactForm.reset();

        setTimeout(function () {
            statusMessage.style.opacity = "0";
            setTimeout(function () {
                statusMessage.remove();
            }, 400);
        }, 4000);
    }, 2500);
});