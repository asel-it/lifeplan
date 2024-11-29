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


// Открытие инструмента в модальном окне
function openTool(toolPath) {
    const modal = document.getElementById('toolModal');
    const overlay = document.getElementById('modalOverlay');
    const iframe = document.getElementById('toolFrame');
  
    // Устанавливаем URL инструмента
    iframe.src = toolPath;
  
    // Показываем модальное окно и затемнение
    modal.style.display = 'block';
    overlay.style.display = 'block';
  }
  
  // Закрытие модального окна
  function closeTool() {
    const modal = document.getElementById('toolModal');
    const overlay = document.getElementById('modalOverlay');
    const iframe = document.getElementById('toolFrame');
  
    // Скрываем модальное окно и затемнение
    modal.style.display = 'none';
    overlay.style.display = 'none';
  
    // Очищаем содержимое iframe
    iframe.src = '';
  }
  
  // Добавляем обработчик событий для кнопки закрытия
  document.getElementById('closeModalBtn').addEventListener('click', closeTool);
  


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

// Меню и текущее время/дата
document.getElementById("menu-icon").addEventListener("click", () => {
document.getElementById("side-menu").classList.toggle("open");
document.getElementById("content").classList.toggle("menu-open");
});

window.addEventListener("click", event => {
if (!document.getElementById("side-menu").contains(event.target) &&
!document.getElementById("menu-icon").contains(event.target)) {
document.getElementById("side-menu").classList.remove("open");
document.getElementById("content").classList.remove("menu-open");
}
});

// Обновить время и дату
function updateTimeAndDate() {
const now = new Date();
const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0');
const year = now.getFullYear();
const hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
const displayHours = String(hours % 12 || 12).padStart(2, '0');
document.getElementById('date').textContent = `${day}.${month}.${year}`;
document.getElementById('time').textContent = `${displayHours}:${minutes}:${seconds} ${ampm}`;
}
setInterval(updateTimeAndDate, 1000);

