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
    window.location.href = 'tools.html?selectedTool=' + selectedTool;
}

// Функция для перехода на страницу tools.html с параметром selectedTemplate
function goToToolsPage(selectedTemplate) {
    window.location.href = 'tools.html?selectedTemplate=' + selectedTemplate;
}
