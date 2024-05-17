// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let displayedProducts = 0;
let displayedStores = 0;
let displayedFeaturedStores = 0;
let displayedFeaturedProducts = 0;

const productsPerPage = 10;
const storesPerPage = 5;
const featuredStoresPerPage = 5;
const featuredProductsPerPage = 10;

let allProducts = [];
let allStores = [];
let allFeaturedStores = [];
let allFeaturedProducts = [];

// Function to fetch products
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

    const viewButton = document.getElementById('view-more-less-products');
    viewButton.onclick = () => toggleView(allProducts, newProductsSection, viewButton, productsPerPage, displayProduct);
}

// Function to fetch featured products
async function fetchFeaturedProducts() {
    const productsRef = collection(db, 'featuredProducts');
    const productsSnapshot = await getDocs(productsRef);
    productsSnapshot.forEach(doc => {
        const data = doc.data();
        allFeaturedProducts.push({ data, id: doc.id });
    });
    displayInitialFeaturedProducts();
}

function displayInitialFeaturedProducts() {
    const featuredProductsSection = document.getElementById('featured-products');
    featuredProductsSection.innerHTML = ''; // Clear existing products
    displayedFeaturedProducts = 0;

    for (let i = 0; i < Math.min(featuredProductsPerPage, allFeaturedProducts.length); i++) {
        const { data, id } = allFeaturedProducts[i];
        const productElement = displayProduct(data, id);
        featuredProductsSection.appendChild(productElement);
        displayedFeaturedProducts++;
    }

    const viewButton = document.getElementById('view-more-less-featured-products');
    viewButton.onclick = () => toggleView(allFeaturedProducts, featuredProductsSection, viewButton, featuredProductsPerPage, displayProduct);
}

// Function to fetch stores
async function fetchStores() {
    const storesRef = collection(db, 'Stores');
    const storesSnapshot = await getDocs(storesRef);
    storesSnapshot.forEach(doc => {
        const data = doc.data();
        allStores.push({ data, id: doc.id });
    });
    displayInitialStores();
}

function displayInitialStores() {
    const newStoresSection = document.getElementById('new-stores');
    newStoresSection.innerHTML = ''; // Clear existing stores
    displayedStores = 0;

    for (let i = 0; i < Math.min(storesPerPage, allStores.length); i++) {
        const { data, id } = allStores[i];
        const storeElement = displayStore(data, id);
        newStoresSection.appendChild(storeElement);
        displayedStores++;
    }

    const viewButton = document.getElementById('view-more-less-stores');
    viewButton.onclick = () => toggleView(allStores, newStoresSection, viewButton, storesPerPage, displayStore);
}

// Function to fetch featured stores
async function fetchFeaturedStores() {
    const storesRef = collection(db, 'Stores');
    const storesSnapshot = await getDocs(storesRef);
    storesSnapshot.forEach(doc => {
        const data = doc.data();
        allFeaturedStores.push({ data, id: doc.id });
    });
    displayInitialFeaturedStores();
}

function displayInitialFeaturedStores() {
    const featuredStoresSection = document.getElementById('featured-stores');
    featuredStoresSection.innerHTML = ''; // Clear existing stores
    displayedFeaturedStores = 0;

    for (let i = 0; i < Math.min(featuredStoresPerPage, allFeaturedStores.length); i++) {
        const { data, id } = allFeaturedStores[i];
        const storeElement = displayStore(data, id);
        featuredStoresSection.appendChild(storeElement);
        displayedFeaturedStores++;
    }

    const viewButton = document.getElementById('view-more-less-featured-stores');
    viewButton.onclick = () => toggleView(allFeaturedStores, featuredStoresSection, viewButton, featuredStoresPerPage, displayStore);
}

