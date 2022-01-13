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
    <?php include "../components/modals.php"; ?>
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
                            <div id= "text-input-container-color-username" class="text-input-container text-input-container-color"><input class="user-text-input" type="text" id="myaccount-username"></div>
                            <!-- <span id="myaccount-username"></span> -->
                        </div>
                        <button class="button" type="button" id ="editUserButton"> Edit</button>
                    </div>
                    
                    <div class="userProfileItem">
                        <div>
                            <p><b>Email:</b></p>
                            <div id= "text-input-container-color-email" class="text-input-container text-input-container-color" ><input class = "user-text-input" type="text" id="myaccount-email"></div>
                            <!-- <span id=myaccount-email></span> -->
                        </div>
                        <button class="button" type="button" id= "editEmailButton"> Edit </button>
                    </div>
                    
                    <!-- <div class="userProfileItem">
                        <div>
                            <p> <b>Phone Number:</b></p>
                            <div class="text-input-container text-input-container-color"><input class="user-text-input" type="text" id="myaccount-phoneNumber"></div>
                            
                        </div>
                        <button class="button" type="button" id="phoneNumberButton"></button>
                    </div> -->
                    <hr>
                    <button class="button" type="submit" id="submitChangesButtonAccount">Save Changes</button>
                    <hr>
                    
                    <div class="userProfileItem">
                        <p><b>Password</b></p>
                        <button class="button" type="submit" id="changePasswordButton"> Change Password</button>
                    </div>
                    <hr>
                    
                    <div id="change-password">
                        <p><b>Old Password:</b></p>
                        <div class="user-password-input"><input type="password" id="oldPassword"></div>

                        <p><b>New Password:</b></p>
                        <div class="new-user-password-input"><input type="password" id="newPassword"></div>
                        <span id="passwordValidation"></span>
                        
                        <p><b>Confirm new Password:</b></p>
                        <div class="new-user-password-input" ><input type="password" id="confNewPassword"></div>
                        <span id="password-match"></span>
                        <hr>
                        <button class="button" type="submit" id="submitNewPassword">Confirm</button>
                    </div>
                
                </div>
                <button class="button"  id="delete-account"> Delete Account</button>
                <div id="confirm-password-delete-container">
                    <p>Confirm your password</p>
                    <div class = "text-input-container"><input type="password" id ="confirm-password-delete"></div>
                    <button class="button button-color" id = "confirm-delete" type="button"> Confirm </button>
                </div>
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
                        <form>
                            <textarea name="about-me" id="about-me" cols="30" rows="10" placeholder="Write a brief description about you"> </textarea>
                        </form>
                    </div>
                    <button class= "button" id="submitChangesButtonUser"> Save Changes</button>
                </div>
            </section>
        </div>
        

    </div>
</body>
</html>