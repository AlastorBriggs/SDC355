/*
Author: TevDon4603
Date: 10/04/2026
Purpose: To validate email, phone number, and postal code inputs using
         regular expressions. Live validation runs on each keyup event,
         and a "Check Inputs" button validates all fields at once.
*/

"use strict";

// Grab elements
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const postal = document.getElementById("postal");
const checkBtn = document.getElementById("checkBtn");
const emailFeedback = document.getElementById("emailFeedback");
const phoneFeedback = document.getElementById("phoneFeedback");
const postalFeedback = document.getElementById("postalFeedback");

// Email regex
// ^ = must start here
// [\w.-]+ = one or more letters, numbers, underscores (\w), dots (.), or hyphens (-)
// @ = must include an @ symbol
// [\w.-]+ = one or more letters, numbers, underscores, dots, or hyphens (the domain)
// \. = must include a dot
// \w{2,} = at least two letters/numbers/underscores after the dot (e.g., com, org)
// $ = must end here
const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

// Phone regex (format: 123-456-7890)
// ^ = must start here
// \d{3} = exactly three digits
// - = a hyphen
// \d{3} = exactly three digits
// - = a hyphen
// \d{4} = exactly four digits
// $ = must end here
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

// Postal code regex (5 digits)
// ^ = must start here
// \d{5} = exactly five digits
// $ = must end here
const postalRegex = /^\d{5}$/;

// Helper to validate inputs
function validateField(input, regex, feedbackElem) {
    if (regex.test(input.value)) {
        feedbackElem.textContent = "Valid";
        feedbackElem.className = "feedback valid";
    } else {
        feedbackElem.textContent = "Invalid";
        feedbackElem.className = "feedback invalid";
    }
}

// Attach live validation
[email, phone, postal].forEach((field, i) => {
    const feedbackElems = [emailFeedback, phoneFeedback, postalFeedback];
    const regexes = [emailRegex, phoneRegex, postalRegex];

    field.addEventListener("keyup", () => {
        validateField(field, regexes[i], feedbackElems[i]);
    });
});

// Validate all on button click
checkBtn.addEventListener("click", () => {
    validateField(email, emailRegex, emailFeedback);
    validateField(phone, phoneRegex, phoneFeedback);
    validateField(postal, postalRegex, postalFeedback);
});