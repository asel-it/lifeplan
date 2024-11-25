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

// Toggle tool settings visibility
function toggleToolSettings() {
    const toolSettingsPanel = document.querySelector('.tool-settings');
    toolSettingsPanel.classList.toggle('active');
}

// Check user authentication status
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const currentPage = window.location.pathname; // Get the current page path

    const dashboardLink = document.getElementById('dashboard-link');
    const myPlansLink = document.getElementById('my-plans-link');
    const myProfileLink = document.getElementById('my-profile-link');
    const signUpLoginLink = document.getElementById('sign-up-login-link');
    const signOutLink = document.getElementById('sign-out-link');

    // Hide dashboard link on the dashboard page
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

// Function for signing out
function signOut() {
    // Remove authentication information
    localStorage.removeItem('isAuthenticated');
    // Reload menu
    checkAuthStatus();
}

// Call checkAuthStatus when the page loads
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

// Event listener for adding a new post
document.addEventListener('DOMContentLoaded', function() {
    const publishPostButton = document.getElementById('publish-post');
    const newPostContent = document.getElementById('new-post-content');
    const categoryFilter = document.getElementById('category-filter');
    const popularityFilter = document.getElementById('popularity-filter');

    // Add new post
    publishPostButton.addEventListener('click', function() {
        const content = newPostContent.value.trim();
        if (content) {
            alert("Публикация успешно добавлена!");
            // Send data to backend (POST request to the API)
            fetch('https://lifeplan-backend.onrender.com/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: content })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Post added:', data);
                newPostContent.value = ''; // Clear the input field
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
        } else {
            alert("Пожалуйста, введите текст для публикации.");
        }
    });

    // Filter posts based on selected category and popularity
    categoryFilter.addEventListener('change', function() {
        filterPosts();
    });

    popularityFilter.addEventListener('change', function() {
        filterPosts();
    });

    // Function to filter posts
    function filterPosts() {
        const category = categoryFilter.value;
        const popularity = popularityFilter.value;
        console.log(`Фильтрация по категории: ${category}, по популярности: ${popularity}`);
        // Send GET request to backend to filter posts
        fetch(`https://lifeplan-backend.onrender.com/api/posts?category=${category}&popularity=${popularity}`)
            .then(response => response.json())
            .then(posts => {
                console.log('Filtered posts:', posts);
                // Display filtered posts in the UI
            })
            .catch(error => {
                console.error('Error filtering posts:', error);
            });
    }

    // Open comments section for a post
    const commentButtons = document.querySelectorAll('.comment-btn');
    commentButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const commentSection = document.querySelector('.comments-section');
            commentSection.style.display = 'block';
        });
    });
});
