/*
Author: Tevin Donegan
Date: 10/03/2026
Purpose: To save and retrieve a username using browser cookies. When the
         "Remember me" checkbox is checked, the username is stored in a
         cookie that expires in 2 minutes. On page load, the saved username
         is used to pre-fill the login form.
*/

"use strict";

// Function to create or remove a cookie based on "Remember Me" checkbox
function processCookie() {
    var expiresDate = new Date(); // Current date/time

    if (document.getElementById("rememberinput").checked) {
        // If "Remember Me" is checked, set cookie to expire in 2 minutes
        expiresDate.setMinutes(expiresDate.getMinutes() + 2);

        // Save the username entered into a cookie with expiration date
        document.cookie = "username="
            + document.getElementById("usernameinput").value
            + "; expires=" + expiresDate.toUTCString();
    }
    else {
        // If "Remember Me" is NOT checked, set cookie to an old date (deletes it)
        expiresDate.setDate(expiresDate.getDate() - 7);
        document.cookie = "username=null; expires=" +
            expiresDate.toUTCString();
    }
}

// Function to pre-fill the username input field if a cookie exists
function populateInfo() {
    if (document.cookie) {
        var uname = document.cookie;

        // Extract the value after the last "=" (username value)
        uname = uname.substring(uname.lastIndexOf("=") + 1);

        // Set the username input field to the stored value
        document.getElementById("usernameinput").value = uname;
    }
}

// Function to handle form submission
function handleSubmit(evt) {
    // Prevent default form submission (cross-browser compatibility)
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }

    // Save or delete cookie before submitting
    processCookie();

    // Submit the form after handling cookies
    document.getElementsByTagName("form")[0].submit();
}

// Function to attach submit event listener to the form
function createEventListener() {
    var loginForm = document.getElementsByTagName("form")[0];

    if (loginForm.addEventListener) {
        // Modern browsers
        loginForm.addEventListener("submit", handleSubmit, false);
    }
    else if (loginForm.attachEvent) {
        // Older IE browsers
        loginForm.attachEvent("onsubmit", handleSubmit);
    }
}

// Function to run when the page loads
function setUpPage() {
    populateInfo();       // Fill in username if cookie exists
    createEventListener(); // Attach event listener to form
}

// Attach setUpPage to window load event (cross-browser support)
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}