const footerTemplate = document.createElement('template');

footerTemplate.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

    footer {
      font-family: "Lato", sans-serif;
      height: 60px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #0E46A3;
      color: white;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      align-items: center;
    }
    
    ul li {
      list-style: none;
      display: inline;
    }
    
    a {
      margin: 0 15px;
      color: white;
      text-decoration: none;
      font-weight: 700;
    }
    
    a:hover {
      padding-bottom: 5px;
      box-shadow: inset 0 -2px 0 0 #fff;
    }
    
    .social-row {
      font-size: 20px;
    }
    
    .social-row li a {
      margin: 0 15px;
    }

    .footer-logo img {
      width: 100px;
      padding: 5px;
    }

    .copyright {
      margin: 0;
      font-size: 14px;
    }
  </style>
  <footer class="footer">
    <div class="logo-col">
        <a href="#" class="footer-logo">
            <img class="logo" alt="Blue Game logo" src="../img/mall_logo_no_text.png" />
        </a>
    </div>
    <p class="copyright">
        Copyright &copy; 2024 by Group 4. All rights reserved.
    </p>

    <nav class="nav-col">
        <ul class="footer-nav">
            <li><a class="footer-link" href="/pages/copyright.html">Copyright</a></li>
            <li><a class="footer-link" href="/pages/copyright.html">Terms of Service</a></li>
        </ul>
    </nav>
  </footer>
`;

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const fontAwesome = document.querySelector('link[href*="font-awesome"]');
        const shadowRoot = this.attachShadow({ mode: 'closed' });

        if (fontAwesome) {
            shadowRoot.appendChild(fontAwesome.cloneNode());
        }

        shadowRoot.appendChild(footerTemplate.content);
    }
}

customElements.define('footer-component', Footer);
