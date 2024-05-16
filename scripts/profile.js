import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, retrieve user data from Firestore
        const userEmail = user.email; // Get user's email from authentication
        // Query Firestore to find the user document with matching email
        const usersRef = collection(db, 'Users');
        const q = query(usersRef, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);

        // Check if a document was found
        if (!querySnapshot.empty) {
            // Get the first document from the query result
            const userData = querySnapshot.docs[0].data();
            // Display user data on the profile page
            document.getElementById('userProfile').style.display = 'block';
            document.getElementById('profilePicture').src = userData.profilePictureUrl || 'path/to/default/image';
            document.getElementById('fullName').textContent = `${userData.firstName} ${userData.lastName}`;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('phone').textContent = userData.phone;
            document.getElementById('address').textContent = `${userData.address} ${userData.city} ${userData.zipcode}`;
            document.getElementById('country').textContent = userData.country;
        } else {
            console.log("No user data found!");
        }
    } else {
        // No user is signed in, redirect to login page
        window.location.href = "../pages/login.html";
    }
});

// Function to clear user data from the profile page
function clearUserProfile() {
    document.getElementById('userProfile').style.display = 'none';
    document.getElementById('profilePicture').src = 'path/to/default/image';
    document.getElementById('fullName').textContent = '';
    document.getElementById('email').textContent = '';
    document.getElementById('phone').textContent = '';
    document.getElementById('address').textContent = '';
    document.getElementById('country').textContent = '';
}

// Function to reset in-memory state or variables
function resetInMemoryState() {
    window.appState = {}; // Or however your app's state is structured
}

// Function to clear local storage or session storage
function clearBrowserStorage() {
    localStorage.clear(); // Clears everything in local storage
    sessionStorage.clear(); // Clears everything in session storage
}

// Enhanced resetAppState function that combines all the above
function resetAppState() {
    clearUserProfile();
    resetInMemoryState();
    clearBrowserStorage();
    console.log("Application state has been reset");
}

// Adjust the logoutUser function to call resetAppState
function logoutUser() {
    signOut(auth).then(() => {
        console.log("User logged out successfully");
        resetAppState(); // Call resetAppState here to clear data upon logout
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Error logging out:", error);
    });
}

// Attach logout function to logout button
document.getElementById('logoutButton').addEventListener('click', logoutUser);

function showEditForm() {
    document.getElementById('userProfile').style.display = 'none'; // Hide user profile display

    const editForm = document.getElementById('editProfileForm');
    editForm.style.display = 'block'; // Show the edit form

    fetchUserProfile().then(profile => {
        document.getElementById('editFullName').value = profile.fullName;
        document.getElementById('editEmail').value = profile.email;
        document.getElementById('editPhone').value = profile.phone;
        document.getElementById('editAddress').value = profile.address;
        document.getElementById('editCountry').value = profile.country;
    });
}

document.getElementById('editProfileButton').addEventListener('click', function () {
    showEditForm();
});
