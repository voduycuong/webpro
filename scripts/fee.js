// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const role = await getUserRole(user.uid);
            if (role === 'admin') {
                document.getElementById('adminSection').style.display = 'block';
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
        }
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

// Fetch commission fees on page load
document.addEventListener('DOMContentLoaded', fetchCommissionFees);

// Add event listener to update fee form
document.getElementById('updateFeeForm').addEventListener('submit', updateCommissionFee);
