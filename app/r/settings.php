<?php
require 'scripts/StartSession.php';
require 'scripts/NotAuthenticatedCheck.php';
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
            <section id="my-account">
                <h2>My Account</h2>
                <div id="my-account-container">
                    <div class="userProfileItem">
                        <div>
                            <p><b>Username:</b></p>
                            <input class="text-input-container" type="text" id="myaccount-username">
                            <!-- <span id="myaccount-username"></span> -->
                        </div>
                        <button type="button" id ="editUserButton"> Edit</button>
                    </div>
                    <div class="userProfileItem">
                        <div>
                            <p><b>Email:</b></p>
                            <input class = "text-input-container" type="text" id="myaccount-email">
                            <!-- <span id=myaccount-email></span> -->
                        </div>
                        <button type="button" id= "editEmailButton"> Edit </button>
                    </div>
                    <div class="userProfileItem">
                        <div>
                            <p> <b>Phone Number:</b></p>
                            <input class="text-input-container" type="text" id="myaccount-phoneNumber">
                            <!-- <span id=myaccount-phoneNumber></span> -->
                        </div>
                        <button type="button" id="phoneNumberButton"></button>
                    </div>
                    <div class="userProfileItem">
                        <p><b>Password</b></p>
                        <button type="submit" id="changePasswordButton"> Change Password</button>
                    </div>
                    <div id="change-password">
                        <p><b>Old Password:</b></p>
                        <input class="text-input-container" type="text" id="oldPassword">

                        <p><b>New Password:</b></p>
                        <input class="text-input-container" type="text" id="newPassword">
                        
                        <p><b>Confirm new Password:</b></p>
                        <input class="text-input-container" type="text" id="confNewPassword">
                    </div>
                    <button type="submit" id="submitChangesButton">Save Changes</button>
                </div>
                <button id="delete-account"> Delete Account</button>
            </section>
            


            <section id="user-profile">
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
            </section>
        </div>
        

    </div>
</body>
</html>