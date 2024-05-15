document.addEventListener('DOMContentLoaded', function() {
    // Get product details from URL parameters (if any)
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('productName');
    const productPrice = parseFloat(params.get('productPrice')).toFixed(2);

    // Display product details on the page (if any)
    if (productName) {
        document.getElementById('product-name').textContent = productName;
    }
    if (productPrice) {
        document.getElementById('product-price').textContent = productPrice;
    }

    // Show ATM info form when ATM method is selected
    document.getElementById('atm-method').addEventListener('change', function() {
        document.getElementById('atm-info').classList.remove('hidden');
    });

    // Hide ATM info form when Cash method is selected
    document.getElementById('cash-method').addEventListener('change', function() {
        document.getElementById('atm-info').classList.add('hidden');
    });

    // Handle form submission
    const confirmPaymentButton = document.getElementById('confirm-payment');
    confirmPaymentButton.addEventListener('click', function() {
        alert('Payment confirmed!');
        // You can add your form submission logic here
    });
});
