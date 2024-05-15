// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
  // Create product element
  const productElement = document.createElement('div');
  productElement.classList.add('product');
  productElement.style.width = '200px'; // Set fixed width for product container
  productElement.style.height = 'auto'; // Allow height to adjust

  // Create anchor element for linking to product detail page
  const productLink = document.createElement('a');
  productLink.href = `product_detail.html?id=${productId}`; // Pass along the document ID as a URL parameter
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
  const newProductsSection = document.getElementById('new-products');
  newProductsSection.appendChild(productElement);
}
// Fetch products when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchProducts);

// Function to fetch product data
async function fetchFeaturedProducts() {
    const productsRef = collection(db, 'featuredProducts');
    const productsSnapshot = await getDocs(productsRef);
    productsSnapshot.forEach(doc => {
        const data = doc.data();
        displayFeaturedProduct(data, doc.id); // Pass along the document ID as well
    });
}

// Function to display product on the page
function displayFeaturedProduct(product, productId) {
  // Create product element
  const productElement = document.createElement('div');
  productElement.classList.add('product');
  productElement.style.width = '200px'; // Set fixed width for product container
  productElement.style.height = 'auto'; // Allow height to adjust

  // Create anchor element for linking to product detail page
  const productLink = document.createElement('a');
  productLink.href = `product_detail.html?id=${productId}`; // Pass along the document ID as a URL parameter
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

  // Append product to the "Featured Products" section
  const newProductsSection = document.getElementById('featured-products');
  newProductsSection.appendChild(productElement);
}
// Fetch products when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchFeaturedProducts);


// Function to fetch store data
async function fetchStores() {
  const storesRef = collection(db, 'Stores');
  const storesSnapshot = await getDocs(storesRef);
  storesSnapshot.forEach(doc => {
      const data = doc.data();
      displayStore(data, doc.id); // Pass along the store data
  });
}


// Function to display product on the page
function displayStore(store, storeId) {
  // Create product element
  const storeElement = document.createElement('div');
  storeElement.classList.add('store');


  // Create anchor element for linking to product detail page
  const storeLink = document.createElement('a');
  storeLink.href = `store_profile.html?id=${storeId}`; // Pass along the document ID as a URL parameter
  storeLink.style.textDecoration = 'none'; // Remove default underline style

  // Create image element
  const imageElement = document.createElement('img');
  imageElement.src = store.image;
  imageElement.alt = store.name + ' Image';
 

  // Append image element to the product link
  storeLink.appendChild(imageElement);

  // Append product link to product container
  storeElement.appendChild(storeLink);

  // Create and append other product details
  const storesContainer = document.createElement('div');
  storesContainer.classList.add('store-profiles');

  // Product name
  const nameElement = document.createElement('p');
  nameElement.classList.add('store-name');
  nameElement.textContent = store.name;
  nameElement.style.fontWeight = 'bold'

  // Append details to the details container
  storesContainer.appendChild(nameElement);


  // Append details container to product container
 storeElement.appendChild(storesContainer);

  // Append product to the "Featured Products" section
  const newStoreSection = document.getElementById('new-stores');
  newStoreSection.appendChild(storeElement);
}
// Fetch products when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchStores);

// Get the "Continue Shopping" button element
const continueShoppingButton = document.getElementById('browse');

// Add click event listener to the button
continueShoppingButton.addEventListener('click', function() {
    // Redirect to the store home page
    window.location.href = '../pages/browse.html';
});

// Function to fetch store data
async function fetchFeaturedStores() {
  const storesRef = collection(db, 'Stores');
  const storesSnapshot = await getDocs(storesRef);
  storesSnapshot.forEach(doc => {
      const data = doc.data();
      displayFearturedStore(data, doc.id); // Pass along the store data
  });
}


// Function to display product on the page
function displayFearturedStore(store, storeId) {
  // Create product element
  const storeElement = document.createElement('div');
  storeElement.classList.add('store');


  // Create anchor element for linking to product detail page
  const storeLink = document.createElement('a');
  storeLink.href = `store_profile.html?id=${storeId}`; // Pass along the document ID as a URL parameter
  storeLink.style.textDecoration = 'none'; // Remove default underline style

  // Create image element
  const imageElement = document.createElement('img');
  imageElement.src = store.image;
  imageElement.alt = store.name + ' Image';
 

  // Append image element to the product link
  storeLink.appendChild(imageElement);

  // Append product link to product container
  storeElement.appendChild(storeLink);

  // Create and append other product details
  const storesContainer = document.createElement('div');
  storesContainer.classList.add('store-profiles');

  // Product name
  const nameElement = document.createElement('p');
  nameElement.classList.add('store-name');
  nameElement.textContent = store.name;
  nameElement.style.fontWeight = 'bold'

  // Append details to the details container
  storesContainer.appendChild(nameElement);


  // Append details container to product container
 storeElement.appendChild(storesContainer);

  // Append product to the "Featured Products" section
  const newStoreSection = document.getElementById('featured-stores');
  newStoreSection.appendChild(storeElement);
}
// Fetch products when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchFeaturedStores);