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
    <script src="../javascript/guild-settings.js" defer></script>
</head>
<body>
    <?php include "scripts/UserId.php"; ?>
    <div id="currentGuildId" data-guild-id="<?php echo $_GET['guild_id'];?>" aria-hidden="true"></div>
    <?php include "../components/modals.php"; ?>
    <div class="settings-container global-container">
        <?php include "../components/nav-settings-guild.php" ?>
        
       <div class="settings-display">
           <section>
               <!-- costumizaçao
               nome, cor icon, imagem, iniciais -->
           </section>
           <section class="guild-section" id="costumize-server">
                    <h2>Costumize Server</h2>
           
                    <div class = "guild-sections-container" >
                        <div class="settings-item">
                            <div>
                                <p><b>Guild Name: </b></p>
                                <div id= "text-input-container-color-guild-name" class="text-input-container"><input class="user-text-input" type="text" id="guild-name-input"></div>
                                <!-- <span id="myaccount-username"></span> -->
                            </div>
                            <button class="button buttonSettings" type="button" id ="editGuildNameButton"> Edit</button>
                        </div>
           
                        <div class="settings-item">
                            <div>
                                <p><b>Guild Initials</b></p>
                                <div id= "text-input-container-color-guild-init" class="text-input-container" ><input class = "user-text-input" type="text" id="guild-init-input"></div>
                                <!-- <span id=myaccount-email></span> -->
                            </div>
                            <button class="button buttonSettings" type="button" id= "editGuildInitialsButton"> Edit </button>
                        </div>
                        
                        <!-- <div class="settings-item">
                            <div>
                                <p><b>Image: </b></p>
                                <div id= "" class="text-input-container text-input-container-color" ><input class = "user-text-input" type="image" id="image-input"></div>
                                <!-- <span id=myaccount-email></span> -->
                            <!-- </div>
                            <button class="button" type="button" id= "editImageButton"> Edit </button>
                        </div> --> 
                        
                        <div class="settings-item">
                            <div id="guild-icon">Guild</div>
                            <input type="color" id="guild-color" value="#ff0000">
                        </div>
                        <hr>
                        <button class= "button buttonSettings" id="guild-save-changes"> Save Changes</button>
                    </div>
           
            </section>

           <section class="guild-section" id="text-channels">
               <h2>Text-Channels</h2>
                <div class = "guild-sections-container" >
                    <ul id="textChannelsList">                    
                        <li class="settings-item" id="channelItemTemplate" aria-hidden="true" style = "display: none">
                            <div>
                                <p><b>Text-channel: </b></p>
                                <div name="divColor" class="text-input-container text-input-container-color"><input class="user-text-input" type="text" id=""></div>
                                <!-- <span id="myaccount-username"></span> -->
                            </div>
                            <div>
                                <button class="button buttonSettings" type="button" name="editButton"> Edit</button>
                                <button class="button buttonSettings" type="button" name="deleteButton"> Delete </button>
                            </div>
                        </li>
                    </ul>

                    <hr>
                    <button class="button buttonSettings" type="button" id ="create-text-channel-button"> Create new text-channel </button>
                    <div id="create-text-channel-div">
                        Channel Name:
                        <div class="text-input-container"><input type="text" id="add-text-channel-name"></div>
                        <button class="button buttonSettings" type="button" id ="confirm-add-text-channel"> Add</button>
                    </div>
                </div>
           </section>
           
           <section class="guild-section" id="user-roles">
                <h2>User-Roles</h2>
                <div class="guild-sections-container" >
                
                <ul id="membersList">   
                    <li id="memberItemTemplate" aria-hidden="true" style = "display: none">
                        <div class="member-role" >
                            <div>
                                <span></span>
                            </div>
                            <!-- <label for="roles">Roles:</label> -->
                            <div>
                                <select id="roles" name="roles" class = "classic">
                                    <option value="role-admin">Admin</option>
                                    <option value="role-moderator">Moderator</option>
                                    <option value="role-user">User</option>
                                </select>
                                <button class="button buttonSettings" type="button" name="kickButton"> Kick </button>
                            </div>
                        </div>
                    </li>
                </ul>
               </div>
               
            </select>
               user roles
           </section>
           <section>
               kick
           </section>
       </div>


    </div>
</body>
</html>