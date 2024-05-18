const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');


        header {
            font-family: "Lato", sans-serif;
            background-color: #0E46A3;
            color: white;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 1;
            text-align: center;
        }

        .web-name {
            width: auto;
            flex-grow: 1;
            text-align: center;
        }

        .web-name p {
            white-space: nowrap;
            font-size: 40px;
            font-weight: bold;
            margin: 0;
        }

        .nav-links {
            display: none;
            width: 100%;
            position: absolute;
            top: 100%;
            /* Position the menu below the header */
            left: 0;
            background-color: #0E46A3;
            text-align: center;
            justify-content: center;
        }

        .nav-links.show {
            display: flex;
            flex-direction: column;
            background-color: #0E46A3;
        }

        .nav-links nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .nav-links nav ul li {
            margin: 10px 0;
        }

        .nav-links nav ul li a {
            color: white;
            text-decoration: none;
        }

        .logo img {
            width: 100px;
            height: 100px;
            border-radius: 30%;
            padding: 10px;
        }

        .hamburger {
            display: flex;
            flex-direction: column;
            cursor: pointer;
        }

        .hamburger div {
            width: 30px;
            height: 3px;
            background-color: white;
            margin: 5px 0;
        }

        nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        nav ul li {
            display: inline-block;
            margin-right: 20px;
        }

        nav ul li:last-child {
            margin-right: 0;
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

        @media only screen and (min-width: 767px) {
            .hamburger {
                display: none;
            }

            .nav-links {
                display: flex;
                position: static;
                text-align: left;
                justify-content: flex-end;
            }

            .nav-links nav ul {
                flex-direction: row;
                align-items: center;
                background-color: transparent;
            }

            .nav-links nav ul li {
                margin-right: 20px;
            }

            .nav-links nav ul li:last-child {
                margin-right: 0;
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

        <div class="nav-links" id="nav-links">
            <nav>
                <ul>
                    <li><a href="/pages/store_home_page.html">Home</a></li>
                    <li><a href="/pages/about_us.html">About Us</a></li>
                    <li><a href="/pages/fees.html">Fees</a></li>
                    <li><a href="/pages/login.html">My Account</a></li>
                    <li id="browse"><a href="/pages/browse.html">Browse</a></li>
                    <li><a href="/pages/faq.html">FAQs</a></li>
                    <li><a href="/pages/contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
`;

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(headerTemplate.content);

        const hamburger = shadowRoot.getElementById('hamburger-menu');
        const navLinks = shadowRoot.getElementById('nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const accountElement = shadowRoot.querySelector('nav ul li:nth-child(4)');
            if (accountElement) {
                accountElement.innerHTML = `<a href="../pages/user_profile.html">${user.displayName || 'Profile'}</a>`;
            }
        }
    }
}

customElements.define('header-component', Header);