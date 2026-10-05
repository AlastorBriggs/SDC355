/*
Author: TevDon4603
Date: 10/04/2026
Purpose: Handles live client-side validation for the sign-up form using
         jQuery and validator.js. Each field has a custom rule that runs
         on keyup and blur, showing or clearing an error message. On submit,
         all fields are validated; if everything passes, an alert is shown
         and the form is cleared.
*/

$(function () {

    // ==========================================
    // CUSTOM VALIDATORS
    // ==========================================

    /**
     * Email rule:
     *  - Must be a valid email (validator.js)
     *  - Must end in .com or .edu (case-insensitive)
     */
    function isValidEmail(value) {
        return validator.isEmail(value) && /\.(com|edu)$/i.test(value);
    }

    /**
     * Password rule:
     *  - At least 8 characters
     *  - At least 1 uppercase, 1 lowercase, and 1 number
     */
    function isValidPassword(value) {
        return value.length >= 8 &&
               /[A-Z]/.test(value) &&
               /[a-z]/.test(value) &&
               /[0-9]/.test(value);
    }

    /**
     * Website URL rule:
     *  - Must be a valid URL per validator.js
     *  - Must start with http:// or https://
     */
    function isValidWebsite(value) {
        return validator.isURL(value, {
            protocols: ["http", "https"],
            require_protocol: true
        });
    }

    /**
     * Age rule:
     *  - Must be an integer >= 1
     */
    function isValidAge(value) {
        return validator.isInt(value, { min: 1 });
    }


    // ==========================================
    // LIVE VALIDATION HANDLERS
    // ==========================================

    // Email
    $("#email").on("keyup blur", function () {
        var value = $(this).val().trim();

        if (!isValidEmail(value)) {
            $("#emailError").text("Enter a valid email address.");
        } else {
            $("#emailError").text("");
        }
    });

    // Password
    $("#password").on("keyup blur", function () {
        var value = $(this).val();

        if (!isValidPassword(value)) {
            $("#passwordError").text(
                "Password must be 8+ chars with upper, lower, and number."
            );
        } else {
            $("#passwordError").text("");
        }
    });

    // Website URL
    $("#website").on("keyup blur", function () {
        var value = $(this).val().trim();

        if (!isValidWebsite(value)) {
            $("#websiteError").text(
                "Enter a valid URL starting with http:// or https://."
            );
        } else {
            $("#websiteError").text("");
        }
    });

    // Age
    $("#age").on("keyup blur", function () {
        var value = $(this).val().trim();

        if (!isValidAge(value)) {
            $("#ageError").text("Enter a valid age (must be 1 or higher).");
        } else {
            $("#ageError").text("");
        }
    });


    // ==========================================
    // FORM SUBMISSION
    // ==========================================

    $("#signupForm").on("submit", function (event) {

        // Prevent the default page reload.
        event.preventDefault();

        // Grab trimmed values.
        var email = $("#email").val().trim();
        var password = $("#password").val();
        var website = $("#website").val().trim();
        var age = $("#age").val().trim();

        // Validate each field and collect results.
        var validEmail = isValidEmail(email);
        var validPassword = isValidPassword(password);
        var validWebsite = isValidWebsite(website);
        var validAge = isValidAge(age);

        // Show or clear errors for each field.
        if (!validEmail) {
            $("#emailError").text("Enter a valid email address.");
        } else {
            $("#emailError").text("");
        }

        if (!validPassword) {
            $("#passwordError").text(
                "Password must be 8+ chars with upper, lower, and number."
            );
        } else {
            $("#passwordError").text("");
        }

        if (!validWebsite) {
            $("#websiteError").text(
                "Enter a valid URL starting with http:// or https://."
            );
        } else {
            $("#websiteError").text("");
        }

        if (!validAge) {
            $("#ageError").text("Enter a valid age (must be 1 or higher).");
        } else {
            $("#ageError").text("");
        }

        // All four must pass to submit.
        if (validEmail && validPassword && validWebsite && validAge) {
            alert("Form submitted successfully!");
            $("#signupForm")[0].reset();
            $(".error").text("");
        }
    });

});