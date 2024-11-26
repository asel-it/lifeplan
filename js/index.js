import { API_URL } from 'js/config.js';

document.addEventListener("DOMContentLoaded", function () {

    // Service Worker Registration
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
    }

    // Menu toggle functionality
    const menuIcon = document.getElementById("menu-icon");
    const sideMenu = document.getElementById("side-menu");
    const content = document.getElementById("content");
    menuIcon.addEventListener("click", function () {
        sideMenu.classList.toggle("open");
        content.classList.toggle("menu-open");
    });

    // Close menu when clicking outside of it
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

    // Sign out function
    function signOut() {
        localStorage.removeItem('isAuthenticated');
        checkAuthStatus();
    }

    document.addEventListener('DOMContentLoaded', function() {
        checkAuthStatus();
    });

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

    // Chatbot and AI dialogues
    const dialogues = [
        {
            text: "AI: Let's create a plan for your day. What do you need to accomplish?",
            image: "images/image1.jpg"
        },
        {
            text: "AI: Don't forget your meeting at 3 PM.",
            image: "images/image2.jpg"
        },
        {
            text: "AI: How can I assist you with the family event planning?",
            image: "images/image3.jpg"
        }
    ];

    const chatBox = document.getElementById('animation-box');
    const imageContainer = document.getElementById('image-container');

    async function typeText(text, delay) {
        return new Promise(resolve => {
            let index = 0;
            chatBox.innerHTML = '';
            const typingInterval = setInterval(() => {
                chatBox.innerHTML += text.charAt(index);
                index++;
                if (index === text.length) {
                    clearInterval(typingInterval);
                    setTimeout(resolve, delay);
                }
            }, 100);
        });
    }

    async function showDialogues() {
        for (const dialogue of dialogues) {
            // Создание и отображение изображения
            const img = document.createElement('img');
            img.src = dialogue.image;
            img.className = 'image';
            imageContainer.appendChild(img);

            await Promise.all([
                typeText(dialogue.text, 3000),
                new Promise(resolve => {
                    setTimeout(() => {
                        img.classList.add('visible');
                        resolve();
                    }, 0);
                })
            ]);

            // Убираем текст и изображение через 3 секунды
            setTimeout(() => {
                chatBox.innerHTML = '';
                img.classList.remove('visible');
                setTimeout(() => {
                    imageContainer.removeChild(img);
                }, 500);
            }, 3000);

            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        setTimeout(showDialogues, 3000);
    }

    // Запуск анимации
    showDialogues();




   // Modal functions
    function openModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
        }
    }

    function closeModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

});
