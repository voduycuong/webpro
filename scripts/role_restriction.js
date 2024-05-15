// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// Initialize Firebase
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
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Function to register users with roles
function registerUser(email, password, role) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            // Add user role to the database
            firebase.database().ref('users/' + user.uid).set({
                email: email,
                role: role
            });
            console.log("User registered successfully with role: " + role);
        })
        .catch((error) => {
            console.error("Error registering user: ", error.message);
        });
}

// Function to get the user role from the database
function getUserRole(userId, callback) {
    firebase.database().ref('users/' + userId).once('value').then((snapshot) => {
        const role = snapshot.val().role;
        callback(role);
    }).catch((error) => {
        console.error("Error fetching user role: ", error.message);
    });
}

// Function to restrict access based on user role
function restrictAccess(userId) {
    getUserRole(userId, (role) => {
        if (role === 'store owner') {
            // Allow access to store owner features
            console.log("Welcome Store Owner");
            // Add store owner specific code here
        } else if (role === 'buyer') {
            // Allow access to buyer features
            console.log("Welcome Buyer");
            // Add buyer specific code here
        } else if (role === 'admin') {
            // Allow access to admin features
            console.log("Welcome Admin");
            // Add admin specific code here
        } else {
            // Restrict access
            console.log("Access Denied");
        }
    });
}

// Listen for auth state changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        restrictAccess(user.uid);
    } else {
        console.log("User not logged in");
    }
});

// Example usage
// Registering a new user
registerUser("user@example.com", "password123", "buyer");

// Logging in and checking role
firebase.auth().signInWithEmailAndPassword("user@example.com", "password123")
    .then((userCredential) => {
        var user = userCredential.user;
        restrictAccess(user.uid);
    })
    .catch((error) => {
        console.error("Error signing in: ", error.message);
    });
