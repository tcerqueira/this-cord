<?php
require 'scripts/StartSession.php';
require 'scripts/NotAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "scripts/head-outside.php" ?>
    <link rel="stylesheet" href="../styles/invite-to-guild.css">
    <script src="../javascript/invite-to-guild.js" defer></script>
</head>
<body>
    <div id="currentGuildId" data-guild-id="<?php echo $_GET['guild_id']; ?>" style="display:none;"></div>
    <div id="currentInviteKey" data-invite-key="<?php echo $_GET['open_invite_key']; ?>" style="display:none;"></div>
    <main>
        <div class="invite-to-guild-container display-success rounded-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"></path></svg>
            <div class="invite-message">
                <h1>Welcome aboard!</h1>
                <a href="#">Go explore guild</a>
            </div>
            <h1></h1>
        </div>
        <div class="invite-to-guild-container display-failure rounded-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>
            <div class="invite-message">
                <h1>Something went wrong :(</h1>
                <a href="home.php">Go back</a>
            </div>
            <h1></h1>
        </div>
    </main>

</body>
</html>