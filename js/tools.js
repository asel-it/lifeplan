// Import API_URL from config.js
import { API_URL } from './config.js';

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

// Определение элементов интерфейса
const dashboardLink = document.getElementById('dashboard-link');
const myPlansLink = document.getElementById('my-plans-link');
const myProfileLink = document.getElementById('my-profile-link');
const signUpLoginLink = document.getElementById('sign-up-login-link');
const signOutLink = document.getElementById('sign-out-link');

// Функция для проверки состояния авторизации
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

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

// Подкатегории для каждой категории
const subcategories = {
    "Family": ["Family Budget", "Meal Prep", "Children's Activities", "Family Health", "Family Events", "Children's Education", "Travel", "Emergency Preparedness", "Family Values", "Daily Routines"],
    "Health": ["Nutrition", "Physical Activity", "Mental Health", "Health & Prevention", "Hydration", "Stress & Relaxation", "Medical Check-ups", "Skin Health", "Immune System", "Weight & Body"],
    "Career": ["Career Growth", "Business", "Side Jobs", "Projects", "Professional Goals", "Freelance", "Employment Relations", "Networking", "Job Search", "Work Skills"],
    "Finances": ["Personal Budget", "Family Budget", "Savings", "Investments", "Retirement Savings", "Loans & Debts", "Taxes", "Financial Goals", "Insurance", "Emergency Fund"],
    "Household": ["Cleaning & Organization", "Household Shopping", "Repairs & Maintenance", "Household Budget", "Inventory & Storage", "Bills & Utilities", "Chores", "Decor & Improvements", "Gardening & Yard Care", "Pet Care"],
    "Education": ["School", "College/University", "Professional Development", "Courses & Training", "Online Learning", "Study Projects", "Academic Achievements", "Research Activities", "Internships & Practicum", "Exam Preparation"],
    "Personal Development": ["Goal Setting", "Time Management", "Emotional Intelligence", "Stress Management", "Leadership Skills", "Communication Skills", "Self-Discipline", "Motivation & Productivity", "Decision-Making", "Creative Thinking"]
};

// Сопоставление инструментов категориям и подкатегориям
const tools = {
    "Life Balance Wheel": ["Personal Development"],
    "Budget Tracker": ["Finances", "Family"],
    "Daily Planner": ["Career", "Household", "Personal Development"],
    "Eisenhower Matrix": ["Career", "Personal Development"],
    "Geo Task": ["Career", "Household"],
    "Goal Tracker": ["Career", "Personal Development", "Education"],
    "Habits Tracker": ["Health", "Personal Development"],
    "Kanban Board": ["Career", "Education"],
    "Lists": ["Household", "Education", "Career"],
    "Progress Chart": ["Health", "Career", "Education"],
    "Roadmap": ["Career", "Education"],
    "Schedules": ["Household", "Education", "Career"],
    "Task Calendar": ["Career", "Household", "Personal Development"],
    "Task Tracker": ["Career", "Household"],
    "To Do List": ["Household", "Career", "Education"],
    "Project Management": ["Career", "Education"]
};

// Функция для обновления подкатегорий на основе выбранной категории
function updateSubcategories() {
    const category = document.getElementById('categoryDropdown').value;
    const subcategoryDropdown = document.getElementById('subcategoryDropdown');
    subcategoryDropdown.innerHTML = '<option value="">Select Subcategory</option>';
    if (category && subcategories[category]) {
        subcategories[category].forEach(subcat => {
            const option = document.createElement('option');
            option.value = subcat;
            option.textContent = subcat;
            subcategoryDropdown.appendChild(option);
        });
    }
    highlightCards(category);
}

// Функция для подсветки карточек инструментов
function highlightCards(category, subcategory = null) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const tool = card.getAttribute('data-tool');
        const applicableCategories = tools[tool];
        if (
            (subcategory && applicableCategories.includes(subcategory)) ||
            (category && applicableCategories.includes(category)) ||
            (!category && !subcategory)
        ) {
            card.classList.add('highlighted');
        } else {
            card.classList.remove('highlighted');
        }
    });
}

