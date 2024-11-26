// config.js

const API_URL = "http://localhost:10000";

function login(username, password) {
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Экспортируем функцию login, чтобы она могла быть использована в других скриптах
export { login };
