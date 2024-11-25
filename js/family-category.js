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

 // Menu toggle functionality
 const menuIcon = document.getElementById("menu-icon");
 const sideMenu = document.getElementById("side-menu");
 const content = document.getElementById("content");
 menuIcon.addEventListener("click", function () {
     sideMenu.classList.toggle("open");
     content.classList.toggle("menu-open");
 });

// Функция для проверки авторизации
function checkAuth() {
    // Предположим, что мы используем localStorage для хранения информации о сессии
    const isAuthenticated = localStorage.getItem('authToken'); // Или любая другая логика проверки авторизации

    if (isAuthenticated) {
        // Если пользователь авторизован, показываем ссылки на личные страницы и Sign Out
        document.getElementById('dashboard-link').style.display = 'block';
        document.getElementById('my-plans-link').style.display = 'block';
        document.getElementById('my-profile-link').style.display = 'block';
        document.getElementById('sign-up-login-link').style.display = 'none';
        document.getElementById('sign-out-link').style.display = 'block';
    } else {
        // Если пользователь не авторизован, показываем только "Sign Up/Login"
        document.getElementById('dashboard-link').style.display = 'none';
        document.getElementById('my-plans-link').style.display = 'none';
        document.getElementById('my-profile-link').style.display = 'none';
        document.getElementById('sign-up-login-link').style.display = 'block';
        document.getElementById('sign-out-link').style.display = 'none';
    }
}

// Вызов функции для проверки авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', checkAuth);

// Функция выхода (удаление токена и перенаправление)
function signOut() {
    localStorage.removeItem('authToken'); // Удаляем токен (или другую информацию об авторизации)
    checkAuth(); // Обновляем меню
    window.location.href = '/index.html'; // Перенаправляем на главную страницу
}

 function scrollCarousel(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;


  carousel.scrollBy({
      left: direction * itemWidth,
      behavior: 'smooth'
  });


  // Для бесконечной прокрутки
  if (direction === 1) {
      setTimeout(() => {
          carousel.appendChild(carousel.firstElementChild);
      }, 300);
  } else {
      setTimeout(() => {
          carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
      }, 300);
  }
}

// Функция для перехода на страницу tools.html с параметром selectedTool
function goToToolsPage(selectedTool) {
    window.location.href = '/tools.html?selectedTool=' + selectedTool;
}

// Функция для перехода на страницу tools.html с параметром selectedTemplate
function goToToolsPage(selectedTemplate) {
    window.location.href = '/tools.html?selectedTemplate=' + selectedTemplate;
}
