// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
async function getProductData(productId) {
    try {
        const docRef = doc(db, "Products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            updateProductDetail(data);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

// Function to fetch featured product data
async function getFeaturedProductData(productId) {
    try {
        const docRef = doc(db, "featuredProducts", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            updateProductDetail(data);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

// Function to update product details on the page
function updateProductDetail(data) {
    document.getElementById("product-name").textContent = data.name;
    document.getElementById("product-description").textContent = data.description;
    document.getElementById("product-brand").textContent = data.brand;
    document.getElementById("product-price").textContent = data.price;
    document.getElementById("product-category").textContent = data.category;
    document.getElementById("product-quantity").textContent = data.quantity;
    document.getElementById("product-image").src = data.images[0]; // Set main product image
    const thumbnails = document.querySelectorAll(".thumbnail");
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].src = data.images[i];
    }
}

function addToCart(productId, productName, productPrice) {
    // Retrieve cart data from local storage
    let cart = localStorage.getItem('orderData') ? JSON.parse(localStorage.getItem('orderData')) : [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
        // If the product already exists, update its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If the product doesn't exist, add it to the cart
        const product = { id: productId, name: productName, price: productPrice, quantity: 1 };
        cart.push(product);
    }

    // Save the updated cart data back to local storage
    localStorage.setItem('orderData', JSON.stringify(cart));

    console.log('Product added to cart:', productName);
    alert('Added ' + productName + ' to cart!');
}

// Function to update main product image with the clicked thumbnail
function updateMainImage(event) {
    const clickedThumbnail = event.target;
    const mainImage = document.getElementById('product-image');
    mainImage.src = clickedThumbnail.src;
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
    const productId = getParameterByName('id');
    const isFeatured = getParameterByName('featured'); // Assuming there's a parameter to indicate featured products

    // Call the appropriate function based on the product type
    if (isFeatured) {
        getFeaturedProductData(productId);
    } else {
        getProductData(productId);
    }

    // Add event listener to the "Add to Cart" button
    const addToCartButton = document.getElementById('add-to-cart');
    addToCartButton.addEventListener('click', function () {
        const productName = document.getElementById('product-name').textContent;
        const productPrice = document.getElementById('product-price').textContent;
        addToCart(productId, productName, productPrice);
    });

    // Add event listener to the "Buy Now" button
    const buyNowButton = document.getElementById('buy-now');
    if (buyNowButton) {
        buyNowButton.addEventListener('click', function () {
            // Get product details
            const productName = document.getElementById('product-name').textContent;
            const productPrice = document.getElementById('product-price').textContent;

            // Redirect to the payment page with product details
            window.location.href = `../pages/payment.html?productName=${encodeURIComponent(productName)}&productPrice=${encodeURIComponent(productPrice)}`;
        });
    }


    // Add event listener to the cart button to move to the order placement page
    const cartButton = document.querySelector('.cart-button img');
    cartButton.addEventListener('click', function () {
        window.location.href = '/pages/order_placement.html';
    });

    // Add event listener to each thumbnail image
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', updateMainImage);
    });
});
