// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth(app);
const database = getDatabase(app);

// Parse CSV data
function parseCSV(csv) {
    const lines = csv.split('\n');
    const data = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const entry = {};

        for (let j = 0; j < headers.length; j++) {
            entry[headers[j]] = values[j];
        }

        data.push(entry);
    }

    return data;
}

function populateDropdown(data) {
    const select = document.querySelector('#country');

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.Code;
        option.textContent = item.Name;
        select.appendChild(option);
    });
}

// Fetch CSV data
fetch('countries_code.csv')
    .then(response => response.text())
    .then(csv => {
        const data = parseCSV(csv);
        populateDropdown(data);
    })
    .catch(error => console.error('Error fetching CSV data:', error));


const storeOwnerRadio = document.querySelector('#storeOwner');
const storeFieldsDiv = document.querySelector('#storeFields');

storeOwnerRadio.addEventListener('change', function () {
    if (this.checked) {
        storeFieldsDiv.style.display = 'block';
    } else {
        storeFieldsDiv.style.display = 'none';
    }
});

// Set up register function 
function register() {
    // Getting all objects from html
    email =document.getElementById("email").value
    phone =document.getElementById("phone").value
    password =document.getElementById("password").value
    confirmPassword =document.getElementById("confirmPassword").value
    profilePicture =document.getElementById("profilePicture").value
    firstName =document.getElementById("firstName").value
    lastName =document.getElementById("lastName").value
    address =document.getElementById("address").value
    city =document.getElementById("city").value
    zipcode =document.getElementById("zipcode").value
    country =document.getElementById("country").value
    businessName =document.getElementById("businessName").value
    storeName =document.getElementById("storeName").value
    storeCategory =document.getElementById("storeCategory").value

    //  Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) { 
        alert('Email or password is incorrect!!')
        return
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    if (validate_field(phone) == false || validate_field(firstName) == false || validate_field(lastName) == false || validate_field(address) == false || validate_field(zipcode) == false || validate_field(zipcode) == false || validate_field(country) == false || validate_field(businessName) == false || validate_field(storeName) == false || validate_field(storeCategory) == false) {
        alert('Please fill in all fields!!')
        return 
    }

    auth.createUserWithEmailAndPassword(email, password, confirmPassword)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser
        // Add the user to the Firebase
        var database_ref = database.ref()
        // create a new user database
        var user_data = {
            email: email,
            phone: phone,
            profilePicture: profilePicture,
            firstName: firstName,
            lastName: lastName,
            address: address,
            zipcode: zipcode,
            country: country,
            last_login: Date.now(),
        }

        database_ref.child('users/' + user.uid).set(user_data)
        // Done register
        alert('User created!!')
        // Forward to Login
        window.location.href = "/pages/login.html";
    })

    .catch(function(error) {

        var error_code = error.code
        var errorMessage = error.message

        alert(error_message)
    })

}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);  // https://masteringjs.io/tutorials/fundamentals/email-validation
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}