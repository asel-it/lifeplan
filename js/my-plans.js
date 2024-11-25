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

// Fetch user plans from backend
function getUserPlans() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        alert("You must be logged in to view your plans.");
        return;
    }

    const userId = localStorage.getItem('userId');  // Assuming you store the userId after login
    fetch(`https://lifeplan-backend.onrender.com/plans/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`  // Assuming you store a token after login
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.plans) {
            displayPlans(data.plans);  // Assuming `displayPlans` is a function that populates the UI with the plans
        } else {
            alert("No plans found.");
        }
    })
    .catch(error => {
        console.error('Error fetching plans:', error);
        alert('Error loading plans.');
    });
}

// Display user plans in the UI
function displayPlans(plans) {
    const plansContainer = document.getElementById('plans-container');
    plansContainer.innerHTML = ''; // Clear existing plans

    plans.forEach(plan => {
        const planElement = document.createElement('div');
        planElement.classList.add('plan');
        planElement.innerHTML = `
            <h3>${plan.title}</h3>
            <p>${plan.description}</p>
            <button onclick="deletePlan('${plan.id}')">Delete</button>
            <button onclick="editPlan('${plan.id}')">Edit</button>
        `;
        plansContainer.appendChild(planElement);
    });
}

// Delete plan from the backend
function deletePlan(planId) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        alert("You must be logged in to delete a plan.");
        return;
    }

    fetch(`https://lifeplan-backend.onrender.com/plans/${planId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            getUserPlans();  // Refresh the plans after deletion
        } else {
            alert('Error deleting plan');
        }
    })
    .catch(error => {
        console.error('Error deleting plan:', error);
        alert('Error deleting plan.');
    });
}

// Edit plan (this could be a modal or page for updating the plan details)
function editPlan(planId) {
    // Fetch plan details and open a modal or form for editing
    fetch(`https://lifeplan-backend.onrender.com/plans/${planId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.plan) {
            openModal('editPlanModal');
            // Populate form fields in the modal with the plan data
            document.getElementById('editPlanTitle').value = data.plan.title;
            document.getElementById('editPlanDescription').value = data.plan.description;
            // Save changes after editing
            document.getElementById('editPlanSubmit').onclick = function() {
                updatePlan(planId);
            };
        }
    })
    .catch(error => {
        console.error('Error fetching plan for editing:', error);
    });
}

// Update plan
function updatePlan(planId) {
    const title = document.getElementById('editPlanTitle').value;
    const description = document.getElementById('editPlanDescription').value;

    fetch(`https://lifeplan-backend.onrender.com/plans/${planId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ title, description })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            closeModal('editPlanModal');
            getUserPlans();  // Refresh the plans after updating
        }
    })
    .catch(error => {
        console.error('Error updating plan:', error);
        alert('Error updating plan.');
    });
}

// Call functions on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    getUserPlans();  // Fetch the user's plans when the page loads
});
