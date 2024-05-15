function showModal(memberName, memberInfo) {
    const modal = document.getElementById('modal');
    const memberNameElement = document.getElementById('member-name');
    const memberInfoElement = document.getElementById('member-info');

    memberNameElement.textContent = memberName;
    memberInfoElement.textContent = memberInfo;

    modal.style.display = 'block';
    document.body.classList.add('dimmed');
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.classList.remove('dimmed');
}

// Insert header and footer
document.addEventListener("DOMContentLoaded", function () {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            const hamburger = document.getElementById('hamburger-menu');
            const navLinks = document.getElementById('nav-links');

            hamburger.addEventListener('click', () => {
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                } else {
                    navLinks.style.display = 'flex';
                }
            });
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});