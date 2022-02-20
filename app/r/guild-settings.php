<?php
require 'scripts/StartSession.php';
require 'scripts/NotAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "scripts/head.php" ?>
    <link rel="stylesheet" href="../styles/settings.css">
    <script src="../javascript/guild-settings.js" defer></script>
</head>
<body>
    <?php include "scripts/UserId.php"; ?>
    <div id="currentGuildId" data-guild-id="<?php echo $_GET['guild_id'];?>" aria-hidden="true"></div>
    <?php include "../components/modals.php"; ?>
    <div class="settings-container global-container">
        <?php include "../components/nav-settings-guild.php" ?>
        
       <div class="settings-display">
            <div class="esc" id="esc-guild-settings">
                <img src="../public/esc.svg" alt="esc">
            </div>
           <section class="guild-section" id="costumize-server">
                    <h2>Costumize Server</h2>
           
                    <div class = "guild-sections-container" >
                        <div class="settings-item">
                            <div>
                                <p><b>Guild Name: </b></p>
                                <div id= "text-input-container-color-guild-name" class="text-input-container borderStyling"><input class="user-text-input" type="text" id="guild-name-input"></div>
                                <!-- <span id="myaccount-username"></span> -->
                            </div>
                            <button class="button buttonGuildSettings bg-blue moderator" type="button" id ="editGuildNameButton"> Edit</button>
                        </div>
           
                        <div class="settings-item">
                            <div>
                                <p><b>Guild Initials</b></p>
                                <div id= "text-input-container-color-guild-init" class="text-input-container borderStyling" ><input class = "user-text-input" type="text" id="guild-init-input"></div>
                                <!-- <span id=myaccount-email></span> -->
                            </div>
                            <button class="button buttonGuildSettings bg-blue moderator" type="button" id= "editGuildInitialsButton"> Edit </button>
                        </div>
                        
                        <div class="settings-item">
                            <form id="guildSettingsImageForm">
                                <label for="guildsettings-img-input"><b>Avatar</b></label>
                                <input type="file" name="guildsettings_img" id="guildsettings-img-input">
                            </form>
                        </div> 
                        <hr>
                        <div class="settings-item">
                            <div class="icon-card icon-size-xbig"><img src="" alt="guild-icon" id="img-guild-settings"></div>
                            <input type="color" id="guild-color" value="#ff0000">
                        </div>
                        <hr>
                        <div id="GuildSettingsError" class="error-message one-liner"></div>
                        <button class= "button buttonGuildSettings bg-green moderator" id="guild-save-changes"> Save Changes</button>
                    </div>
           
            </section>

           <section class="guild-section" id="text-channels">
               <h2>Text-Channels</h2>
                <div class = "guild-sections-container" >
                    <ul id="textChannelsList">                    
                        <li class="settings-item" id="channelItemTemplate" aria-hidden="true" style = "display: none">
                            <div>
                                <p><b>Text-channel: </b></p>
                                <div name="divColor" class="text-input-container text-input-container-color "><input class="user-text-input" type="text"></div>
                                <!-- <span id="myaccount-username"></span> -->
                            </div>
                            <div>
                                <button class="button buttonGuildSettings bg-blue moderator" type="button" name="editButton"> Edit</button>
                                <button class="button buttonGuildSettings bg-red moderator" type="button" name="deleteButton"> Delete </button>
                            </div>
                        </li>
                    </ul>

                    <hr>
                    <button class="button buttonGuildSettings bg-blue moderator" type="button" id ="create-text-channel-button"> Create new text-channel </button>
                    <div id="create-text-channel-div">
                        Channel Name:
                        <div class="text-input-container"><input type="text" id="add-text-channel-name"></div>
                        <button class="button buttonGuildSettings bg-green moderator" type="button" id ="confirm-add-text-channel"> Add</button>
                    </div>
                </div>
           </section>
           
           <section class="guild-section" id="user-roles">
                <h2>User-Roles</h2>
                <div class="guild-sections-container" >
                
                    <ul id="membersList">   
                        <li id="memberItemTemplate" aria-hidden="true" style = "display: none">
                            <div class="settings-item" >
                                <div>
                                    <span></span>
                                </div>
                                <!-- <label for="roles">Roles:</label> -->
                                <div>
                                    <select id="roles" name="roles" class = "classic">
                                        <option value="role-moderator">Moderator</option>
                                        <option value="role-user">User</option>
                                    </select>
                                    <button class="button buttonGuildSettings bg-red moderator" type="button" name="kickButton"> Kick </button>
                                </div>
                            </div>
                            <hr>
                        </li>
                    </ul>
               </div>
            </section>  

            <section class="guild-section" id="transfer-admin" >
                <h2>Transfer Admin</h2>
                <div class="guild-sections-container" >
                    <div class="settings-item">
                        <div>
                            <span> Admin</span>
                        </div>
                        <!-- <label for="roles">Roles:</label> -->
                    
                        <select id= 'transferAdmin' name="transferAdmin" class = "classic">
                        </select>
                    </div>

                    <div id="confirmPasswordGuild" class="settings-item" style="display: none">
                        <div class="user-password-input"><input type="password" id="passwordGuild"></div>
                        <button id="confirmPasswordGuildButton" class="button buttonGuildSettings bg-green" type="button" name="confirmPasswordGuildButton">Confirm</button>
                    </div>
                </div>
           </section>

           <section class="guild-section" id="cancel-invites">
                <h2>Cancel Invites</h2>
                <div class="guild-sections-container" >
                    <ul id="invitesList">
                        <li id="inviteMemberItemTemplate" aria-hidden="true" style = "display: none">
                            <div class="settings-item">
                                <span></span>
                                <button class="button buttonGuildSettings bg-red moderator" type="button" name="cancelInviteButton">Cancel</button>
                            </div>
                            <hr>
                        </li>
                    </ul>
                </div>
           </section>
           <button class="button buttonGuildSettings bg-red" type="button" name="LeaveGuild"> Leave</button>
           
           <button id="PasswordGuildDeleteButton" class="button buttonGuildSettings bg-red" type="button" name="confirmPasswordGuildButton">Delete Guild</button>
           <br>
           <br>
           <div id="confirmPasswordGuildDelete" class="settings-item" style="display: none">
                <div class="user-password-input bg-light-grey"><input type="password" id="passwordGuildDelete"></div>
                <button id="confirmPasswordGuildDeleteButton" class="button buttonGuildSettings bg-green" type="button" name="confirmPasswordGuildButton">Confirm</button>
            </div>
       </div>


    </div>
</body>
</html>