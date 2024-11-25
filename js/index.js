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

    // Function to handle sign-out
    window.signOut = function() {
        // Пример запроса на сервер для выхода
        fetch('https://lifeplan-backend.onrender.com/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.href = '/login.html';  // Redirect to login
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // Fetch example data from backend
    function fetchData() {
        fetch('https://lifeplan-backend.onrender.com/api/data')
            .then(response => response.json())
            .then(data => {
        console.log(data);
        // Пример обработки данных, например, отображение их в интерфейсе
        const aiImage = document.getElementById("aiImage");
        aiImage.src = data.ai_image_url; // Предположим, что сервер отправляет URL изображения для AI
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Запуск функции загрузки данных при загрузке страницы
fetchData();

// Отправка сообщения через чат
const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("user-input");
const messagesContainer = document.getElementById("messages");

sendButton.addEventListener("click", function () {
    const message = userInput.value;
    if (message) {
        addMessageToChat(message, 'user');
        fetch('https://lifeplan-backend.onrender.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            addMessageToChat(data.reply, 'ai');
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
        userInput.value = '';  // Очистить поле ввода
    }
});

// Добавление сообщения в чат
function addMessageToChat(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;  // Прокрутка чата до последнего сообщения
}

// Открытие и закрытие чата
const chatIcon = document.getElementById("chatIcon");
const chatContainer = document.getElementById("chat-container");
const closeChatButton = document.getElementById("close-chat-bot");

chatIcon.addEventListener("click", function () {
    chatContainer.style.display = 'block';  // Показываем чат
});

closeChatButton.addEventListener("click", function () {
    chatContainer.style.display = 'none';  // Закрываем чат
});

// Дополнительные функции для модальных окон (если необходимо)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}
});
