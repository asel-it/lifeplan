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

// Проверяем состояние авторизации
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    const dashboardLink = document.getElementById('dashboard-link');
    const myPlansLink = document.getElementById('my-plans-link');
    const myProfileLink = document.getElementById('my-profile-link');
    const signUpLoginLink = document.getElementById('sign-up-login-link');
    const signOutLink = document.getElementById('sign-out-link');
    
    // Для авторизованных пользователей показываем ссылки на страницы и ссылку на выход
    if (isAuthenticated) {
        dashboardLink.style.display = 'block';
        myPlansLink.style.display = 'block';
        myProfileLink.style.display = 'block';
        signUpLoginLink.style.display = 'none';
        signOutLink.style.display = 'block';
    } else {
        // Для неавторизованных показываем ссылку на вход и скрываем другие
        dashboardLink.style.display = 'none';
        myPlansLink.style.display = 'none';
        myProfileLink.style.display = 'none';
        signUpLoginLink.style.display = 'block';
        signOutLink.style.display = 'none';
    }
}

// Функция для выхода
function signOut() {
    // Удаляем информацию о том, что пользователь авторизован
    localStorage.removeItem('isAuthenticated');
    // Перезагружаем меню
    checkAuthStatus();
}

// Вызываем функцию при загрузке страницы
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
        { text: "AI: Let's create a plan for your day. What do you need to accomplish?", image: "/images/image1.png" },
        { text: "AI: Don't forget your meeting at 3 PM.", image: "/images/image2.png" },
        { text: "AI: How can I assist you with family event planning?", image: "/images/image3.png" }
    ];
    const chatBox = document.getElementById('animation-box');
    const imageContainer = document.getElementById('image-container');
    const img = document.createElement('img');
    img.className = 'image';
    imageContainer.appendChild(img);


    // Typing effect for dialogues
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


    // Show dialogues with animation
    async function showDialogues() {
        for (const dialogue of dialogues) {
            img.src = dialogue.image;
            img.classList.add('visible');
            await typeText(dialogue.text, 3000);
            setTimeout(() => {
                chatBox.innerHTML = '';
                img.classList.remove('visible');
            }, 3000);
            await new Promise(resolve => setTimeout(resolve, 4000));
        }
        setTimeout(showDialogues, 3000);
    }
    showDialogues();


    // Chat toggle
    const chatContainer = document.getElementById('chat-container');
    const chatIcon = document.getElementById('chatIcon');
    const closeChatBot = document.getElementById('close-chat-bot');
    chatIcon.addEventListener('click', () => {
        chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
    });
    closeChatBot.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });


    // Handle user input
    document.getElementById('sendButton').addEventListener('click', processUserInput);


    async function processUserInput() {
        await sendMessage();
    }


    async function sendMessage() {
        const input = document.getElementById('user-input');
        if (!input) {
            console.error('Input field not found');
            return;
        }


        const inputValue = input.value;
        if (!inputValue) {
            console.error('Input field is empty');
            return;
        }


        try {
            const response = await fetch('https://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: inputValue })
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            const data = await response.json();
            console.log(data.response);


            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML += `<div class="message user-message">${inputValue}</div>`;
            messagesDiv.innerHTML += `<div class="message ai-message">${data.response}</div>`;


            input.value = '';
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

// Функция открытия модального окна
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}


// Функция закрытия модального окна
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}


// Закрытие модального окна при клике за пределами окна
window.onclick = function(event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}


async function processUserInput() {
    const input = document.getElementById('user-input').value;
    if (!input) return;

    try {
        const response = await fetch('http://localhost:3001/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input })
        });
        const data = await response.json();
        document.getElementById('messages').innerHTML += `
            <div class="message user-message">${input}</div>
            <div class="message ai-message">${data.response}</div>
        `;
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('sendButton').addEventListener('click', processUserInput);
});