function toggleView(allItems, section, viewButton, itemsPerPage, displayFunction) {
    if (viewButton.textContent === 'View More') {
        for (let i = section.children.length - 1; i < allItems.length; i++) {
            const { data, id } = allItems[i];
            const itemElement = displayFunction(data, id);
            section.appendChild(itemElement);
        }
        viewButton.textContent = 'View Less';
    } else {
        while (section.children.length > itemsPerPage) {
            section.removeChild(section.lastChild);
        }
        viewButton.textContent = 'View More';
    }
}

function displayProduct(product, productId) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.style.width = '200px';
    productElement.style.height = 'auto';

    const productLink = document.createElement('a');
    productLink.href = `/pages/product_detail.html?id=${productId}`;
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

function displayStore(store, storeId) {
    const storeElement = document.createElement('div');
    storeElement.classList.add('store');

    const storeLink = document.createElement('a');
    storeLink.href = `/pages/store_profile.html?id=${storeId}`;
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

    return storeElement;
}

// Function to fetch ads and display them
async function fetchAds() {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    const adsSnapshot = await getDoc(doc(db, 'Ads', 'ads'));
    if (adsSnapshot.exists()) {
        const adsData = adsSnapshot.data();
        adsData.left.forEach(ad => {
            leftColumn.insertAdjacentHTML('beforeend', `<div class="ad">${ad}</div>`);
        });
        adsData.right.forEach(ad => {
            rightColumn.insertAdjacentHTML('beforeend', `<div class="ad">${ad}</div>`);
        });
    }
}

// Function to add an ad
async function addAd(event) {
    event.preventDefault();

    const adPosition = document.getElementById('adPosition').value;
    const adContent = document.getElementById('adContent').value;

    const adDocRef = doc(db, 'Ads', 'ads');
    const adDocSnapshot = await getDoc(adDocRef);

    let adsData = { left: [], right: [] };

    if (adDocSnapshot.exists()) {
        adsData = adDocSnapshot.data();
    }

    adsData[adPosition].push(adContent);
    await setDoc(adDocRef, adsData);

    alert('Ad added successfully!');
    fetchAds();
}

// Function to delete an ad
async function deleteAd(position, index) {
    const adDocRef = doc(db, 'Ads', 'ads');
    const adDocSnapshot = await getDoc(adDocRef);

    if (adDocSnapshot.exists()) {
        let adsData = adDocSnapshot.data();
        adsData[position].splice(index, 1);
        await setDoc(adDocRef, adsData);
        alert('Ad deleted successfully!');
        fetchAds();
    }
}

// Display ads in admin section with delete buttons
async function displayAdminAds() {
    const adsList = document.getElementById('adsList');
    adsList.innerHTML = '';

    const adsSnapshot = await getDoc(doc(db, 'Ads', 'ads'));
    if (adsSnapshot.exists()) {
        const adsData = adsSnapshot.data();
        adsData.left.forEach((ad, index) => {
            adsList.insertAdjacentHTML('beforeend', `<div>${ad} <button onclick="deleteAd('left', ${index})">Delete</button></div>`);
        });
        adsData.right.forEach((ad, index) => {
            adsList.insertAdjacentHTML('beforeend', `<div>${ad} <button onclick="deleteAd('right', ${index})">Delete</button></div>`);
        });
    }
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        getUserRole(user.uid).then(role => {
            if (role === 'admin') {
                document.getElementById('adminSection').style.display = 'block';
                fetchAds();
                displayAdminAds();
            } else {
                fetchAds();
            }
        });
    } else {
        fetchAds();
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

// Fetch products, featured products, stores, and featured stores when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchFeaturedProducts();
    fetchStores();
    fetchFeaturedStores();
    fetchAds();
});

// Get the "Continue Shopping" button element
const continueShoppingButton = document.getElementById('browse');

// Add click event listener to the button
continueShoppingButton.addEventListener('click', function () {
    window.location.href = '/pages/browse.html';
});

// Add event listener to add ad form
document.getElementById('addAdForm').addEventListener('submit', addAd);
