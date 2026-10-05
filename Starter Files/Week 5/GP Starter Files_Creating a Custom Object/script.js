/*
Author: TevDon4603
Date: 10/04/2026
Purpose: Collects pizza order data from the form, stores delivery details in
         the delivInfo object and food order details in the foodInfo object,
         then displays a formatted summary of both when the user clicks the
         Preview Order button.
*/

"use strict";

var delivInfo = {};    // Empty object to hold delivery details
var foodInfo = {};     // Empty object to hold food order details
var delivSummary = document.getElementById("deliverTo"); // Delivery summary panel
var foodSummary = document.getElementById("order");       // Food summary panel

// Collect delivery info from form, save into delivInfo, and display in summary panel
function processDeliveryInfo() {
    var prop;

    delivInfo.name = document.getElementById("nameinput").value;
    delivInfo.addr = document.getElementById("addrinput").value;
    delivInfo.city = document.getElementById("cityinput").value;
    delivInfo.email = document.getElementById("emailinput").value;
    delivInfo.phone = document.getElementById("phoneinput").value;

    // Loop through delivInfo properties and display each in the summary
    for (prop in delivInfo) {
        delivSummary.innerHTML += "<p>" + delivInfo[prop] + "</p>";
    }

    document.getElementById("deliverTo").style.display = "block";
}

// Collect food info (crust, size, toppings, instructions), save into foodInfo, and display summary
function processFood() {
    var crustOpt = document.getElementsByName("crust");
    var toppings = 0;
    var toppingBoxes = document.getElementsByName("toppings");
    var instr = document.getElementById("instructions");

    // Check crust option (radio buttons)
    if (crustOpt[0].checked) {
        foodInfo.crust = crustOpt[0].value;
    } else {
        foodInfo.crust = crustOpt[1].value;
    }

    // Save size selection
    foodInfo.size = document.getElementById("size").value;

    // Loop through topping checkboxes and add selected ones
    for (var i = 0; i < 5; i++) {
        if (toppingBoxes[i].checked) {
            toppings += 1;
            foodInfo["topping" + toppings] = toppingBoxes[i].value;
        }
    }

    // Save special instructions if provided
    if (instr.value) {
        foodInfo.instructions = instr.value;
    }

    // Build order summary
    foodSummary.innerHTML += "<p><span>Crust</span>: " + foodInfo.crust + "</p>";
    foodSummary.innerHTML += "<p><span>Size</span>: " + foodInfo.size + "</p>";
    foodSummary.innerHTML += "<p><span>Topping(s)</span>: </p><ul>";

    // Display selected toppings
    for (var i = 1; i < 6; i++) {
        if (foodInfo["topping" + i]) {
            foodSummary.innerHTML += "<li>" + foodInfo["topping" + i] + "</li>";
        }
    }

    foodSummary.innerHTML += "</ul>";

    // Add instructions if provided
    foodSummary.innerHTML += "<p><span>Instructions</span>: " + foodInfo.instructions + "</p>";

    document.getElementById("order").style.display = "block";
}

// Show the preview order section and run both info processing functions
function previewOrder() {
    document.getElementsByTagName("section")[0].style.display = "block";
    processDeliveryInfo();
    processFood();
}

// Add event listener to Preview button
function createEventListener() {
    var previewBtn = document.getElementById("previewBtn");

    if (previewBtn.addEventListener) {
        previewBtn.addEventListener("click", previewOrder, false);
    } else if (previewBtn.attachEvent) {   // Older IE fallback
        previewBtn.attachEvent("onclick", previewOrder);
    }
}

// Run createEventListener when the page loads
if (window.addEventListener) {
    window.addEventListener("load", createEventListener, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListener);
}