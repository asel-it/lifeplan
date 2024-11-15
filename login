<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - LifePlan</title>
    <script src="js/i18next/i18next.min.js"></script>
    <script src="js/i18next-http-backend/i18nextHttpBackend.min.js"></script>
    <script type="module" src="js/i18next.config.js" defer></script>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <header>
        <div class="logo">
            <img src="images/logo.png" alt="LifePlan Logo">
            <span>LifePlan</span>
        </div>
        <nav>
            <a href="index.html" data-i18n="home">Home</a>
            <a href="categories.html" data-i18n="categories">Categories</a>
            <a href="settings.html" data-i18n="settings">Settings</a>
            <a href="login.html" data-i18n="login">Login</a>
        </nav>
        <select id="language-select">
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="es">Español</option>
            <option value="ky">Кыргызча</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="pt">Português</option>
            <option value="it">Italiano</option>
            <option value="zh">中国人</option>
            <option value="ja">日本語</option>
            <option value="ko">한국인</option>
            <option value="ar">عربي</option>
            <option value="tr">Türkçe</option>
            <option value="hi">हिंदी</option>
        </select>
        
        <script type="module" src="https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"></script>
<script type="module" src="https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js"></script>
<script type="module" src="https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"></script>
<script type="module" src="js/firebase-setup.js"></script>
    </header>
    <main>
        <form id="loginForm">
            <div class="form-container">
                <h2 data-i18n="login">Login</h2>
                <label for="username" data-i18n="username">Username</label>
                <input type="text" id="username" name="username" autocomplete="username">

                <label for="password" data-i18n="password">Password</label>
                <input type="password" id="password" name="password" autocomplete="current-password">

                <button type="submit" class="login-button" id="login-button" data-i18n="login">Login</button>
                <a href="signup.html" data-i18n="signup-here">Sign up here</a>
            </div>
        </form>
    </main>
    <footer>
        <p>© 2024 LifePlan. <p data-i18n="rightsReserved">All rights reserved.</p>
    </footer>
    <script src="js/login.js" defer></script>
    <script src="js/scripts.js" defer></script>
</body>
</html>
