 // Импортируем API_URL из config.js
import { API_URL, login } from './config.js';

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

// Function to open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Switch between register and login forms
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Handle login form submission
document.getElementById('loginFormSubmit').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    fetch(`${API_URL}/login`, {
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
            localStorage.setItem('isAuthenticated', 'true');  // Set authentication status
            window.location.href = 'index.html';  // Redirect to the main page after successful login
        } else {
            alert(data.error || 'Login error');
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
});

// Handle registration form submission
document.getElementById('registerFormSubmit').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    fetch(`${API_URL}/register`, {
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
        alert(data.message || 'User registered successfully');
        showLogin(); // Switch to login form after successful registration
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
});

// Check authentication status and update the UI
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const currentPage = window.location.pathname;

    const dashboardLink = document.getElementById('dashboard-link');
    const myPlansLink = document.getElementById('my-plans-link');
    const myProfileLink = document.getElementById('my-profile-link');
    const signUpLoginLink = document.getElementById('sign-up-login-link');
    const signOutLink = document.getElementById('sign-out-link');

    if (currentPage === '/dashboard.html') {
        dashboardLink.style.display = 'none';
    } else {
        dashboardLink.style.display = isAuthenticated ? 'block' : 'none';
    }

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

// Function to log out
function signOut() {
    localStorage.removeItem('isAuthenticated');
    checkAuthStatus();
}

// Call the checkAuthStatus function when the page loads
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

// Tool drag-and-drop functionality
document.querySelectorAll('.tool').forEach(tool => {
    tool.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('toolId', event.target.id);
    });

    tool.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    tool.addEventListener('drop', (event) => {
        event.preventDefault();
        const draggedToolId = event.dataTransfer.getData('toolId');
        const draggedTool = document.getElementById(draggedToolId);
        event.target.parentNode.insertBefore(draggedTool, event.target.nextSibling);
    });
});
