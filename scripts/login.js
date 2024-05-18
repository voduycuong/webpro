// Import the necessary functions from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to get user role from Firestore
async function getUserRole(email) {
    const usersRef = collection(db, 'Users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData;
    } else {
        throw new Error('User not found');
    }
}

// login form
document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("Logged in user:", user);

            // Fetch user role and redirect accordingly
            const userData = await getUserRole(user.email);
            const role = userData.accountType;

            // Store user information in localStorage
            localStorage.setItem('user', JSON.stringify({
                displayName: userData.displayName,
                email: user.email,
                role: role
            }));

            if (role === 'storeOwner') {
                window.location.href = "/index.html";
            } else if (role === 'shopper') {
                window.location.href = "/index.html";
            } else if (role === 'admin') {
                window.location.href = "/index.html";
            } else {
                console.error("Unknown user role:", role);
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error logging in:", errorCode, errorMessage);
            // Show error message to user
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
