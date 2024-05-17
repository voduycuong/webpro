const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

        header {
            font-family: "Lato", sans-serif;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #0E46A3;
            padding: 0 30px;
            height: 100px;
        }

        .web-name {
            width: auto;
            flex-grow: 1;
            text-align: center;
        }

        .web-name p {
            color: white;
            white-space: nowrap;
            font-size: 40px;
            font-weight: bold;
            margin: 0;
        }

        .logo img {
            width: 80px;
            padding: 5px;
        }

        .hamburger {
            display: none; /* Hide by default, can be shown with media queries for smaller screens */
        }

        nav {
            display: flex;
            align-items: center;
        }

        ul {
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex; /* Display as flex for horizontal alignment */
            align-items: center; /* Center align items vertically */
        }

        ul li {
            margin: 0 15px; /* Adjusted margin for better spacing */
        }

        a {
            font-weight: 700;
            color: #fff;
            text-decoration: none;
        }

        a:hover {
            padding-bottom: 5px;
            box-shadow: inset 0 -2px 0 0 #fff;
        }

        @media only screen and (max-width: 767px) {
            .hamburger {
                display: block; /* Show hamburger menu on smaller screens */
            }

            nav ul {
                display: none; /* Hide the nav links by default on smaller screens */
                flex-direction: column; /* Stack items vertically */
                position: absolute;
                top: 60px; /* Adjust position below header */
                right: 0;
                background-color: #0a0a23;
                width: 100%;
                padding: 20px 0;
            }

            nav ul li {
                margin: 10px 0; /* Adjust margin for vertical spacing */
            }

            nav ul.show {
                display: flex; /* Show nav links when hamburger menu is clicked */
            }
        }

    </style>

    <header>
        <div class="logo">
            <img src="../img/mall_logo.png" alt="Mall Logo">
        </div>

        <div class="web-name">
            <p>BLUE GAME</p>
        </div>

        <div class="hamburger" id="hamburger-menu">
            <div></div>
            <div></div>
            <div></div>
        </div>

        <nav>
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/pages/about_us.html">About Us</a></li>
                <li><a href="/pages/fees.html">Fees</a></li>
                <li id="account"><a href="/pages/login.html">My Account</a></li>
                <li id="browse"><a href="/pages/browse.html">Browse</a></li>
                <li><a href="/pages/faq.html">FAQs</a></li>
                <li><a href="/pages/contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

`;

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });

        shadowRoot.appendChild(headerTemplate.content);

        // Retrieve user information from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const accountElement = shadowRoot.getElementById('account');
            if (accountElement) {
                accountElement.innerHTML = `<a href="../pages/user_profile.html">${user.displayName || 'Profile'}</a>`;
            }
        }
    }
}

customElements.define('header-component', Header);
