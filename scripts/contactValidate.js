function validateForm() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    // Validate name (at least 3 letters)
    if (nameInput.value.length < 3) {
        alert("Name must be at least 3 characters long.");
        return false;
    }

    // Validate email (simple pattern check)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailInput.value)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate phone (9 to 11 digits)
    const phonePattern = /^\d{9,11}$/;
    if (!phonePattern.test(phoneInput.value)) {
        alert("Please enter a valid phone number (9 to 11 digits).");
        return false;
    }

    // Validate message length (50 to 500 characters)
    if (messageInput.value.length < 50 || messageInput.value.length > 500) {
        alert("Message must be between 50 and 500 characters long.");
        return false;
    }

    // All validations passed
    return true;
}

// Insert header and footer
document.addEventListener("DOMContentLoaded", function () {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            const hamburger = document.getElementById('hamburger-menu');
            const navLinks = document.getElementById('nav-links');

            hamburger.addEventListener('click', () => {
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                } else {
                    navLinks.style.display = 'flex';
                }
            });
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});
