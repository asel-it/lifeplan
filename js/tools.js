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

    const dashboardLink = document.getElementById('dashboard-link');
    const myPlansLink = document.getElementById('my-plans-link');
    const myProfileLink = document.getElementById('my-profile-link');
    const signUpLoginLink = document.getElementById('sign-up-login-link');
    const signOutLink = document.getElementById('sign-out-link');

    if (isAuthenticated) {
        dashboardLink.style.display = 'block';
        myPlansLink.style.display = 'block';
        myProfileLink.style.display = 'block';
        signUpLoginLink.style.display = 'none';
        signOutLink.style.display = 'block';
    } else {
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
document.addEventListener('DOMContentLoaded', function () {
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

// Показать подкатегории на основе выбранной категории
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

// Подсветить карточки инструментов
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

// Обновить карточки при выборе подкатегории
document.getElementById('subcategoryDropdown').addEventListener('change', () => {
    const category = document.getElementById('categoryDropdown').value;
    const subcategory = document.getElementById('subcategoryDropdown').value;
    highlightCards(category, subcategory);
});

// Показать вкладку Tools
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => showTab('toolsTab'));

// Открытие инструмента
function openTool(toolPath) {
    document.getElementById('toolContainer').style.display = 'flex';
    document.getElementById('toolContent').innerHTML = `<iframe src="${toolPath}" width="100%" height="100%" style="border:none;"></iframe>`;
}

// Закрытие инструмента
function closeTool() {
    document.getElementById('toolContainer').style.display = 'none';
    document.getElementById('toolContent').innerHTML = '';
}

// Обработка событий открытия/закрытия модального окна
function toggleModal(open) {
    document.body.classList.toggle("modal-open", open);
    document.querySelector(".modal").style.display = open ? "block" : "none";
}

document.querySelector(".open-modal-btn").addEventListener("click", () => toggleModal(true));
document.querySelector(".close-modal-btn").addEventListener("click", () => toggleModal(false));

// Сохранить и загрузить данные инструмента
function saveTool() {
    localStorage.setItem("myPlan", document.getElementById("toolContent").innerHTML);
    alert("Ваш график был сохранен в My Plans.");
}

function loadSavedTool() {
    const savedData = localStorage.getItem("myPlan");
    if (savedData) document.getElementById("toolContent").innerHTML = savedData;
    else alert("Нет сохраненных данных.");
}

window.onload = loadSavedTool;

// Сохранить активную вкладку
function saveActiveTab(tabName) {
    localStorage.setItem('activeTab', tabName);
}

// Загрузить активную вкладку
function loadActiveTab() {
    const activeTab = localStorage.getItem('activeTab') || 'toolsTab';
    showTab(activeTab);
    highlightActiveButton(activeTab);
}

// Показать вкладку и подсветить кнопку
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';

    highlightActiveButton(tabName);
}

// Подсветить активную кнопку вкладки
function highlightActiveButton(tabName) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`#${tabName}-button`).classList.add('active');
}

// Сохранить активную вкладку при клике
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const tabName = e.target.id.replace('-button', '');
        saveActiveTab(tabName);
        showTab(tabName);
    });
});

// Загружаем активную вкладку при загрузке страницы
window.onload = function() {
    loadActiveTab();
    // Обновляем подкатегории при выборе категории
    const categoryDropdown = document.getElementById('categoryDropdown');
    categoryDropdown.addEventListener('change', updateSubcategories);
    // Изначально показываем подкатегории
    updateSubcategories();
};
