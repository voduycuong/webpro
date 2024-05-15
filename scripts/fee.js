// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Function to fetch commission fees
async function fetchCommissionFees() {
    const feeTable = document.getElementById('feeTable');
    feeTable.innerHTML = ''; // Clear existing rows

    const electronicsSnapshot = await getDoc(doc(db, 'CommissionFees', 'electronics'));
    const electronicsFees = electronicsSnapshot.data();

    for (const [category, fees] of Object.entries(electronicsFees)) {
        let row = `<tr>
            <td>Electronics</td>
            <td>${category}</td>
            <td>${fees.subCategory}</td>
            <td>${fees.fee}</td>
        </tr>`;
        feeTable.insertAdjacentHTML('beforeend', row);
    }

    const nonElectronicsSnapshot = await getDoc(doc(db, 'CommissionFees', 'nonElectronics'));
    const nonElectronicsFees = nonElectronicsSnapshot.data();

    for (const [category, fees] of Object.entries(nonElectronicsFees)) {
        let row = `<tr>
            <td>Non-Electronics</td>
            <td>${category}</td>
            <td>${fees.subCategory}</td>
            <td>${fees.fee}</td>
        </tr>`;
        feeTable.insertAdjacentHTML('beforeend', row);
    }
}

// Function to update commission fees
async function updateCommissionFee(event) {
    event.preventDefault();

    const sellerType = document.getElementById('sellerType').value;
    const category = document.getElementById('category').value;
    const subCategory = document.getElementById('subCategory').value;
    const commissionFee = document.getElementById('commissionFee').value;

    const feeDocRef = doc(db, 'CommissionFees', sellerType);
    const feeDocSnapshot = await getDoc(feeDocRef);

    if (feeDocSnapshot.exists()) {
        const feeData = feeDocSnapshot.data();
        feeData[category] = { subCategory: subCategory, fee: commissionFee };
        await updateDoc(feeDocRef, feeData);
    } else {
        const feeData = {};
        feeData[category] = { subCategory: subCategory, fee: commissionFee };
        await setDoc(feeDocRef, feeData);
    }

    alert('Commission fee updated successfully!');
    fetchCommissionFees();
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        getUserRole(user.uid).then(role => {
            if (role === 'admin') {
                document.getElementById('adminSection').style.display = 'block';
            }
        });
    }
});

// Fetch user role
async function getUserRole(userId) {
    const userDoc = await getDoc(doc(db, 'Users', userId));
    if (userDoc.exists()) {
        return userDoc.data().accountType;
    } else {
        throw new Error('User not found');
    }
}

// Register users with additional fields
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
    let storeImage = '';

    if (accountType === 'storeOwner') {
        storeName = document.getElementById('storeName').value;
        storeImage = document.getElementById('storeImage').files[0];
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

        // Upload store image if provided
        if (storeImage) {
            const storeImageRef = ref(storage, `store_images/${user.uid}/${storeImage.name}`);
            await uploadBytes(storeImageRef, storeImage);
            const storeImageUrl = await getDownloadURL(storeImageRef);
            userData.storeImage = storeImageUrl;
        }

        await setDoc(doc(db, 'Users', user.uid), userData);
        alert("User registered successfully!");
        window.location.href = "/pages/login.html"; // back to login page

        // If the user is a store owner, add store data to the "Stores" collection
        if (accountType === 'storeOwner') {
            const storeData = {
                name: storeName,
                image: userData.storeImage
            };

            await addDoc(collection(db, 'Stores'), storeData);
        }

    } catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user: " + error.message);
    }
}

// Fetch commission fees on page load
document.addEventListener('DOMContentLoaded', fetchCommissionFees);

// Add event listener to update fee form
document.getElementById('updateFeeForm').addEventListener('submit', updateCommissionFee);

// Add event listener to registration form
document.querySelector('form').addEventListener('submit', registerWithEmailAndPassword);

// Add event listener to account type radio buttons
document.querySelectorAll('input[name="accountType"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        if (this.value === 'storeOwner') {
            document.getElementById('storeFields').style.display = 'block';
        } else {
            document.getElementById('storeFields').style.display = 'none';
        }
    });
});

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
