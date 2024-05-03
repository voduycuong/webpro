// Constant for order data storage key in local storage
const orderStorageKey = 'orderData';

// Function to retrieve order data from storage
function getOrderData() {
    const data = localStorage.getItem(orderStorageKey);
    return data ? JSON.parse(data) : [];
}

// Function to save order data to storage
function saveOrderData(data) {
    localStorage.setItem(orderStorageKey, JSON.stringify(data));
}

// Function to display the flashing message
function displayFlashingMessage() {
    // Retrieve the message element
    const messageElement = document.getElementById('message');
    
    // Remove the 'hidden' class and set display to 'block'
    messageElement.classList.remove('hidden');
    messageElement.style.display = 'block';

    // Hide the message after 3 seconds
    setTimeout(() => {
        messageElement.classList.add('hidden');
        messageElement.style.display = 'none';
    }, 1000);
}

// Function to add the current product details to the order data
function addProductToOrder() {
    // Get product details from the product detail page
    const productName = document.getElementById('product-name').innerText;
    const productPrice = parseFloat(document.getElementById('product-price').innerText.replace('$', ''));
    const productQuantity = 1; // Assuming quantity is 1 for Add to Cart

    // Create a product object with the relevant details
    const product = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
    };

    // Retrieve current order data from storage
    let orderData = getOrderData();

    // Add the product to the order data
    orderData.push(product);

    // Save the updated order data back to storage
    saveOrderData(orderData);

    console.log('Product added to cart:', product);

    // Display the flashing message
    displayFlashingMessage();
}

// Add event listener to the "Add to Cart" button
document.getElementById('add-to-cart').addEventListener('click', addProductToOrder);

// Function to handle the Buy Now action
function buyNow() {
    // Add the current product to the order data
    addProductToOrder();

    // Redirect to the Order Placement page
    window.location.href = 'order_placement.html';
}

// Add event listener to the "Buy Now" button
document.getElementById('buy-now').addEventListener('click', buyNow);

// Array of product images
const productImages = [
    "../img/nike.webp",
    "../img/adidas.jpg",
    "../img/estee_lauder.jpg",
    "../img/yonex.webp"
];

// Function to change the main image when a thumbnail is clicked
function changeMainImage(event) {
    const index = parseInt(event.target.getAttribute('data-index'));
    const mainImage = document.getElementById('product-image');
    mainImage.src = productImages[index];
}

// Add event listeners to the thumbnails
const thumbnails = document.querySelectorAll('.thumbnail');
thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', changeMainImage);
});

// Set the initial main image when the page loads
window.onload = function() {
    document.getElementById('product-image').src = productImages[0];
};


