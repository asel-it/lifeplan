// Импортируем API_URL из config.js
import { API_URL } from './config.js';

// Обновление времени и даты
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


// Переключение меню
const menuIcon = document.getElementById("menu-icon");
const sideMenu = document.getElementById("side-menu");
const content = document.getElementById("content");
menuIcon.addEventListener("click", function () {
    sideMenu.classList.toggle("open");
    content.classList.toggle("menu-open");
});


// Закрытие меню при клике вне его
window.addEventListener("click", function (event) {
    if (!sideMenu.contains(event.target) && !menuIcon.contains(event.target)) {
        sideMenu.classList.remove("open");
        content.classList.remove("menu-open");
    }
});


// Проверка состояния авторизации
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
   
    const dashboardLink = document.getElementById('dashboard-link');
    const myPlansLink = document.getElementById('my-plans-link');
    const myProfileLink = document.getElementById('my-profile-link');
    const signUpLoginLink = document.getElementById('sign-up-login-link');
    const signOutLink = document.getElementById('sign-out-link');
   
    // Отображение соответствующих ссылок в зависимости от статуса авторизации
    dashboardLink.style.display = isAuthenticated ? 'block' : 'none';
    myPlansLink.style.display = isAuthenticated ? 'block' : 'none';
    myProfileLink.style.display = isAuthenticated ? 'block' : 'none';
    signUpLoginLink.style.display = isAuthenticated ? 'none' : 'block';
    signOutLink.style.display = isAuthenticated ? 'block' : 'none';
}


// Функция выхода
function signOut() {
    // Удаляем информацию о пользователе
    localStorage.removeItem('isAuthenticated');
    // Перезагружаем меню
    checkAuthStatus();
}


// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});


// Функция прокрутки карусели
function scrollCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;


    carousel.scrollBy({
        left: direction * itemWidth,
        behavior: 'smooth'
    });


    // Бесконечная прокрутка
    setTimeout(() => {
        if (direction === 1) {
            carousel.appendChild(carousel.firstElementChild);
        } else {
            carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
        }
    }, 300);
}


// Переход на страницу tools.html с параметром
function goToToolsPage(selectedItem) {
    const url = window.location.pathname.includes('template') ?
        `/tools.html?selectedTemplate=${selectedItem}` :
        `/tools.html?selectedTool=${selectedItem}`;
    window.location.href = url;
}
