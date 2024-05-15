// Get the "Continue Shopping" button element
const continueShoppingButton = document.getElementById('continue-shopping');

// Add click event listener to the button
continueShoppingButton.addEventListener('click', function() {
    // Redirect to the store home page
    window.location.href = '../pages/store_home_page.html';
});

// Get the "Place Order" button element
const orderButton = document.getElementById('place-order');

// Add click event listener to the button
orderButton.addEventListener('click', function() {
    // Redirect to the payment page
    window.location.href = '../pages/payment_in_cart.html';
});

// Constant for order data storage key in local storage
const orderStorageKey = 'orderData';

// Function to retrieve order data from local storage
function getOrderData() {
    const data = localStorage.getItem(orderStorageKey);
    return data ? JSON.parse(data) : [];
}

// Function to save order data to local storage
function saveOrderData(data) {
    localStorage.setItem(orderStorageKey, JSON.stringify(data));
}

function deleteProduct(index) {
    // Retrieve current order data from storage
    let orderData = getOrderData();

    // Remove the product at the specified index
    orderData.splice(index, 1);

    // Save the updated order data back to storage
    saveOrderData(orderData);

    // Refresh the display of order data
    displayOrderData();
}

// Function to display order data on the Order Placement page
function displayOrderData() {
    // Retrieve order data from local storage
    const orderData = getOrderData();

    // Find the container element to display the order data
    const cartSummary = document.getElementById('cart-summary');
    
    // Clear any existing cart items
    cartSummary.innerHTML = '';

    // Calculate the total amount
    let totalAmount = 0;

    // Display product details for each product in the order data
    orderData.forEach((product, index) => {
        // Create a cart item element
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        // Calculate the total price for the current product
        const totalPrice = product.price * product.quantity;

        // Display product details and total price
        cartItem.innerHTML = `
            <span class="product-name">${product.name}</span>
            <span class="product-price">${product.price}</span>
            <input type="number" min="0" value="${product.quantity}" class="quantity-input" onchange="updateQuantity(${index}, this.value)">
            <button class="delete-button" onclick="deleteProduct(${index})"><i class="fas fa-trash"></i></button>
            <span class="total-price">${totalPrice}</span>
        `;

        // Append the cart item to the cart summary container
        cartSummary.appendChild(cartItem);

        // Add the current product's total price to the overall total amount
        totalAmount += totalPrice;
    });

    // Update the total amount displayed
    document.getElementById('total-amount').innerText = `$${totalAmount.toFixed(2)}`;
}

// Function to update the quantity of a product in the order data
function updateQuantity(index, newQuantity) {
    // Retrieve order data from local storage
    let orderData = getOrderData();

    // Update the quantity of the product at the specified index
    orderData[index].quantity = parseInt(newQuantity);

    // Save the updated order data back to storage
    saveOrderData(orderData);

    // Refresh the display of order data
    displayOrderData();
}

// Call the function to display the order data when the page loads
window.onload = displayOrderData;
