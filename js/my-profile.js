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

// Check authentication status and update the UI
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
        fetchUserProfile();  // Fetch profile data when authenticated
    } else {
        dashboardLink.style.display = 'none';
        myPlansLink.style.display = 'none';
        myProfileLink.style.display = 'none';
        signUpLoginLink.style.display = 'block';
        signOutLink.style.display = 'none';
    }
}

// Sign out function
function signOut() {
    localStorage.removeItem('isAuthenticated');
    checkAuthStatus();
}

// Fetch user profile data from the backend
function fetchUserProfile() {
    const userId = localStorage.getItem('userId');  // Assuming you store the userId after login
    if (!userId) {
        alert("User not found.");
        return;
    }

    fetch(`https://lifeplan-backend.onrender.com/users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`  // Assuming you store a token after login
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.user) {
            displayUserProfile(data.user);
        } else {
            alert("Failed to fetch user profile.");
        }
    })
    .catch(error => {
        console.error('Error fetching profile:', error);
        alert('Error loading profile.');
    });
}

// Display user profile in the UI
function displayUserProfile(user) {
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userProfilePic = document.getElementById('user-profile-pic');

    userName.textContent = user.name || 'No name available';
    userEmail.textContent = user.email || 'No email available';

    if (user.profilePic) {
        userProfilePic.src = user.profilePic;  // Assuming profilePic is a URL to an image
    }
}

// Switch to profile editing mode
function editProfile() {
    document.querySelector('.profile-info').style.display = 'none';
    document.getElementById('edit-profile').style.display = 'block';
}

// Cancel profile editing
function cancelEdit() {
    document.querySelector('.profile-info').style.display = 'block';
    document.getElementById('edit-profile').style.display = 'none';
}

// Save profile changes
function saveProfile() {
    const userId = localStorage.getItem('userId');
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const profilePic = document.getElementById('edit-profile-pic').files[0];  // Assuming user can upload a profile picture

    if (!name || !email) {
        alert("Name and email are required.");
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (profilePic) {
        formData.append('profilePic', profilePic);  // Append profile picture if provided
    }

    fetch(`https://lifeplan-backend.onrender.com/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Profile updated successfully');
            cancelEdit();
            fetchUserProfile();  // Fetch updated profile data
        } else {
            alert('Failed to update profile');
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        alert('Error updating profile.');
    });
}

// Change profile picture (Placeholder logic for now)
function changeProfilePic() {
    document.getElementById('edit-profile-pic').click();  // Simulate a file input click
}

// Call functions on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});