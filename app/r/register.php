<?php
require 'scripts/StartSession.php';
require 'scripts/IsAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "scipts/head-outside.php" ?>
    <link rel="stylesheet" href="../styles/register.css">
    <script src="../javascript/register.js" defer></script>
</head>
<body>

    <main>
        <div class="register-container rounded-container">
            <div class="flex-column register-inputs">
                <div class="flex-center flex-column">
                    <h2>Create an account</h2>
                </div>
                <form class="flex-column" id="register-form" method="post" action="">
                    <label for="email-input">Email</label>
                    <div class="text-input-container">
                        <input type="email" name="email" id="email-input">
                    </div>
                    <label for="username-input">Username</label>
                    <div class="text-input-container">
                        <input type="text" name="username" id="username-input">
                    </div>
                    <label for="password-input">Password</label>
                    <div class="text-input-container">
                        <input type="password" name="password" id="password-input">
                    </div>
                    <label for="conf-password-input">Confirm password</label>
                    <div class="text-input-container">
                        <input type="password" name="conf-password" id="conf-password-input">
                    </div>
                    <input id="register-button" class="button bg-green" type="submit" value="Register">
                </form>
                <div id="register-error-message" class="error-message one-liner">
                    <?php if(isset($_GET['message'])) echo $_GET['message']; ?>
                </div>
                <a href="login.php">Already have an account?</a>
            </div>
        </div>
    </main>

</body>
</html>