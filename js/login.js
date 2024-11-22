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


// Функция для открытия модального окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}


// Переключение между формами регистрации и авторизации
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}


function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}


// Обработка логина
document.getElementById('loginFormSubmit').addEventListener('submit', function(event) {
    event.preventDefault();


    let username = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;


    fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            window.location.href = 'index.html';  // Перенаправление на главную
        } else {
            alert(data.error || 'Ошибка входа');
        }
    })
    .catch(error => {
        alert('Ошибка: ' + error.message);
    });
});


// Обработка регистрации
document.getElementById('registerFormSubmit').addEventListener('submit', function(event) {
    event.preventDefault();


    let username = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;


    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }


    fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Пользователь зарегистрирован успешно');
        showLogin(); // Переключаемся на форму логина после успешной регистрации
    })
    .catch(error => {
        alert('Ошибка: ' + error.message);
    });
});
