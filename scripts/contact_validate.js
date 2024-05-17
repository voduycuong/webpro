import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('submit').addEventListener('click', async (e) => {
    e.preventDefault();
    var name = document.getElementById('name').value;
    if (name.length < 3) {
        alert('Name must be at least 3 characters long.');
        return;
    }
    var email = document.getElementById('email').value;
    var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        return;
    }

    var phone = document.getElementById('phone').value;
    var phonePattern = /^[0-9]{9,11}$/;
    if (!phone.match(phonePattern)) {
        alert('Phone number must be a number and 9 to 11 digits long.');
        return;
    }

    var message = document.getElementById('message').value;
    if (message.length < 50 || message.length > 500) {
        alert('Message must be between 50 and 500 characters.');
        return;
    }

    var contactDays = Array.from(document.querySelectorAll('input[name="contactDays[]"]:checked')).map(el => el.value);
    if (contactDays.length < 1) {
        alert('Please select at least one contact day.');
        return;
    }
    var contactPurpose = document.getElementById('contactPurpose').value;
    var contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
    var contactID = Date.now().toString();

    await addDoc(collection(db, "Contact", contactPurpose, "Entries"), {
        id: contactID,
        name: name,
        email: email,
        phone: phone,
        contactMethod: contactMethod,
        contactDays: contactDays,
        message: message
    });
    alert('Sent');
    document.getElementById('contactForm').reset();

});