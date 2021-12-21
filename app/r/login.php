<?php
require 'scripts/StartSession.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "../components/head.php" ?>
    <link rel="stylesheet" href="../styles/login.css">
</head>
<body>

    <main>
        <div class="login-container">
            <div class="flex-column login-inputs">
                <div class="flex-center flex-column">
                    <h2>Welcome back!</h2>
                </div>
                <form class="flex-column" id="login-form" action="">
                    <label for="username-input">Username</label>
                    <input type="email" name="username" id="username-input">
                    <label for="password-input">Password</label>
                    <input type="password" name="password" id="password-input">
                    <a href="#">Forgot your password?</a>
                    <input type="submit" value="Login">
                </form>
                <span>Need an account? <a href="#">Register</a></span>
            </div>
            <div class="login-side">
                Some cute message.
            </div>
        </div>
    </main>

</body>
</html>