// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
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
const storage = getStorage(app);
// Function to handle the file input click events for each frame
function triggerFileInput(index) {
    const fileInput = document.getElementById(`image${index + 1}`);
    fileInput.click(); // Trigger the file input click event
}

// Function to handle file selection and display the images in the frames
function handleFileSelection(event) {
    const fileInput = event.target;
    const frameId = `frame${fileInput.id.slice(-1)}`; // Get the frame ID from the file input ID
    const frame = document.getElementById(frameId);
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        // Load the image and display it in the frame
        reader.onload = function (e) {
            frame.style.backgroundImage = `url(${e.target.result})`;
            frame.style.backgroundSize = 'cover';
            frame.style.backgroundPosition = 'center';
        };

        reader.readAsDataURL(file); // Read the file as a data URL
    }
}

// Add event listeners to the frames and file inputs
document.querySelectorAll('.image-frame').forEach((frame, index) => {
    frame.addEventListener('click', () => triggerFileInput(index));
});

document.querySelectorAll('input[type="file"]').forEach(fileInput => {
    fileInput.addEventListener('change', handleFileSelection);
});


submit.addEventListener('click', async (e) => {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var brand = document.getElementById('brand').value;
    var price = document.getElementById('price').value;
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;
    var quantity = document.getElementById('quantity').value;

    // Get file inputs for images
    var image1 = document.getElementById('image1').files[0];
    var image2 = document.getElementById('image2').files[0];
    var image3 = document.getElementById('image3').files[0];
    var image4 = document.getElementById('image4').files[0];

    // Validate form fields
    if (!name || !brand || !price || !description || !category || !quantity) {
        alert("Please fill in all required fields.");
        return; // Prevent form submission
    }
    console.log('image1:', image1);
    console.log('image2:', image2);
    console.log('image3:', image3);
    console.log('image4:', image4);
    // Validate image count
    if (![image1, image2, image3, image4].every(Boolean)) {
        alert("Please provide exactly 4 images.");
        return; // Prevent form submission
    }

    // Upload images and retrieve their URLs
    var imageUrls = [];
    var images = [image1, image2, image3, image4];

    for (var i = 0; i < images.length; i++) {
        var image = images[i];
        var imageRef = ref(storage, `products/${name}/${image.name}`);
        await uploadBytes(imageRef, image);
        var imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
    }
    await addDoc(collection(db, "Products"), {
        name: name,
        brand: brand,
        price: price,
        description: description,
        category: category,
        quantity: quantity,
        images: imageUrls // Store the image URLs in Firestore
    });
    alert('Added!');
    // Reset the form and clear image frames
    const form = document.getElementById('add-product-form');
    form.reset(); // Reset the form

    // Clear image frames
    document.querySelectorAll('.image-frame').forEach(frame => {
        frame.style.backgroundImage = ''; // Remove background images from frames
    });


});






