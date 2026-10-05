/*
Author: TevDon4603
Date: 10/04/2026
Purpose: Collects trip information from the form, calculates total miles
         traveled and fuel economy, stores the summary in a cookie and the
         current date/time in session storage, then opens a new window to
         display the results.
*/

"use strict";

/**
 * Reads the values from the trip form, builds a summary object, saves the
 * data to session storage and a cookie, then opens the results window.
 */
function generateSummary() {
    // Grab the values from each input box.
    var tripName = document.getElementById("tripNameInput").value;
    var startMileage = Number(document.getElementById("startMileageInput").value);
    var endMileage = Number(document.getElementById("endMileageInput").value);
    var gallons = Number(document.getElementById("gallonsInput").value);

    // Calculate total miles traveled and fuel economy.
    var totalMiles = endMileage - startMileage;
    var mpg = totalMiles / gallons;

    // Build the trip summary as a custom object.
    var tripSummary = {
        tripName: tripName,
        startMileage: startMileage,
        endMileage: endMileage,
        gallons: gallons,
        totalMiles: totalMiles,
        mpg: mpg,
        generated: new Date().toString()
    };

    // Save the current date/time to session storage.
    sessionStorage.dateTime = new Date().toString();

    // Save the trip summary object to a cookie as a JSON string.
    var expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 1); // expires in 1 day
    document.cookie = "tripSummary=" +
        encodeURIComponent(JSON.stringify(tripSummary)) +
        "; expires=" + expiresDate.toUTCString() + "; path=/";

    // Open the results window.
    window.open("TripResults.html", "TripResults",
        "width=500,height=400");
}

// Attach the click handler once the page has loaded.
window.addEventListener("load", function () {
    document.getElementById("summaryBtn")
        .addEventListener("click", generateSummary, false);
});