import { API_URL } from 'js/config.js';

document.addEventListener("DOMContentLoaded", function () {
    // Регистрация Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker зарегистрирован:', reg.scope))
            .catch(err => console.error('Ошибка регистрации Service Worker:', err));
    }

    // Логика бокового меню
    const menuIcon = document.getElementById("menu-icon");
    const sideMenu = document.getElementById("side-menu");
    menuIcon.addEventListener("click", () => sideMenu.classList.toggle("open"));

    // Закрытие меню при клике вне его
    window.addEventListener("click", (event) => {
        if (!sideMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            sideMenu.classList.remove("open");
        }
    });

    // Обновление времени и даты
    function updateTimeAndDate() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB').replace(/\//g, '.');
        const formattedTime = now.toLocaleTimeString('en-US', { hour12: true });
        document.getElementById('date').textContent = formattedDate;
        document.getElementById('time').textContent = formattedTime;
    }
    updateTimeAndDate();
    setInterval(updateTimeAndDate, 1000);

    // Анимация блоков
    const animationBox = document.getElementById("animation-box");
    if (animationBox) {
        animationBox.classList.add("animated"); // CSS-класс для анимации
    }

    // Чат-бот
    const dialogues = [
        { text: "AI: Let's create a plan for your day. What do you need to accomplish?", image: "images/image1.png" },
        { text: "AI: Don't forget your meeting at 3 PM.", image: "images/image2.png" },
        { text: "AI: How can I assist you with family event planning?", image: "images/image3.png" }

    ];

    const chatIcon = document.getElementById("chatIcon");
    const chatContainer = document.getElementById("chat-container");
    chatIcon.addEventListener("click", () => chatContainer.style.display = "block");

    const closeChatBot = document.getElementById("close-chat-bot");
    closeChatBot.addEventListener("click", () => chatContainer.style.display = "none");

    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("user-input");
    const messages = document.getElementById("messages");
    sendButton.addEventListener("click", () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            const userMessageElement = document.createElement("div");
            userMessageElement.textContent = `You: ${userMessage}`;
            messages.appendChild(userMessageElement);

            const aiMessage = dialogues[Math.floor(Math.random() * dialogues.length)];
            const aiMessageElement = document.createElement("div");
            aiMessageElement.textContent = aiMessage.text;
            messages.appendChild(aiMessageElement);

            userInput.value = "";
        }
    });
});
