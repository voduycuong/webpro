// Function to retrieve order data from local storage
function getOrderData() {
    const orderStorageKey = 'orderData';
    const data = localStorage.getItem(orderStorageKey);
    return data ? JSON.parse(data) : [];
}

// Show ATM info form when ATM method is selected
document.getElementById('atm-method').addEventListener('change', function () {
    document.getElementById('atm-info').classList.remove('hidden');
});

// Hide ATM info form when Cash method is selected
document.getElementById('cash-method').addEventListener('change', function () {
    document.getElementById('atm-info').classList.add('hidden');
});
// Handle form submission
const confirmPaymentButton = document.getElementById('confirm-payment');
confirmPaymentButton.addEventListener('click', function () {
    // Check if ATM method is selected
    const atmMethod = document.getElementById('atm-method');
    if (atmMethod.checked) {
        // Check if all ATM info fields are filled
        const accountNumber = document.getElementById('account-number').value;
        const accountName = document.getElementById('account-name').value;
        const bankName = document.getElementById('bank-name').value;
        if (!accountNumber || !accountName || !bankName) {
            alert('Please fill in all ATM information fields.');
            return; // Stop form submission
        }
    }

    // If all required fields are filled, proceed with payment confirmation
    alert('Payment confirmed!');
    window.location.href = '/pages/index.html';
});



// Function to display order data on the Payment page
function displayPaymentData() {
    // Retrieve order data from local storage
    const orderData = getOrderData();

    // Find the container element to display the product details
    const paymentDetails = document.getElementById('payment-details');

    // Clear any existing payment details
    paymentDetails.innerHTML = '';

    let overallTotal = 0; // Initialize overall total

    // Display product details for each product in the order data
    orderData.forEach(product => {
        // Calculate total for current product
        const productTotal = product.price * product.quantity;
        overallTotal += productTotal; // Add product total to overall total

        // Create a payment detail item
        const paymentItem = document.createElement('div');
        paymentItem.className = 'payment-item';

        // Display product details including total
        paymentItem.innerHTML = `
            <p><strong>Product:</strong> <span class="product-name">${product.name}</span></p>
            <p><strong>Price ($):</strong> <span class="product-price">${product.price}</span></p>
            <p><strong>Quantity:</strong> <span class="product-quantity">${product.quantity}</span></p>
            <p><strong>Total:</strong> <span class="product-total">${productTotal}</span></p>
        `;

        // Append the payment item to the payment details container
        paymentDetails.appendChild(paymentItem);
    });

    // Display overall total
    const totalAmountElem = document.getElementById('overall-total');
    totalAmountElem.innerText = `$${overallTotal}`;
}

// Call the function to display the payment data when the page loads
window.onload = displayPaymentData;
