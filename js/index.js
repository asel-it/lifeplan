import { API_URL } from './config.js';

document.addEventListener("DOMContentLoaded", function () {
    // Проверка Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Error registering Service Worker:', error);
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

     // Анимация текста и изображений
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

    const imageContainer = document.getElementById("image-container");
const textContainer = document.getElementById("text-container");

let currentIndex = 0;

// Функция для отображения картинки
function showImage(src) {
    return new Promise((resolve) => {
        const img = document.createElement("img");
        img.src = src;
        img.onload = () => {
            imageContainer.innerHTML = ""; // Очистка контейнера
            imageContainer.appendChild(img);
            resolve();
        };
    });
}

// Функция для анимации текста
function typeText(text) {
    return new Promise((resolve) => {
        textContainer.innerHTML = ""; // Очистка контейнера
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                textContainer.innerHTML += text[index];
                index++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, 100); // Скорость появления текста (100 мс на символ)
    });
}

// Основной цикл анимации
async function animateSequence() {
    while (true) {
        await showImage(images[currentIndex]); // Показать картинку
        await typeText(texts[currentIndex]);  // Анимация текста
        currentIndex = (currentIndex + 1) % images.length; // Переключение на следующий слайд
    }
}

// Запуск анимации
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
