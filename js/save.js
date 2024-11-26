// Получение текущего пользователя из localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Функция для синхронизации данных с сервером
function syncDataWithServer(data, userId) {
    if (userId) {
        fetch(`http://localhost:10000/my-plans/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Данные успешно синхронизированы с сервером:', data);
        })
        .catch(error => console.error('Ошибка синхронизации с сервером:', error));
    }
}

// Функция для получения данных с сервера
function fetchDataFromServer(userId) {
    return fetch(`http://localhost:10000/my-plans/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log('Данные загружены с сервера:', data);
            return data;
        })
        .catch(error => {
            console.error('Ошибка загрузки данных с сервера:', error);
            return null;
        });
}

// Функция для обновления данных в localStorage и синхронизации с сервером
function updateData(newData) {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        const userId = currentUser.id;

        // Обновление данных в localStorage
        localStorage.setItem('userPlans', JSON.stringify(newData));

        // Синхронизация с сервером
        syncDataWithServer(newData, userId);
    } else {
        // Если пользователь не авторизован, данные сохраняются только в localStorage
        localStorage.setItem('userPlans', JSON.stringify(newData));
    }
}

// Функция для загрузки данных из localStorage и синхронизации с сервером
function loadData() {
    const currentUser = getCurrentUser();
    const storedData = JSON.parse(localStorage.getItem('userPlans'));

    if (storedData && currentUser) {
        const userId = currentUser.id;
        fetchDataFromServer(userId)
            .then(serverData => {
                if (serverData) {
                    // Если на сервере есть данные, объединяем их с локальными данными
                    const mergedData = { ...storedData, ...serverData };
                    // Загружаем объединенные данные
                    updateData(mergedData);
                } else {
                    // Если данных на сервере нет, используем только локальные
                    updateData(storedData);
                }
            });
    } else {
        // Если нет данных в localStorage или пользователь не авторизован
        return storedData || {};
    }
}

// Функция для сохранения данных и синхронизации
function saveData(data) {
    updateData(data);
}

// Функция для загрузки данных при открытии страницы
function loadDataOnPageLoad() {
    window.addEventListener('load', () => {
        loadData();
    });
}

// Экспортируем функции для использования в других скриптах
export { saveData, loadDataOnPageLoad };
