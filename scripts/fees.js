// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

// Function to fetch commission fees
async function getCommissionFees() {
    try {
        const electronicsDocRef = doc(db, "CommissionFees", "Electronics");
        const nonElectronicsDocRef = doc(db, "CommissionFees", "nonElectronics");

        const [electronicsSnap, nonElectronicsSnap] = await Promise.all([
            getDoc(electronicsDocRef),
            getDoc(nonElectronicsDocRef)
        ]);

        const electronicsData = electronicsSnap.exists() ? electronicsSnap.data() : {};
        const nonElectronicsData = nonElectronicsSnap.exists() ? nonElectronicsSnap.data() : {};

        updateCommissionFees(electronicsData, nonElectronicsData);
    } catch (error) {
        console.error("Error fetching commission fees:", error);
    }
}

// Function to update commission fees table
function updateCommissionFees(electronics, nonElectronics) {
    const tbody = document.getElementById('commission-fees-body');

    const electronicsRows = `
        <tr>
            <td rowspan="8">Electronics</td>
            <td rowspan="2">Mobile & Gadgets</td>
            <td>Mobile Phones, Tablets</td>
            <td rowspan="2">${electronics.mobile_gadgets}%</td>
        </tr>

        <tr>
            <td>All Others</td>
        </tr>

        <tr>
            <td>Camera & Drones</td>
            <td>All</td>
            <td>${electronics.camera_drones}%</td>
        </tr>

        <tr>
            <td rowspan="2">Home Appliances</td>
            <td>Large Household Appliances</td>
            <td rowspan="2">${electronics.home_appliances}%</td>
        </tr>

        <tr>
            <td>All Others</td>
        </tr>

        <tr>
            <td rowspan="2">Computers & Accessories</td>
            <td>Desktop Computers, Laptops</td>
            <td rowspan="2">${electronics.computers_accessories}%</td>
        </tr>
        
        <tr>
            <td>All Others</td>
        </tr>

        <tr>
            <td>Gaming & Consoles</td>
            <td>All</td>
            <td>${electronics.gaming_consoles}%</td>
        </tr>`;

    const nonElectronicsRow = `
        <tr>
            <td>Non-Electronics</td>
            <td>All other categories</td>
            <td>All other sub-categories</td>
            <td>${nonElectronics.allCategories}%</td>
        </tr>`;

    tbody.innerHTML = electronicsRows + nonElectronicsRow;
}

// Function to check if the user is an admin
async function checkAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role == 'admin') {
        document.getElementById('admin-section').style.display = 'block';
    }
}

// Function to update commission fee in Firestore
async function updateFee(category, newFee) {
    try {
        const docRef = category === 'nonElectronics' ? doc(db, "CommissionFees", category) : doc(db, "CommissionFees", "Electronics");
        const field = category === 'nonElectronics' ? 'allCategories' : category;

        await updateDoc(docRef, { [field]: newFee });
        alert('Commission fee updated successfully.');
        getCommissionFees(); // Refresh the table
    } catch (error) {
        console.error("Error updating commission fee:", error);
        alert('Failed to update commission fee.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getCommissionFees();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            checkAdmin();
        }
    });

    const updateFeesForm = document.getElementById('update-fees-form');
    updateFeesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const category = document.getElementById('category').value;
        const newFee = parseFloat(document.getElementById('new-fee').value);
        updateFee(category, newFee);
    });
});
