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

async function fetchProducts() {
    const productsRef = collection(db, 'Products');
    const productsSnapshot = await getDocs(productsRef);
    productsSnapshot.forEach(doc => {
        const data = doc.data();
        allProducts.push({ data, id: doc.id });
    });
    displayInitialProducts();
}

function displayInitialProducts() {
    const newProductsSection = document.getElementById('new-products');
    newProductsSection.innerHTML = ''; // Clear existing products
    displayedProducts = 0;

    for (let i = 0; i < Math.min(productsPerPage, allProducts.length); i++) {
        const { data, id } = allProducts[i];
        const productElement = displayProduct(data, id);
        newProductsSection.appendChild(productElement);
        displayedProducts++;
    }

    createViewButtons();
}

// Function to fetch featured product data
async function fetchFeaturedProducts() {
    const productsRef = collection(db, 'featuredProducts');
    const productsSnapshot = await getDocs(productsRef);
    productsSnapshot.forEach(doc => {
        const data = doc.data();
        console.log('Featured Product:', data); // Debugging line
        displayFeaturedProduct(data, doc.id); // Pass along the document ID as well
    });
}

// Function to fetch store data
async function fetchStores() {
    const storesRef = collection(db, 'Stores');
    const storesSnapshot = await getDocs(storesRef);
    storesSnapshot.forEach(doc => {
        const data = doc.data();
        displayStore(data, doc.id); // Pass along the store data
    });
}

// Function to fetch featured store data
async function fetchFeaturedStores() {
    const storesRef = collection(db, 'Stores');
    const storesSnapshot = await getDocs(storesRef);
    storesSnapshot.forEach(doc => {
        const data = doc.data();
        displayFeaturedStore(data, doc.id); // Pass along the store data
    });
}

let displayedProducts = 0;
const productsPerPage = 10;
let allProducts = [];

function displayProduct(product, productId) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.style.width = '200px';
    productElement.style.height = 'auto';

    const productLink = document.createElement('a');
    productLink.href = `product_detail.html?id=${productId}`;
    productLink.style.textDecoration = 'none';

    const imageElement = document.createElement('img');
    imageElement.src = product.images[0];
    imageElement.alt = product.name + ' Image';
    imageElement.style.width = '100%';
    imageElement.style.height = '180px';

    productLink.appendChild(imageElement);
    productElement.appendChild(productLink);

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('product-details');

    const nameElement = document.createElement('p');
    nameElement.classList.add('product-name');
    nameElement.textContent = product.name;

    const priceElement = document.createElement('p');
    priceElement.classList.add('product-price');
    priceElement.textContent = '$' + product.price;

    const brandElement = document.createElement('p');
    brandElement.classList.add('product-brand');
    brandElement.textContent = product.brand;

    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(priceElement);
    detailsContainer.appendChild(brandElement);

    productElement.appendChild(detailsContainer);

    return productElement;
}

// Function to display featured product on the page
function displayFeaturedProduct(product, productId) {
    // Create product element
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.style.width = '200px';
    productElement.style.height = 'auto';

    // Create anchor element for linking to product detail page
    const productLink = document.createElement('a');
    productLink.href = `product_detail.html?id=${productId}&featured=true`;
    productLink.style.textDecoration = 'none';

    // Create image element
    const imageElement = document.createElement('img');
    imageElement.src = product.images[0];
    imageElement.alt = product.name + ' Image';
    imageElement.style.width = '100%';
    imageElement.style.height = '180px';

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
    const featuredProductsSection = document.getElementById('featured-products');
    featuredProductsSection.appendChild(productElement);
}

// Function to display store on the page
function displayStore(store, storeId) {
    const storeElement = document.createElement('div');
    storeElement.classList.add('store');

    const storeLink = document.createElement('a');
    storeLink.href = `store_profile.html?id=${storeId}`;
    storeLink.style.textDecoration = 'none';

    const imageElement = document.createElement('img');
    imageElement.src = store.image;
    imageElement.alt = store.name + ' Image';

    storeLink.appendChild(imageElement);
    storeElement.appendChild(storeLink);

    const storesContainer = document.createElement('div');
    storesContainer.classList.add('store-profiles');

    const nameElement = document.createElement('p');
    nameElement.classList.add('store-name');
    nameElement.textContent = store.name;
    nameElement.style.fontWeight = 'bold';

    storesContainer.appendChild(nameElement);
    storeElement.appendChild(storesContainer);

    const newStoresSection = document.getElementById('new-stores');
    newStoresSection.appendChild(storeElement);
}

// Function to display featured store on the page
function displayFeaturedStore(store, storeId) {
    const storeElement = document.createElement('div');
    storeElement.classList.add('store');

    const storeLink = document.createElement('a');
    storeLink.href = `store_profile.html?id=${storeId}`;
    storeLink.style.textDecoration = 'none';

    const imageElement = document.createElement('img');
    imageElement.src = store.image;
    imageElement.alt = store.name + ' Image';

    storeLink.appendChild(imageElement);
    storeElement.appendChild(storeLink);

    const storesContainer = document.createElement('div');
    storesContainer.classList.add('store-profiles');

    const nameElement = document.createElement('p');
    nameElement.classList.add('store-name');
    nameElement.textContent = store.name;
    nameElement.style.fontWeight = 'bold';

    storesContainer.appendChild(nameElement);
    storeElement.appendChild(storesContainer);

    const featuredStoresSection = document.getElementById('featured-stores');
    featuredStoresSection.appendChild(storeElement);
}

function createViewButtons() {
    const newProductsSection = document.getElementById('new-products');
    const viewMoreButton = document.createElement('button');
    const viewLessButton = document.createElement('button');

    viewMoreButton.textContent = 'View More';
    viewMoreButton.id = 'view-more';
    viewMoreButton.onclick = viewMoreProducts;

    viewLessButton.textContent = 'View Less';
    viewLessButton.id = 'view-less';
    viewLessButton.onclick = viewLessProducts;
    viewLessButton.style.display = 'none';

    newProductsSection.appendChild(viewMoreButton);
    newProductsSection.appendChild(viewLessButton);
}

function viewMoreProducts() {
    const newProductsSection = document.getElementById('new-products');
    for (let i = displayedProducts; i < Math.min(displayedProducts + productsPerPage, allProducts.length); i++) {
        const { data, id } = allProducts[i];
        const productElement = displayProduct(data, id);
        newProductsSection.insertBefore(productElement, document.getElementById('view-more'));
    }
    displayedProducts += productsPerPage;

    if (displayedProducts >= allProducts.length) {
        document.getElementById('view-more').style.display = 'none';
    }
    document.getElementById('view-less').style.display = 'inline';
}

function viewLessProducts() {
    const newProductsSection = document.getElementById('new-products');
    while (displayedProducts > productsPerPage) {
        newProductsSection.removeChild(newProductsSection.children[displayedProducts - 1]);
        displayedProducts--;
    }

    if (displayedProducts <= productsPerPage) {
        document.getElementById('view-less').style.display = 'none';
    }
    document.getElementById('view-more').style.display = 'inline';
}


// Fetch products, featured products, stores, and featured stores when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchFeaturedProducts();
    fetchStores();
    fetchFeaturedStores();

    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });

    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
});

// Get the "Continue Shopping" button element
const continueShoppingButton = document.getElementById('browse');

// Add click event listener to the button
continueShoppingButton.addEventListener('click', function () {
    window.location.href = '../pages/browse.html';
});
