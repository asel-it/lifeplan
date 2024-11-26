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
    document.addEventListener("DOMContentLoaded", function () {
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
    
        // Функция для анимации текста
        function typeText(text) {
            return new Promise(resolve => {
                let index = 0;
                animationBox.innerHTML = ''; // Очистить предыдущий текст
                animationBox.style.opacity = 1;
                animationBox.style.transform = "translateY(0)";
    
                const typingInterval = setInterval(() => {
                    animationBox.innerHTML += text.charAt(index);
                    index++;
                    if (index === text.length) {
                        clearInterval(typingInterval);
                        setTimeout(resolve, 1500); // Задержка перед переходом к следующей анимации
                    }
                }, 100);
            });
        }
    
        // Функция для показа картинки
        function showImage(imageSrc) {
            return new Promise(resolve => {
                const image = document.createElement('img');
                image.src = imageSrc;
                image.classList.add('image');
                imageContainer.innerHTML = ''; // Очистить предыдущую картинку
                imageContainer.appendChild(image);
    
                // После загрузки картинки плавно сделать её видимой
                image.onload = () => {
                    setTimeout(() => {
                        image.classList.add('visible');
                        resolve();
                    }, 500);
                };
            });
        }
    
        // Функция для запуска анимации
        async function animateSequence() {
            while (true) {
                await showImage(images[currentIndex]);
                await typeText(texts[currentIndex]);
    
                // Переход к следующему индексу (цикличность)
                currentIndex = (currentIndex + 1) % texts.length;
            }
        }
    
        animateSequence(); // Запуск анимации
    });
    

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
