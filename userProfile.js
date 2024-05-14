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

onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user) {
        // User is signed in, call the updateUserProfile function
        updateUserProfile(user);
        const uid = user.uid;
        return uid;
    } else {
        // User is not signed in, redirect to login page
        alert("User is not signed in");
        window.location.href = "/login.html";
    }
});

// Function to update a user profile
function updateUserProfile(user) {
    const userProfilePicture = user.photoURL;
    const userFirstName = user.displayname;
    const userLastName = user.displayname;
    const userEmail = user.email;
    const userPhone = user.displayname;
    const userAddress = user.displayname;
    const userCity = user.displayname;
    const userZipCode = user.displayname;
    const userCountry = user.displayname;


    // Update the profile section with user data
    document.getElementById("profilePicture").textContent = userProfilePicture;
    document.getElementById("firstName").textContent = userFirstName;
    document.getElementById("lastName").textContent = userLastName;
    document.getElementById("email").textContent = userEmail;
    document.getElementById("phone").textContent = userPhone;
    document.getElementById("address").textContent = userAddress;
    document.getElementById("city").textContent = userCity;
    document.getElementById("zipcode").textContent = userZipCode;
    document.getElementById("country").textContent = userCountry;

}