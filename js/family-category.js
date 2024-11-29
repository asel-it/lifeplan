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

// Открытие/закрытие бокового меню
const menuIcon = document.getElementById("menu-icon");
const sideMenu = document.getElementById("side-menu");
menuIcon.addEventListener("click", function () {
    sideMenu.classList.toggle("open");
});

// Проверка авторизации
function checkAuth() {
    const isAuthenticated = localStorage.getItem('authToken');
    if (isAuthenticated) {
        document.getElementById('dashboard-link').style.display = 'block';
        document.getElementById('my-plans-link').style.display = 'block';
        document.getElementById('my-profile-link').style.display = 'block';
        document.getElementById('sign-up-login-link').style.display = 'none';
        document.getElementById('sign-out-link').style.display = 'block';
    } else {
        document.getElementById('dashboard-link').style.display = 'none';
        document.getElementById('my-plans-link').style.display = 'none';
        document.getElementById('my-profile-link').style.display = 'none';
        document.getElementById('sign-up-login-link').style.display = 'block';
        document.getElementById('sign-out-link').style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', checkAuth);

// Выход из аккаунта
function signOut() {
    localStorage.removeItem('authToken');
    checkAuth();
    window.location.href = '/index.html';
}

// Прокрутка карусели
function scrollCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;

    carousel.scrollBy({
        left: direction * itemWidth,
        behavior: 'smooth'
    });
}

// Функция для перехода на страницу tools.html
function goToToolsPage(selectedId) {
    window.location.href = '/tools.html?selected=' + selectedId;
}
