// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


document.addEventListener('DOMContentLoaded', () => {
  const viewMoreBtn = document.getElementById('view-more-btn');
  const showLessBtn = document.getElementById('show-less-btn');
  const productsContainer = document.querySelector('.product-section');
  const productsToShowInitially = 20; // Number of products to show initially
  let allProducts = []; // Array to hold all products
  let productsDisplayed = 0; // Counter to keep track of displayed products

  async function fetchProducts() {
    const productsRef = collection(db, 'Products');
    const productsSnapshot = await getDocs(productsRef);
    allProducts = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Initially display only the first 20 products
    displayProducts(productsToShowInitially);
  }

  function displayProducts(count) {
    // Clear the container first
    productsContainer.innerHTML = '';

    // Display products up to the specified count or the total number of products, whichever is smaller
    for (let i = 0; i < count && i < allProducts.length; i++) {
      const product = allProducts[i];
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    }

    productsDisplayed = count;

    // Show the "View More" button if there are more products to display
    if (productsDisplayed < allProducts.length) {
      viewMoreBtn.style.display = 'block';
      showLessBtn.style.display = 'none';
    } else {
      viewMoreBtn.style.display = 'none';
      showLessBtn.style.display = 'block';
    }
  }

  function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.style.width = '200px'; // Set fixed width for product container
    productElement.style.height = 'auto'; // Allow height to adjust

    const productLink = document.createElement('a');
    productLink.href = `product_detail.html?id=${product.id}`;
    productLink.style.textDecoration = 'none';

    const imageElement = document.createElement('img');
    imageElement.src = product.images[0];
    imageElement.alt = `${product.name} Image`;
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
    priceElement.textContent = `$${product.price}`;

    const brandElement = document.createElement('p');
    brandElement.classList.add('product-brand');
    brandElement.textContent = product.brand;

    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(priceElement);
    detailsContainer.appendChild(brandElement);
    productElement.appendChild(detailsContainer);

    return productElement;
  }

  viewMoreBtn.addEventListener('click', () => {
    // Display all remaining products
    displayProducts(allProducts.length);
  });

  showLessBtn.addEventListener('click', () => {
    // Display only the initial set of products
    displayProducts(productsToShowInitially);
  });

  fetchProducts();
});

// Function to fetch store data
async function fetchStores() {
  const storesRef = collection(db, 'Stores');
  const storesSnapshot = await getDocs(storesRef);
  storesSnapshot.forEach(doc => {
      const data = doc.data();
      displayStore(data); // Pass along the store data
  });
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

// Insert header and footer
document.addEventListener("DOMContentLoaded", function () {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            const hamburger = document.getElementById('hamburger-menu');
            const navLinks = document.getElementById('nav-links');

            hamburger.addEventListener('click', () => {
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                } else {
                    navLinks.style.display = 'flex';
                }
            });
        });
      });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });

    // Fetch products when the DOM content is loaded
    fetchProducts();

    // Fetch stores when the DOM content is loaded
    fetchStores();

    // Get the "Continue Shopping" button element
    const continueShoppingButton = document.getElementById('browse');

// Add click event listener to the button
continueShoppingButton.addEventListener('click', function() {
  // Redirect to the store home page
  window.location.href = '../pages/browse.html';
});
