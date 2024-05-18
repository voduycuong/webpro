import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async function() {
    const storeNameElement = document.getElementById('storeName');
    const productListElement = document.getElementById('productList');

    // Retrieve the store name from localStorage
    const storeName = localStorage.getItem('storeName');

    // Display the store name
    if (storeName) {
        storeNameElement.textContent = storeName;
    } else {
        storeNameElement.textContent = 'Store Name not found';
        return;
    }

    try {
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

        // Initialize Firestore
        const db = getFirestore(app);

        // Reference to the Products collection
        const productsCollection = collection(db, 'Products');

        // Query to get products with the brand equal to storeName
        const q = query(productsCollection, where('brand', '==', storeName));
        const querySnapshot = await getDocs(q);

        // Clear the product list
        productListElement.innerHTML = '';

        // Display each product
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <button class="delete-button" data-id="${doc.id}">
                    <i class="fas fa-trash-alt">Delete</i>
                </button>
            `;

            productListElement.appendChild(productElement);
        });

        // Handle delete button clicks
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const productId = button.dataset.id;
                try {
                    // Delete product from Firestore
                    await deleteDoc(doc(productsCollection, productId));
                    // Remove product element from UI
                    button.closest('.product').remove();
                } catch (error) {
                    console.error('Error deleting product: ', error);
                }
            });
        });

        // Handle case where no products match the brand
        if (querySnapshot.empty) {
            productListElement.innerHTML = '<p>No products found for this store.</p>';
        }
    } catch (error) {
        console.error('Error fetching products: ', error);
        productListElement.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const addProductButton = document.getElementById('addProductButton');

    addProductButton.addEventListener('click', function() {
        // Redirect to the add product page
        window.location.href = '/pages/add_product.html';
    });

});
