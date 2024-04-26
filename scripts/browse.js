// Function to filter stores based on user input
function filterStores() {
    const searchInput = document.getElementById("storeSearch").value.toLowerCase();
    const stores = document.querySelectorAll("#stores-list .store");

    stores.forEach(store => {
        const storeName = store.textContent.toLowerCase();
        if (storeName.includes(searchInput)) {
            store.style.display = "block";
        } else {
            store.style.display = "none";
        }
    });
}

// Function to control the initial visibility of stores and buttons
function initialStoreSetup() {
    const stores = document.querySelectorAll("#stores-list .store");

    stores.forEach((store, index) => {
        if (index >= 14) {
            store.style.display = "none"; // Hide stores beyond the first 14
        }
    });

    // Initial button setup
    document.getElementById("show-all-button").style.display = "block";
    document.getElementById("show-less-button").style.display = "none";
}

// Function to show all stores when the "show All Stores" button is clicked
function showAllStores() {
    const stores = document.querySelectorAll("#stores-list .store");

    stores.forEach(store => {
        store.style.display = "block";
    });

    // Hide "show All" button and show "Show Less" button
    document.getElementById("show-all-button").style.display = "none";
    document.getElementById("show-less-button").style.display = "block";
}

// Function to hide stores beyond the first 14 when the "Show Less" button is clicked
function showLessStores() {
    const stores = document.querySelectorAll("#stores-list .store");

    stores.forEach((store, index) => {
        if (index >= 14) {
            store.style.display = "none"; // Hide stores beyond the first 14
        }
    });

    // Show "show All" button and hide "Show Less" button
    document.getElementById("show-all-button").style.display = "block";
    document.getElementById("show-less-button").style.display = "none";
}

// Set up initial store and button visibility when the page loads
document.addEventListener("DOMContentLoaded", initialStoreSetup);


