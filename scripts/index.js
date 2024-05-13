window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        document.querySelector('.back-to-top').style.display = "block";
    } else {
        document.querySelector('.back-to-top').style.display = "none";
    }
}

function scrollToTop() {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - currentScroll / 10); // Adjust this division factor for smoothness
    }
}

// Insert header and footer
document.addEventListener("DOMContentLoaded", function () {
    fetch('pages/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    fetch('pages/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});