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

// Function to delete a product from the cart
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
        cartItem.setAttribute('data-price', product.price);

        // Create a quantity input and add an event listener
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '0';
        quantityInput.value = product.quantity;
        quantityInput.className = 'quantity-input';
        
        // Add event listener to handle quantity change
        quantityInput.addEventListener('change', (event) => {
            // Get the new quantity
            const newQuantity = parseInt(event.target.value);
            
            // Update the product quantity in order data
            orderData[index].quantity = newQuantity;
            
            // Save the updated order data back to storage
            saveOrderData(orderData);
            
            // Refresh the total amount displayed
            updateTotalAmount();
        });

        // Add product details and quantity input
        cartItem.innerHTML = `
            <span class="product-name">${product.name}</span>
            <span class="product-price">$${product.price.toFixed(2)}</span>
        `;
        cartItem.appendChild(quantityInput);

        // Create the delete button with a trash icon
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>'; // Trash icon
        deleteButton.onclick = () => deleteProduct(index);

        // Append the delete button to the cart item
        cartItem.appendChild(deleteButton);

        // Append the cart item to the cart summary container
        cartSummary.appendChild(cartItem);

        // Calculate the total amount based on the product's price and quantity
        totalAmount += product.price * product.quantity;
    });

    // Update the total amount displayed
    document.getElementById('total-amount').innerText = `$${totalAmount.toFixed(2)}`;
}

// Function to update the total amount displayed
function updateTotalAmount() {
    // Retrieve order data from local storage
    const orderData = getOrderData();

    // Calculate the total amount
    let totalAmount = 0;
    orderData.forEach((product) => {
        totalAmount += product.price * product.quantity;
    });

    // Update the total amount displayed
    document.getElementById('total-amount').innerText = `$${totalAmount.toFixed(2)}`;
}

// Call the function to display the order data when the page loads
window.onload = displayOrderData;