const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Payment } = require('../models'); // Assuming you have a payment model for storing transactions

// Middleware for verifying JWT
function verifyToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1]; // Get token from Authorization header
    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }

    jwt.verify(token, 'yourSecretKey', (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid token.');
        }
        req.userId = decoded.userId;
        next();
    });
}

// Payment endpoint
router.post('/payment', verifyToken, async (req, res) => {
    const { planName, planPrice } = req.body;
    const userId = req.userId;

    if (!planName || !planPrice) {
        return res.status(400).send('Plan name and price are required.');
    }

    try {
        // Save payment transaction to database (using a hypothetical Payment model)
        const payment = new Payment({
            userId: userId,
            planName: planName,
            planPrice: planPrice,
            date: new Date()
        });

        await payment.save();

        // Respond with success message
        res.status(200).send({ success: true, message: 'Payment processed successfully.' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send('Server error.');
    }
});

module.exports = router;

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
    const displayTime = `${displayHours}:${minutes}:${seconds} ${ampm}`;
    const displayDate = `${day}/${month}/${year}`;

    document.getElementById("date").textContent = displayDate;
    document.getElementById("time").textContent = displayTime;
}

// Function to handle plan selection
function selectPlan(planType) {
    let planName = "";
    let planPrice = 0;

    switch(planType) {
        case 'basic':
            planName = "Basic Plan";
            planPrice = 9.99;
            break;
        case 'premium':
            planName = "Premium Plan";
            planPrice = 19.99;
            break;
        case 'ultimate':
            planName = "Ultimate Plan";
            planPrice = 29.99;
            break;
    }

    // Update order summary
    document.getElementById("selected-plan").textContent = planName;
    document.getElementById("total-price").textContent = planPrice.toFixed(2);
}

// Initialize the time and date update
setInterval(updateTimeAndDate, 1000); // Update every second

// Initial call to update the time and date
updateTimeAndDate();

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

function toggleToolSettings() {
    const toolSettingsPanel = document.querySelector('.tool-settings');
    toolSettingsPanel.classList.toggle('active'); // Toggle class
}

// Check authentication status
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const currentPage = window.location.pathname; // Get the current page path

    const dashboardLink = document.getElementById('dashboard-link');
    const myPlansLink = document.getElementById('my-plans-link');
    const myProfileLink = document.getElementById('my-profile-link');
    const signUpLoginLink = document.getElementById('sign-up-login-link');
    const signOutLink = document.getElementById('sign-out-link');

    // Check if we're already on the dashboard page and hide the dashboard link
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

// Sign out function
function signOut() {
    // Remove authentication information
    localStorage.removeItem('isAuthenticated');
    checkAuthStatus(); // Re-check auth status and update UI
}

// Function to handle payment
function handlePayment(planType) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
        alert('Please sign in to proceed with the payment.');
        return;
    }

    let planName = "";
    let planPrice = 0;

    // Get selected plan details
    switch(planType) {
        case 'basic':
            planName = "Basic Plan";
            planPrice = 9.99;
            break;
        case 'premium':
            planName = "Premium Plan";
            planPrice = 19.99;
            break;
        case 'ultimate':
            planName = "Ultimate Plan";
            planPrice = 29.99;
            break;
    }

    const userId = localStorage.getItem('userId');  // Assuming userId is stored in localStorage
    if (!userId) {
        alert('User ID is not found.');
        return;
    }

    // Prepare payment data
    const paymentData = {
        userId: userId,
        planName: planName,
        planPrice: planPrice
    };

    // Send payment request to the backend
    fetch('https://lifeplan-backend.onrender.com/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Payment successful!');
        } else {
            alert('Payment failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during payment:', error);
        alert('Error processing payment.');
    });
}

// Call function on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});



