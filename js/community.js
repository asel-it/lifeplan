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

function toggleToolSettings() {
   const toolSettingsPanel = document.querySelector('.tool-settings');
   toolSettingsPanel.classList.toggle('active'); // Переключаем класс
}

// Проверяем состояние авторизации
function checkAuthStatus() {
   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
   const currentPage = window.location.pathname; // Get the current page path

   const dashboardLink = document.getElementById('dashboard-link');
   const myPlansLink = document.getElementById('my-plans-link');
   const myProfileLink = document.getElementById('my-profile-link');
   const signUpLoginLink = document.getElementById('sign-up-login-link');
   const signOutLink = document.getElementById('sign-out-link');

   // Check if we're already on the dashboard page and hide the dashboard link
   if (currentPage === '/dashboard.html') {
       dashboardLink.style.display = 'none';
   } else {
       dashboardLink.style.display = isAuthenticated ? 'block' : 'none';
   }

   // Show/hide other links based on authentication status
   if (isAuthenticated) {
       myPlansLink.style.display = 'block';
       myProfileLink.style.display = 'block';
       signUpLoginLink.style.display = 'none';
       signOutLink.style.display = 'block';
   } else {
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
  
document.addEventListener('DOMContentLoaded', function() {
    const publishPostButton = document.getElementById('publish-post');
    const newPostContent = document.getElementById('new-post-content');
    const categoryFilter = document.getElementById('category-filter');
    const popularityFilter = document.getElementById('popularity-filter');

    // Добавление новой публикации
    publishPostButton.addEventListener('click', function() {
        const content = newPostContent.value.trim();
        if (content) {
            alert("Публикация успешно добавлена!");
            // Здесь добавьте код для отправки данных на сервер
            newPostContent.value = ''; // Очищаем поле ввода
        } else {
            alert("Пожалуйста, введите текст для публикации.");
        }
    });

    // Фильтрация публикаций
    categoryFilter.addEventListener('change', function() {
        filterPosts();
    });

    popularityFilter.addEventListener('change', function() {
        filterPosts();
    });

    // Функция для фильтрации
    function filterPosts() {
        const category = categoryFilter.value;
        const popularity = popularityFilter.value;
        console.log(`Фильтрация по категории: ${category}, по популярности: ${popularity}`);
        // Добавьте логику для фильтрации публикаций
    }

    // Открытие секции комментариев
    const commentButtons = document.querySelectorAll('.comment-btn');
    commentButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const commentSection = document.querySelector('.comments-section');
            commentSection.style.display = 'block';
        });
    });
});
