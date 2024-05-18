// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Function to read CSV file from directory and parse it
async function readCSVFromDirectory(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    const data = text.split('\n').map(row => row.split(','));
    return data;
}

// Populate dropdown with countries from CSV
async function populateCountryDropdown() {
    const countrySelect = document.getElementById('country');
    countrySelect.innerHTML = '<option value="">Select a country</option>'; // Clear existing options

    try {
        const csvData = await readCSVFromDirectory('/misc/countries_code.csv'); // Replace with the actual path to the CSV file
        csvData.forEach(row => {
            const country = row[0]; // Assuming the country is in the first cell of each row
            const option = document.createElement('option');
            option.value = country;
            option.text = country;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error reading CSV file:', error);
        alert('Error reading CSV file: ' + error.message);
    }
}

async function registerWithEmailAndPassword(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;
    const profilePicture = document.getElementById('profilePicture').files[0];
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value;
    const country = document.getElementById('country').value;
    const accountType = document.querySelector('input[name="accountType"]:checked').value;

    let storeName = '';
    let storeImageFile = null;

    if (accountType === 'storeOwner') {
        storeName = document.getElementById('storeName').value;
        storeImageFile = document.getElementById('storeImage').files[0];
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
            uid: user.uid,
            email: email,
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            zipcode: zipcode,
            country: country,
            accountType: accountType,
            profilePictureUrl: '',
            storeName: storeName,
            storeImage: ''
        };

        // Upload profile picture if provided
        if (profilePicture) {
            const profilePictureRef = ref(storage, `profile_pictures/${user.uid}/${profilePicture.name}`);
            await uploadBytes(profilePictureRef, profilePicture);
            const profilePictureUrl = await getDownloadURL(profilePictureRef);
            userData.profilePictureUrl = profilePictureUrl;
        }

        // If the user is a store owner, upload store image and add store data to the "Stores" collection
        if (accountType === 'storeOwner' && storeImageFile) {
            const storeImageRef = ref(storage, `store_images/${user.uid}/${storeImageFile.name}`);
            await uploadBytes(storeImageRef, storeImageFile);
            const storeImageLogo = await getDownloadURL(storeImageRef);
            userData.storeImage = storeImageLogo;

            const storeData = {
                name: storeName,
                image: storeImageLogo
            };

            await addDoc(collection(db, 'Stores'), storeData);
        }

        await addDoc(collection(db, 'Users'), userData);

        alert("User registered successfully!");
        window.location.href = "/pages/login.html"; // back to login page

    } catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user: " + error.message);
    }
}


document.querySelector('form').addEventListener('submit', registerWithEmailAndPassword);
document.querySelectorAll('input[name="accountType"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        if (this.value === 'storeOwner') {
            document.getElementById('storeFields').style.display = 'block';
        } else {
            document.getElementById('storeFields').style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', populateCountryDropdown); // Populate dropdown on page load

// Check re-typed password
document.getElementById('confirmPassword').addEventListener('input', function () {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmPassword').setCustomValidity('Passwords do not match');
    } else {
        document.getElementById('confirmPassword').setCustomValidity('');
    }
});

// Fetch user role from Firestore
async function getUserRole(userId) {
    const userDoc = await getDoc(doc(db, 'Users', userId));
    if (userDoc.exists()) {
        return userDoc.data().accountType;
    } else {
        throw new Error('User not found');
    }
}

// Restrict access based on user role
async function restrictAccess(user) {
    try {
        const role = await getUserRole(user.uid);
        if (role === 'storeOwner') {
            console.log("Welcome Store Owner");
            // Add store owner specific code here
        } else if (role === 'buyer') {
            console.log("Welcome Buyer");
            // Add buyer specific code here
        } else if (role === 'admin') {
            console.log("Welcome Admin");
            // Add admin specific code here
        } else {
            console.log("Access Denied");
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
    }
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        restrictAccess(user);
    } else {
        console.log("User not logged in");
    }
});
