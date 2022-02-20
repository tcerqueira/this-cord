<?php
require 'scripts/StartSession.php';
require 'scripts/IsAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "scripts/head-outside.php" ?>
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
            <a href="about.php" title="About">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4C9.243 4 7 6.243 7 9h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.069-.454 1.465-1.481 2.255-.382.294-.813.626-1.226 1.038C10.981 13.604 10.995 14.897 11 15v2h2v-2.009c0-.024.023-.601.707-1.284.32-.32.682-.598 1.031-.867C15.798 12.024 17 11.1 17 9c0-2.757-2.243-5-5-5zm-1 14h2v2h-2z"></path></svg>
            </a>
        </div>
    </main>

</body>
</html>