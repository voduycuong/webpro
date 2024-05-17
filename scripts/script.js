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
const productsPerPage = 10;
let allProducts = [];

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

    createViewButtons();
}

// Function to fetch featured products
async function fetchFeaturedProducts() {
    const productsRef = collection(db, 'featuredProducts');
    const productsSnapshot = await getDocs(productsRef);
    productsSnapshot.forEach(doc => {
        const data = doc.data();
        displayFeaturedProduct(data, doc.id);
    });
}

// Function to fetch stores
async function fetchStores() {
    const storesRef = collection(db, 'Stores');
    const storesSnapshot = await getDocs(storesRef);
    storesSnapshot.forEach(doc => {
        const data = doc.data();
        displayStore(data, doc.id);
    });
}

// Function to fetch featured stores
async function fetchFeaturedStores() {
    const storesRef = collection(db, 'Stores');
    const storesSnapshot = await getDocs(storesRef);
    storesSnapshot.forEach(doc => {
        const data = doc.data();
        displayFeaturedStore(data, doc.id);
    });
}

function displayProduct(product, productId) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.style.width = '200px';
    productElement.style.height = 'auto';

    const productLink = document.createElement('a');
    productLink.href = `../pages/product_detail.html?id=${productId}`;
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

function displayFeaturedProduct(product, productId) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.style.width = '200px';
    productElement.style.height = 'auto';

    const productLink = document.createElement('a');
    productLink.href = `/pages/product_detail.html?id=${productId}&featured=true`;
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

    const featuredProductsSection = document.getElementById('featured-products');
    featuredProductsSection.appendChild(productElement);
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

    const newStoresSection = document.getElementById('new-stores');
    newStoresSection.appendChild(storeElement);
}

function displayFeaturedStore(store, storeId) {
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
