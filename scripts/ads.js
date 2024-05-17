// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
import { getFirestore, collection, getDocs, addDoc, query, where, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

let isAdmin = false;

// Function to check if the user is an admin
async function checkAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
        isAdmin = true;
        document.getElementById('admin-ads').style.display = 'block';
    } else {
        isAdmin = false;
        document.getElementById('admin-ads').style.display = 'none';
    }
}

// Fetch and display all ads
async function displayAds() {
    const adsCollection = collection(db, 'Ads');
    const adsSnapshot = await getDocs(adsCollection);
    const adsSection = document.getElementById('ads-section');

    adsSection.innerHTML = ''; // Clear the section before adding new ads

    adsSnapshot.forEach((docSnapshot) => {
        const adData = docSnapshot.data();
        const img = document.createElement('img');
        img.src = adData.imageUrl;
        img.alt = "Advertisement";
        img.style.maxWidth = "100%";
        img.style.height = "auto";

        const adContainer = document.createElement('div');
        adContainer.classList.add('ad-container');
        adContainer.appendChild(img);

        if (isAdmin) {
            const deleteButton = document.createElement('button');
            deleteButton.innerText = "Delete";
            deleteButton.onclick = () => deleteAd(docSnapshot.id, adData.fileName);
            adContainer.appendChild(deleteButton);
        }

        adsSection.appendChild(adContainer);
    });
}

// Handle the form submission
document.getElementById('ads-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const file = document.getElementById('ad-image').files[0];
    if (file) {
        checkAndUploadAdImage(file);
    }
});

// Check for duplicate and upload image to Firebase Storage
async function checkAndUploadAdImage(file) {
    const fileName = file.name;
    const storageRef = ref(storage, 'ads/' + fileName);
    const adsCollection = collection(db, 'Ads');

    const adsSnapshot = await getDocs(query(adsCollection, where('fileName', '==', fileName)));
    if (!adsSnapshot.empty) {
        // If a duplicate is found, delete it
        adsSnapshot.forEach(async (docSnapshot) => {
            const adData = docSnapshot.data();
            const adRef = doc(db, 'Ads', docSnapshot.id);
            const adStorageRef = ref(storage, 'ads/' + adData.fileName);

            await deleteDoc(adRef); // Delete Firestore document
            await deleteObject(adStorageRef); // Delete the file in Storage
        });
    }

    // Proceed with upload
    uploadAdImage(file, fileName);
}

// Upload image to Firebase Storage
function uploadAdImage(file, fileName) {
    const storageRef = ref(storage, 'ads/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error('Upload failed', error);
        },
        () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                saveAdImageURL(downloadURL, fileName);
            });
        }
    );
}

// Save the image URL to Firestore
function saveAdImageURL(url, fileName) {
    const adsCollection = collection(db, 'Ads');
    addDoc(adsCollection, {
        imageUrl: url,
        fileName: fileName,
        timestamp: new Date()
    }).then(() => {
        console.log('Ad image URL saved successfully');
        displayAds(); // Refresh the ads display
    }).catch((error) => {
        console.error('Error saving ad image URL', error);
    });
}

// Delete ad from Firestore and Storage
async function deleteAd(docId, fileName) {
    try {
        const adRef = doc(db, 'Ads', docId);
        const adStorageRef = ref(storage, 'ads/' + fileName);

        await deleteDoc(adRef); // Delete Firestore document
        await deleteObject(adStorageRef); // Delete the file in Storage

        console.log('Ad deleted successfully');
        displayAds(); // Refresh the ads display
    } catch (error) {
        console.error('Error deleting ad:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            checkAdmin().then(() => {
                displayAds();
            });
        } else {
            displayAds();
        }
    });
});
