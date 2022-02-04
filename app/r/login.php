<?php
require 'scripts/StartSession.php';
require 'scripts/IsAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "../components/head-outside.php" ?>
    <link rel="stylesheet" href="../styles/login.css">
    <script src="../javascript/login.js" defer></script>
</head>
<body>

    <main>
        <div class="login-container rounded-container">
            <div class="flex-column login-inputs">
                <div class="flex-center flex-column">
                    <h2>Welcome back!</h2>
                </div>
                <form id="login-form" class="flex-column" method="post" action="">
                    <label for="username-input">Username</label>
                    <div class="text-input-container">
                        <input type="text" name="username" id="username-input">
                    </div>
                    <label for="password-input">Password</label>
                    <div class="text-input-container">
                        <input type="password" name="password" id="password-input">
                    </div>
                    <a href="register.php?message=Too bad. Create another one.">Forgot your password?</a>
                    <input id="login-button" class="button bg-green" type="submit" value="Login">
                </form>
                <div id="login-error-message" class="error-message one-liner">
                    <?php if(isset($_GET['message'])) echo $_GET['message']; ?>
                </div>
                <span>Need an account? <a href="register.php">Register</a></span>
            </div>
            <div class="login-side">
                <img src="../public/wolf-logo.svg" alt="logo">
            </div>
        </div>
    </main>

</body>
</html>