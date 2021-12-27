<?php
require 'scripts/StartSession.php';
require 'scripts/IsAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "../components/head.php" ?>
    <link rel="stylesheet" href="../styles/register.css">
</head>
<body>

    <main>
        <div class="register-container">
            <div class="flex-column register-inputs">
                <div class="flex-center flex-column">
                    <h2>Create an account</h2>
                </div>
                <form class="flex-column" id="register-form" action="">
                    <label for="email-input">Email</label>
                    <input type="email" name="email" id="email-input">
                    <label for="username-input">Username</label>
                    <input type="email" name="username" id="username-input">
                    <label for="password-input">Password</label>
                    <input type="password" name="password" id="password-input">
                    <label for="conf-password-input">Confirm password</label>
                    <input type="password" name="conf-password" id="conf-password-input">
                    <input type="submit" value="Register">
                </form>
                <a href="login.php">Already have an account?</a>
            </div>
        </div>
    </main>

</body>
</html>