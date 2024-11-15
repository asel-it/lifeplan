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

// JavaScript
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
    // Добавьте другие подкатегории и их инструменты, если нужно
};


function highlightTools(subcategory) {
    // Убираем подсветку со всех инструментов
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("highlighted");
    });


    // Добавляем подсветку только тем инструментам, которые соответствуют выбранной подкатегории
    toolsBySubcategory[subcategory].forEach(toolId => {
        const toolElement = document.getElementById(toolId);
        if (toolElement) {
            toolElement.classList.add("highlighted");
        }
    });
}
