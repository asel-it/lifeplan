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

// Пути к инструментам
const toolPaths = {
    "Life Balance Wheel": "tools/life_balance_wheel.html",
    "Budget Tracker": "tools/budget_tracker.html",
    "Daily Planner": "tools/daily_planner.html",
    "Eisenhower Matrix": "tools/eisenhower_matrix.html",
    "Geo Task": "tools/geo_task.html",
    "Goal Tracker": "tools/goal_tracker.html",
    "Habits Tracker": "tools/habits_tracker.html",
    "Kanban Board": "tools/kanban_board.html",
    "Lists": "tools/lists.html",
    "Progress Chart": "tools/progress_chart.html",
    "Roadmap": "tools/roadmap.html",
    "Schedules": "tools/schedules.html",
    "Task Calendar": "tools/task_calendar.html",
    "Task Tracker": "tools/task_tracker.html",
    "To Do List": "tools/to_do_list.html",
    "Project Management": "tools/project_management.html"
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
function openTool(toolName) {
    const toolPath = toolPaths[toolName];
    if (toolPath) {
        document.getElementById('toolContainer').style.display = 'flex';
        document.getElementById('toolContent').innerHTML = `<iframe src="${toolPath}" width="100%" height="100%" style="border:none;"></iframe>`;
    } else {
        alert("Путь к инструменту не найден.");
    }
}

// Закрытие инструмента
function closeTool() {
    document.getElementById('toolContainer').style.display = 'none';
    document.getElementById('toolContent').innerHTML = '';
}

// Обработка событий открытия/закрытия модального окна
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Закрытие всех модальных окон при клике за пределами модального окна
window.addEventListener('click', function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (modal.style.display === 'block' && !modal.contains(event.target)) {
            modal.style.display = 'none';
        }
    });
});

// Добавление задач
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        taskItem.textContent = taskText;

        // Добавляем кнопку для удаления задачи
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => taskItem.remove();
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        taskInput.value = ''; // Очищаем поле ввода
    }
}

// Сохранение задачи в локальном хранилище
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.task');
    taskItems.forEach(taskItem => {
        tasks.push(taskItem.textContent.replace('Удалить', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Загрузка задач из локального хранилища
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        taskItem.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => taskItem.remove();
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Загружаем задачи при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTasks);

// Показать меню инструментов
function showTools() {
    const toolsContainer = document.getElementById('toolsContainer');
    toolsContainer.style.display = 'block';
}

// Скрыть меню инструментов
function hideTools() {
    const toolsContainer = document.getElementById('toolsContainer');
    toolsContainer.style.display = 'none';
}

// Функция для добавления нового инструмента
function addNewTool() {
    const toolName = document.getElementById('newToolName').value.trim();
    if (toolName) {
        const newToolCard = document.createElement('div');
        newToolCard.classList.add('card');
        newToolCard.setAttribute('data-tool', toolName);
        newToolCard.innerHTML = `<h4>${toolName}</h4><button onclick="openTool('${toolName}')">Открыть</button>`;
        
        const toolsGrid = document.getElementById('toolsGrid');
        toolsGrid.appendChild(newToolCard);

        document.getElementById('newToolName').value = ''; // Очищаем поле ввода
    }
}

// Открытие подкатегорий
function openSubcategory(category, subcategory) {
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = ''; // Очищаем текущие инструменты

    // Фильтруем инструменты по категории и подкатегории
    const applicableTools = Object.keys(tools).filter(tool => {
        return tools[tool].includes(category) && (!subcategory || tools[tool].includes(subcategory));
    });

    // Отображаем только соответствующие инструменты
    applicableTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.classList.add('card');
        toolCard.setAttribute('data-tool', tool);
        toolCard.innerHTML = `<h4>${tool}</h4><button onclick="openTool('${tool}')">Открыть</button>`;
        toolsGrid.appendChild(toolCard);
    });
}

// Сброс фильтров категорий и подкатегорий
function resetFilters() {
    const categoryDropdown = document.getElementById('categoryDropdown');
    categoryDropdown.selectedIndex = 0;
    const subcategoryDropdown = document.getElementById('subcategoryDropdown');
    subcategoryDropdown.selectedIndex = 0;
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = ''; // Очистить сетку инструментов
}


