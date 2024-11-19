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


// Close menu when clicking outside of it
window.addEventListener("click", function (event) {
    if (!sideMenu.contains(event.target) && !menuIcon.contains(event.target)) {
        sideMenu.classList.remove("open");
        content.classList.remove("menu-open");
    }
});

// Функция для открытия модального окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}


// Функция для закрытия модального окна
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}


// Связь подкатегорий с карточками
const toolsBySubcategory = {
    "Career Growth": ["balance", "daily", "eis", "goal", "progress", "sched", "calend", "todo", "kanban", "road", "task"],
    "Business": ["budget", "geo", "task", "kanban", "lists", "progress", "sched", "calend", "daily", "todo", "road", "goal"],
    "Side Jobs": ["daily", "eis", "sched", "budget", "calend", "todo", "kanban", "lists", "task"],
    "Projects": ["calend", "task", "todo", "daily", "eis", "lists", "road"],
    "Professional Goals": ["goal", "daily", "kanban", "eis", "daily", "sched", "calend", "task"],
    "Freelance": ["todo", "kanban", "lists", "budget"],
    "Employment Relations": ["goal", "todo", "sched", "lists"],
    "Networking": ["todo", "task", "daily", "eis", "goal", "lists", "kanban", "budget"],
    "Job Search": ["sched", "calend", "task", "todo", "lists"],
    "Work Skills": ["goal", "progress", "sched", "todo"]
};


function highlightTools(toolIds) {
    // Сначала удаляем подсветку со всех карточек
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('highlighted');
    });


    // Затем добавляем подсветку для переданных карточек
    toolIds.forEach(toolId => {
        const toolCard = document.getElementById(toolId);
        if (toolCard) {
            toolCard.classList.add('highlighted');
        }
    });



    // Убираем подсветку со всех карточек
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        card.classList.remove("highlighted");
    });


    // Подсвечиваем карточки для выбранной подкатегории
    toolsBySubcategory[subcategory].forEach(toolId => {
        const toolElement = document.getElementById(toolId);
        if (toolElement) {
            toolElement.classList.add("highlighted");
        }
    });
}


// Привязка кнопок подкатегорий к функции подсветки
document.querySelectorAll(".subcategory-menu button").forEach(button => {
    button.addEventListener("click", () => {
        const subcategory = button.textContent.trim();
        highlightTools(subcategory);
    });
});


// Закрытие модального окна при клике вне его
window.addEventListener("click", function(event) {
    const modal = document.getElementById("careerModal");
    if (event.target === modal) {
        closeModal("careerModal");
    }
});
