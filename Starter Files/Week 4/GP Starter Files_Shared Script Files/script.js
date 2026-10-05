/*
Author: Tevin Donegan
Date: 10/01/2026
Purpose: To read a greeting from the URL query string and display it along
         with the current date and time on the preview page. This single
         script file is shared by both SharingScriptFiles.html and
         Preview.html, demonstrating code reuse across pages.
*/

"use strict";

function populateInfo() {
    // Check if there is a query string in the URL (e.g. ?greeting=Hello)
    if (location.search) {
        var greeting = location.search;

        // Replace "+" with space (common in query strings)
        greeting = greeting.replace("+", " ");

        // Extract only the value after the "=" sign
        greeting = greeting.substring(greeting.lastIndexOf("=") + 1);

        // Display the greeting in the element with id="greetingtext"
        document.getElementById("greetingtext").innerHTML = decodeURIComponent(greeting);
    }

    // Create a new Date object
    var currentDate = new Date();

    // Array of weekday names for reference
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Format the day, date, and time
    var dayName = days[currentDate.getDay()];
    var dateString = currentDate.toLocaleDateString();   // e.g. 3/14/2025
    var timeString = currentDate.toLocaleTimeString();   // e.g. 10:15:30 AM

    // Combine into a single message
    var dateTimeMessage = "Sent: " + dayName + ", " + dateString + " " + timeString;

    // Display the message in the element with id="datetime"
    document.getElementById("datetime").innerHTML = dateTimeMessage;
}

// Attach the populateInfo function to the window load event
if (window.addEventListener) {
    window.addEventListener("load", populateInfo, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", populateInfo);
}