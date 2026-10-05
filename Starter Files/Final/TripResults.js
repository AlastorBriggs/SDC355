/*
Author: TevDon4603
Date: 10/04/2026
Purpose: Reads the trip summary data stored by TripSummary.html and displays
         it on the results page.
*/

"use strict";

/**
 * Reads the trip summary cookie and the session storage date/time, then
 * writes the values into the page.
 */
function displaySummary() {
    // Read the date/time from session storage.
    var dateTime = sessionStorage.dateTime || "(not stored)";

    // Read the trip summary cookie.
    var tripSummary = null;

    if (document.cookie) {
        // document.cookie is a single string like "key=value; key2=value2"
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();

            if (cookie.indexOf("tripSummary=") === 0) {
                var value = cookie.substring("tripSummary=".length);
                tripSummary = JSON.parse(decodeURIComponent(value));
                break;
            }
        }
    }

    // Fill in the output fields.
    if (tripSummary) {
        document.getElementById("tripNameOut").textContent = tripSummary.tripName;
        document.getElementById("milesOut").textContent = tripSummary.totalMiles;
        document.getElementById("gallonsOut").textContent = tripSummary.gallons;
        document.getElementById("mpgOut").textContent = tripSummary.mpg.toFixed(2);
        document.getElementById("dateTimeOut").textContent = dateTime;
    } else {
        document.getElementById("tripNameOut").textContent = "(no data found)";
    }
}

// Run once the page loads.
window.addEventListener("load", displaySummary, false);