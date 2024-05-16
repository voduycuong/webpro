// Import the necessary functions from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1lU93LyUOig7V-j1bmQuK3J3EGG7lzP0",
    authDomain: "bluegame-28f86.firebaseapp.com",
    databaseURL: "https://bluegame-28f86-default-rtdb.firebaseio.com",
    projectId: "bluegame-28f86",
    storageBucket: "bluegame-28f86.appspot.com",
    messagingSenderId: "811572790555",
    appId: "1:811572790555:web:efb6caa094651088e27fbe",
    measurementId: "G-E002PST6WK"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// login form
document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Logged in user:", user);

            // Store user information in localStorage
            localStorage.setItem('user', JSON.stringify({
                displayName: user.displayName,
                email: user.email,
            }));

            // Redirect to another page or show success message
            window.location.href = "../pages/profile.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error logging in:", errorCode, errorMessage);
        });
});

document.getElementById("forgotPasswordLink").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none"; // Hide login form
    document.getElementById("resetPasswordForm").style.display = "block"; // Show reset password form
});

document.getElementById("backToLogin").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("resetPasswordForm").style.display = "none"; // Hide reset password form
    document.getElementById("loginForm").style.display = "block"; // Show login form
});

// Forgot password reset
document.getElementById("resetPassword").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("resetEmail").value;
    if (email) { // Check if email is not null
        sendPasswordResetEmail(auth, email).then(function () {
            // Email sent.
            alert("Password reset email sent. Please check your email.");
        }).catch(function (error) {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error sending password reset email:", errorCode, errorMessage);
            alert("Failed to send password reset email. Please try again.");
        });
    }
});

// Logout function
function logout() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("User signed out.");

        // Remove user information from localStorage
        localStorage.removeItem('user');

        // Redirect to the home page or login page
        window.location.href = "../pages/login.html";
    }).catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
    });
}

// Add event listener to logout button
document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault();
    logout();
});
