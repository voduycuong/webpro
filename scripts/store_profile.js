// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// Function to fetch product data
async function getStoreProfileData(storeId) {
    try {
        const docRef = doc(db, "Stores", storeId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            updateStoreProfile(data);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

// Function to update product details on the page
function updateStoreProfile(data) {
    document.getElementById("store-name").textContent = data.name;

    // Update product image and thumbnails (assuming you have the image URLs in the 'images' array)
    document.getElementById("store-image").src = data.image; // Set main product image

}
// Function to extract URL parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.addEventListener('DOMContentLoaded', function () {
    // Get product ID from URL parameter
    const storeId = getParameterByName('id');

    // Call getProductData function with the product ID
    getStoreProfileData(storeId);

});
// Function to fetch product data
async function fetchProducts() {
    const productsRef = collection(db, 'Products');
    const productsSnapshot = await getDocs(productsRef);
    productsSnapshot.forEach(doc => {
        const data = doc.data();
        displayProduct(data, doc.id); // Pass along the document ID as well
    });
}

// Function to display product on the page
function displayProduct(product, productId) {
    const storeName = document.getElementById("store-name").textContent;

    // Check if the product's brand matches the store's name
    if (product.brand === storeName) {
        // Create product element
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.style.width = '200px'; // Set fixed width for product container
        productElement.style.height = 'auto'; // Allow height to adjust

        // Create anchor element for linking to product detail page
        const productLink = document.createElement('a');
        productLink.href = `../pages/product_detail.html?id=${productId}`; // Pass along the document ID as a URL parameter
        productLink.style.textDecoration = 'none'; // Remove default underline style

        // Create image element
        const imageElement = document.createElement('img');
        imageElement.src = product.images[0];
        imageElement.alt = product.name + ' Image';
        imageElement.style.width = '100%'; // Set image width to fill the container
        imageElement.style.height = '180px'; // Maintain aspect ratio

        // Append image element to the product link
        productLink.appendChild(imageElement);

        // Append product link to product container
        productElement.appendChild(productLink);

        // Create and append other product details
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('product-details');

        // Product name
        const nameElement = document.createElement('p');
        nameElement.classList.add('product-name');
        nameElement.textContent = product.name;

        // Product price
        const priceElement = document.createElement('p');
        priceElement.classList.add('product-price');
        priceElement.textContent = '$' + product.price;

        // Product brand
        const brandElement = document.createElement('p');
        brandElement.classList.add('product-brand');
        brandElement.textContent = product.brand;

        // Append details to the details container
        detailsContainer.appendChild(nameElement);
        detailsContainer.appendChild(priceElement);
        detailsContainer.appendChild(brandElement);

        // Append details container to product container
        productElement.appendChild(detailsContainer);

        // Append product to the "New Products" section
        const newProductsSection = document.getElementById('product-section');
        newProductsSection.appendChild(productElement);
    }
}

// Fetch products when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchProducts);

// Function to display store information
function displayStoreInfo() {
    const storeName = getParameterByName('storeName');
    const storeImage = getParameterByName('storeImage');

    console.log("storeName:", storeName);
    console.log("storeImage:", storeImage);

    // Display store name
    const storeNameElement = document.getElementById('store-name');
    if (storeNameElement) {
        storeNameElement.textContent = storeName;
    } else {
        console.error("Element with ID 'store-name' not found");
    }

    // Display store image
    const storeImageElement = document.getElementById('store-image');
    if (storeImageElement) {
        storeImageElement.src = storeImage;
        storeImageElement.alt = storeName; // Optionally set alt text for accessibility
    } else {
        console.error("Element with ID 'store-image' not found");
    }
}

// Call the displayStoreInfo function when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayStoreInfo();
});

