<?php
require 'scripts/StartSession.php';
require 'scripts/AuthenticationCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "../components/head.php" ?>
    <link rel="stylesheet" href="../styles/settings.css">
    <script src="../javascript/user-settings.js" defer></script>
</head>
<body>
    <div class="settings-container global-container">
        <?php include "../components/nav-settings.php" ?>
        
        <div class="settings-display">
            
            <div class="esc">
                <a href="#"> <img src="../public/esc.svg" alt="esc"></a>
            </div>
            <div id="my-account">
                <div>
                    <section >
                        <p><b>Username:</b></p>
                        <span id="myaccount-username"></span>
                    </section>
                    <a href="#">Edit</a>
                </div>
                <hr>
                <div>
                    <section>
                        <p><b>Email:</b></p>
                        <span id=myaccount-email></span>
                    </section>
                    <a href="#">Edit</a>
                </div>
                <hr>
                <div>
                    <section>
                        <p> <b>Phone Number:</b></p>
                        <span id=myaccount-phoneNumber></span>
                    </section>
                    <a href="#" id="phoneNumberButton" ></a>
                </div>
                <hr>
                <div>
                    <p><b>Password</b></p>
                    <a href="#">Change Password</a>
                </div>
                
            </div>
            <div id="user-profile">

            </div>
        </div>
        

    </div>
</body>
</html>