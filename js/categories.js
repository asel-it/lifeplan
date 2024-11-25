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

// Пример работы с API бэкенда (например, для получения списка планов)
async function getPlans() {
    try {
        const response = await fetch('https://lifeplan-backend.onrender.com/api/plans', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка при получении данных с сервера');
        }

        const plans = await response.json();
        // Обрабатываем полученные данные
        console.log(plans);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Вызов API при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    getPlans();
});
