const { API_URL } = require('./config.js');

document.addEventListener("DOMContentLoaded", function () {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function (registration) {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(function (error) {
                    console.error('Error registering Service Worker:', error);
                });
        });
    } else {
        console.log('Service Workers are not supported in this browser.');
    }

    // Menu toggle functionality
    const menuIcon = document.getElementById("menu-icon");
    const sideMenu = document.getElementById("side-menu");
    const content = document.getElementById("content");

    menuIcon.addEventListener("click", function () {
        sideMenu.classList.toggle("open");
        content.classList.toggle("menu-open");
    });

    window.addEventListener("click", function (event) {
        if (!sideMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            sideMenu.classList.remove("open");
            content.classList.remove("menu-open");
        }
    });

    // Check auth status
    function checkAuthStatus() {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

        const dashboardLink = document.getElementById('dashboard-link');
        const myPlansLink = document.getElementById('my-plans-link');
        const myProfileLink = document.getElementById('my-profile-link');
        const signUpLoginLink = document.getElementById('sign-up-login-link');
        const signOutLink = document.getElementById('sign-out-link');

        if (isAuthenticated) {
            dashboardLink.style.display = 'block';
            myPlansLink.style.display = 'block';
            myProfileLink.style.display = 'block';
            signUpLoginLink.style.display = 'none';
            signOutLink.style.display = 'block';
        } else {
            dashboardLink.style.display = 'none';
            myPlansLink.style.display = 'none';
            myProfileLink.style.display = 'none';
            signUpLoginLink.style.display = 'block';
            signOutLink.style.display = 'none';
        }
    }

    function signOut() {
        localStorage.removeItem('isAuthenticated');
        checkAuthStatus();
    }

    checkAuthStatus();

    // Animating blocks
    const allBlocks = document.querySelectorAll('.large, .small');
    allBlocks.forEach((block, index) => {
        setTimeout(() => {
            block.style.opacity = 1;
            block.style.transform = 'translateY(0)';
        }, index * 300);
    });

    // Update time and date
    function updateTimeAndDate() {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = (hours % 12 || 12).toString().padStart(2, '0');
        document.getElementById('date').textContent = `${day}.${month}.${year}`;
        document.getElementById('time').textContent = `${displayHours}:${minutes}:${seconds} ${ampm}`;
    }
    setInterval(updateTimeAndDate, 1000);

    // Animation-section
    const texts = [
        "AI: Let's create a plan for your day. What do you need to accomplish?",
        "AI: Don't forget your meeting at 3 PM.",
        "AI: How can I assist you with the family event planning?"
    ];

    const images = [
        "images/image1.png",
        "images/image2.png",
        "images/image3.png"
    ];

    const animationBox = document.getElementById('animation-box');
    const imageContainer = document.getElementById('image-container');

    let currentIndex = 0;

    function typeText(text) {
        return new Promise(resolve => {
            let index = 0;
            animationBox.innerHTML = '';
            animationBox.style.opacity = 1;
            const typingInterval = setInterval(() => {
                animationBox.innerHTML += text.charAt(index);
                index++;
                if (index === text.length) {
                    clearInterval(typingInterval);
                    setTimeout(resolve, 1000);
                }
            }, 50);
        });
    }

    function showImage(imageSrc) {
        return new Promise(resolve => {
            const image = document.createElement('img');
            image.src = imageSrc;
            image.classList.add('image');
            imageContainer.innerHTML = '';
            imageContainer.appendChild(image);

            image.onload = () => {
                image.classList.add('visible');
                resolve();
            };
        });
    }

    async function animateSequence() {
        while (true) {
            await showImage(images[currentIndex]);
            await typeText(texts[currentIndex]);
            currentIndex = (currentIndex + 1) % texts.length;
        }
    }

    animateSequence();

    // Modal functions
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "block";
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "none";
    }

    window.onclick = function (event) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    };
});
