// shopping-cart.js

// Initialize an empty array to store the cart items
const cartItems = [];

// Function to add a product to the cart
function addToCart(productName, price, quantity) {
    const newProduct = {
        name: productName,
        price: price,
        quantity: quantity
    };
    cartItems.push(newProduct);
    renderCartItems(); // Call the function to render cart items
    updateTotalPrice();
}

// Function to render cart items
function renderCartItems() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = ''; // Clear existing cart items
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <label>Product Name: <span class="product-name">${item.name}</span></label>
            <label>Price: $<span class="product-price">${item.price.toFixed(2)}</span></label>
            <label>Quantity: <input type="number" class="product-quantity" value="${item.quantity}" min="1"></label>
            <button class="delete-product" data-product-name="${item.name}">X</button>
        `;
        cartElement.appendChild(cartItemElement);
    });
    // Add event listeners for quantity inputs
    document.querySelectorAll('.product-quantity').forEach((input, index) => {
        input.addEventListener('change', (event) => {
            const newQuantity = parseInt(event.target.value);
            updateQuantity(cartItems[index].name, newQuantity);
        });
    });
}

// Function to update the quantity of a product in the cart
function updateQuantity(productName, newQuantity) {
    const productToUpdate = cartItems.find(item => item.name === productName);
    if (productToUpdate) {
        productToUpdate.quantity = newQuantity;
        renderCartItems();
        updateTotalPrice();
    }
}

// Function to calculate and update the total price
function updateTotalPrice() {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('total-price-value').textContent = total.toFixed(2);
}

// Function to remove a product from the cart
function removeProduct(productName) {
    const productIndex = cartItems.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cartItems.splice(productIndex, 1); // Remove the product from the cart
        renderCartItems(); // Re-render the cart items
        updateTotalPrice(); // Update the total price
    }
}

// Inside the existing event listener for the "X" button:
document.querySelectorAll('.delete-product').forEach(button => {
    button.addEventListener('click', function(event) {
        const productNameToDelete = event.target.getAttribute('data-product-name');
        removeProduct(productNameToDelete);
    });
});

// Handle form submission to add a new product
document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const productQuantity = parseInt(document.getElementById('product-quantity').value);
    addToCart(productName, productPrice, productQuantity);
    // Clear form inputs
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-quantity').value = '1';
});

// Handle order placement
document.getElementById('place-order').addEventListener('click', function() {
    alert('Thank you for your order!');
    // Redirect to Thank You page or handle order logic
});

// Handle continue shopping
document.getElementById('continue-shopping').addEventListener('click', function() {
    // Redirect to shopping page or handle logic
});

// Initial total price update
updateTotalPrice();



