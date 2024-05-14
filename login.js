// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKPuuIwmRvpplZPIBxWiqDhgS5VICcVbo",
    authDomain: "test-web-c19db.firebaseapp.com",
    projectId: "test-web-c19db",
    storageBucket: "test-web-c19db.appspot.com",
    messagingSenderId: "251341682494",
    appId: "1:251341682494:web:6d7cddfd7a514eec031e6f",
    measurementId: "G-ENX5M22045"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const user = auth.currentUser();


function login() {
    email =document.getElementById("email").value
    password =document.getElementById("password").value

// Validate input
    if (validate_email(email) == false || validate_password(password) == false) { 
        alert('Email or password is incorrect!!')
        return
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser
        // Add the user to the Firebase
        var database_ref = database.ref()
        // create a new user database
        var user_data = {
            last_login: Date.now(),
        }

        database_ref.child('users/' + user.uid).update(user_data)
        // Done log in
        alert('User logged in!!')

    })
    .catch(function(error) {
        var error_code = error.code
        var errorMessage = error.message

        alert(error_message)
    });

}

// Function to check if user is logged in
function isUserLoggedIn() {
    // Check if the user is logged in by checking if a specific key exists in localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Example usage:
if (isUserLoggedIn()) {
    // User is logged in, perform actions accordingly
    console.log("User is logged in");
} else {
    // User is not logged in, maybe redirect to login page
    console.log("User is not logged in");
}

    