// Обновление карточек при изменении подкатегории
document.getElementById('subcategoryDropdown').addEventListener('change', () => {
    const category = document.getElementById('categoryDropdown').value;
    const subcategory = document.getElementById('subcategoryDropdown').value;
    highlightCards(category, subcategory);
});

// Функция для показа вкладки по имени
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

// Установка вкладки по умолчанию
document.addEventListener('DOMContentLoaded', () => showTab('toolsTab'));

// Функция для открытия инструмента
function openTool(toolPath) {
    document.getElementById('toolContainer').style.display = 'flex';
    document.getElementById('toolContent').innerHTML = `<iframe src="${toolPath}" width="100%" height="100%" style="border:none;"></iframe>`;
}

// Функция для закрытия инструмента
function closeTool() {
    document.getElementById('toolContainer').style.display = 'none';
    document.getElementById('toolContent').innerHTML = '';
}

// Функция для обработки открытия/закрытия модального окна
function toggleModal(open) {
    document.body.classList.toggle("modal-open", open);
    document.querySelector(".modal").style.display = open ? "block" : "none";
}

// Обработчики событий для модального окна
document.querySelector(".open-modal-btn").addEventListener("click", () => toggleModal(true));
document.querySelector(".close-modal-btn").addEventListener("click", () => toggleModal(false));

// Функция для сохранения данных инструмента
function saveTool() {
    localStorage.setItem("myPlan", document.getElementById("toolContent").innerHTML);
    alert("Ваш график был сохранен в My Plans.");
}

// Функция для загрузки сохраненного инструмента
function loadSavedTool() {
    const savedData = localStorage.getItem("myPlan");
    if (savedData) document.getElementById("toolContent").innerHTML = savedData;
    else alert("Нет сохраненных данных.");
}

// Загрузка сохраненных данных при загрузке страницы
window.onload = loadSavedTool;

// Сохранение активной вкладки
function saveActiveTab(tabName) {
    localStorage.setItem('activeTab', tabName);
}

// Загрузка активной вкладки при загрузке страницы
function loadActiveTab() {
    const activeTab = localStorage.getItem('activeTab') || 'toolsTab';
    showTab(activeTab);
    highlightActiveButton(activeTab);
}

// Подсветка активной кнопки вкладки
function highlightActiveButton(tabName) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase() === tabName.toLowerCase().replace('Tab', '')) {
            button.classList.add('active');
        }
    });
}

// Загрузка активной вкладки при загрузке страницы
document.addEventListener('DOMContentLoaded', loadActiveTab);

// Вставка инструмента на текущую страницу
function insertTool(toolId, toolName) {
    const toolContainer = document.getElementById('toolContainer');
    const toolContent = document.getElementById('toolContent');

    // Очистить старый контент
    toolContent.innerHTML = '';

    // Найти путь к инструменту
    const toolPath = `https://lifeplan-backend.onrender.com/tools/${toolId}`;

  // Вставить iframe с инструментом
    toolContent.innerHTML = `<iframe src="${toolPath}" width="100%" height="100%" style="border:none;"></iframe>`;

    // Открыть контейнер с инструментом
    toolContainer.style.display = 'flex';
}

// Функция для загрузки и отображения доступных инструментов
function loadTools() {
    const toolsList = [
        { id: 1, name: "Budget Tracker", category: "Finances" },
        { id: 2, name: "Daily Planner", category: "Career" },
        { id: 3, name: "Eisenhower Matrix", category: "Career" },
        { id: 4, name: "Geo Task", category: "Career" },
        { id: 5, name: "Goal Tracker", category: "Personal Development" },
        { id: 6, name: "Kanban Board", category: "Career" },
        { id: 7, name: "Lists", category: "Household" },
        { id: 8, name: "Progress Chart", category: "Health" },
        { id: 9, name: "Roadmap", category: "Career" },
        { id: 10, name: "Task Calendar", category: "Career" }
    ];

    const toolsContainer = document.getElementById('toolsContainer');
    toolsList.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.classList.add('tool-card');
        toolCard.innerHTML = `
            <h3>${tool.name}</h3>
            <p>Category: ${tool.category}</p>
            <button onclick="insertTool(${tool.id}, '${tool.name}')">Open Tool</button>
        `;
        toolsContainer.appendChild(toolCard);
    });
}

// Загрузка инструментов при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTools);

}


