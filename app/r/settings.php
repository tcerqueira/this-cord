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
    <script src="../javascript/color-picker.js" defer></script>
</head>
<body>
    <div class="settings-container global-container">
        <?php include "../components/nav-settings.php" ?>
        
        <div class="settings-display">
            
            <div class="esc">
                <a href="#"> <img src="../public/esc.svg" alt="esc"></a>
            </div>
            <div id="my-account">
                <h2>My Account</h2>
                <div id="my-account-container">
                    <div>
                        <section >
                            <p><b>Username:</b></p>
                            <span id="myaccount-username"></span>
                        </section>
                        <button > Edit</button>
                    </div>
                    <hr>
                    <div>
                        <section>
                            <p><b>Email:</b></p>
                            <span id=myaccount-email></span>
                        </section>
                        <button> Edit </button>
                    </div>
                    <hr>
                    <div>
                        <section>
                            <p> <b>Phone Number:</b></p>
                            <span id=myaccount-phoneNumber></span>
                        </section>
                        <button id="phoneNumberButton"></button>
                    </div>
                    <hr>
                    <div>
                        <p><b>Password</b></p>
                        <button> Change Password</button>
                    </div>
                </div>
                <button id="delete-account"> Delete Account</button>
            </div>

            <div id="user-profile">
                <h2>User Profile</h2>
                <div id="user-profile-container">
                    <div class="color-user">
                        <div id="user-bar-color">
                            <div id="user-preview">
                                <div id="user-icon">user</div>
                                <section>
                                    <span><b>Username:</b></span>
                                    <span id="userprofile-username"> </span>
                                </section>
                                <div id="pick-color">
                                    <span>Custom color:</span>
                                    <input type="color" id="user-color" value="#ff0000">
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="userprofile-aboutme">
                        <form action="">
                            <textarea name="about-me" id="about-me" cols="30" rows="10"> Write a brief description about you</textarea>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        

    </div>
</body>
</html>