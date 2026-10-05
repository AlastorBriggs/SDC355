/*
Author: TevDon4603
Date: 10/04/2026
Purpose: Handles the Bill Splitter form. Validates the tip percentage in
         real time (must be between 0 and 100), then calculates and displays
         the tip amount, the total bill with tip included, and the amount
         each person owes when the bill is split evenly.
*/

"use strict";

// Grab the input elements and output elements once the page has loaded.
var billInput = document.getElementById("billAmount");
var tipInput = document.getElementById("tipPercent");
var peopleInput = document.getElementById("peopleCount");
var tipError = document.getElementById("tipError");
var summary = document.getElementById("summary");

/**
 * Live validation for the tip percentage field.
 * Displays a red error message if the value is outside 0–100.
 * Clears the message when the value is valid.
 */
function validateTip() {
    var value = tipInput.value;

    // If the field is empty, don't show an error yet.
    if (value === "") {
        tipError.textContent = "";
        return true;
    }

    var tip = Number(value);

    if (isNaN(tip) || tip < 0 || tip > 100) {
        tipError.textContent =
            "Tip percentage must be between 0 and 100.";
        return false;
    }

    tipError.textContent = "";
    return true;
}

/**
 * Reads the form values then validates them, and displays a summary of the
 * calculated tip, total bill, and per-person amount.
 */
function calculateBill() {
    // Live-validate the tip first.
    if (!validateTip()) {
        // Hide any previous summary so the user doesn't see stale numbers.
        summary.style.display = "none";
        alert("Please correct the tip percentage before calculating.");
        return;
    }

    // Read and convert the values.
    var bill = Number(billInput.value);
    var tipPercent = Number(tipInput.value);
    var people = Number(peopleInput.value);

    // Basic validation for the other fields.
    if (isNaN(bill) || bill < 0) {
        alert("Please enter a valid bill amount.");
        return;
    }
    if (isNaN(people) || people < 1) {
        alert("Please enter at least 1 person.");
        return;
    }

    // Perform the calculations.
    var tipAmount = bill * (tipPercent / 100);
    var totalBill = bill + tipAmount;
    var perPerson = totalBill / people;

    // Display the results, formatted to two decimal places with a $ sign.
    document.getElementById("tipAmount").textContent =
        "$" + tipAmount.toFixed(2);
    document.getElementById("totalBill").textContent =
        "$" + totalBill.toFixed(2);
    document.getElementById("perPerson").textContent =
        "$" + perPerson.toFixed(2);

    // Show the summary panel.
    summary.style.display = "block";
}

// Attach the live validation to the tip field.
tipInput.addEventListener("input", validateTip);
tipInput.addEventListener("blur", validateTip);

// Attach the Calculate button handler.
document.getElementById("calculateBtn")
    .addEventListener("click", calculateBill, false);