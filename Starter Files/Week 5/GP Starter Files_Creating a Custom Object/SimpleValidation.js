/*
Author: TevDon4603
Date: 10/04/2026
Purpose: Uses jQuery and validator.js to validate an email address and age
         field in real time and again when the form is submitted. The form
         is only allowed to submit if both fields pass validation.
*/

$(function () {
    // Select the form once the document is ready
    const $form = $('#simpleForm');

    // Live Email Validation
    $('#email').on('keyup blur', function () {
        // Get the current value of the email input
        const value = $(this).val();

        // Use validator.js to check if it's a valid email
        if (!validator.isEmail(value)) {
            // If invalid, show an error message under the field
            $('#emailError').text('Please enter a valid email address.');
        } else {
            // If valid, clear the error message
            $('#emailError').text('');
        }
    });

    // Live Age Validation
    $('#age').on('keyup blur', function () {
        // Get the current value of the age input
        const value = $(this).val();

        // Use validator.js to check if it's an integer >= 18
        if (!validator.isInt(value, { min: 18 })) {
            // If invalid, show an error message under the field
            $('#ageError').text('You must be 18 or older.');
        } else {
            // If valid, clear the error message
            $('#ageError').text('');
        }
    });

    // Form Submission Handling
    $form.on('submit', function (e) {
        // Prevent the default form submission (page reload)
        e.preventDefault();

        // Get values from both fields
        const email = $('#email').val();
        const age = $('#age').val();

        // Validate both fields one more time before allowing submission
        const validEmail = validator.isEmail(email);
        const validAge = validator.isInt(age, { min: 18 });

        if (validEmail && validAge) {
            // If both are valid, show a success alert
            alert('Form submitted successfully!');

            // Reset the form inputs
            $form[0].reset();

            // Clear any leftover error messages
            $('#emailError, #ageError').text('');
        } else {
            // If not valid, make sure errors are shown (live checks already do this)
            if (!validEmail) $('#emailError').text('Please enter a valid email address.');
            if (!validAge) $('#ageError').text('You must be 18 or older.');
        }
    });
});