<?php
require 'scripts/StartSession.php';
require 'scripts/AuthenticationCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "../components/head.php" ?>
    <link rel="stylesheet" href="../styles/text-channel.css">
    <script src="../javascript/text-channel.js" defer></script>
</head>
<body>

    <div class="default-container global-container">
        <?php include '../components/nav-primary.php'; ?>
        <?php include '../components/nav-secondary.php'; ?>
        <?php include '../components/server-header.php'; ?>
        <?php include '../components/channel-header.php'; ?>
        <main class="main-container text-channel-container">
            <div class="messages-container">
                <ol id="messages-list">
                    <!-- <li class="message">
                        Hello 
                        <div class="message-options">
                            <a href="#"><img src="../public/reply-svgrepo-com.svg" alt="relpy-icon"></a>
                            <a href="#"><img src="../public/reply-svgrepo-com.svg" alt="relpy-icon"></a>
                        </div>
                    </li> -->
                    <!-- FETCHED CLIENT-SIDE -->
                </ol>
            </div>
            <div class="input-container">
                <div class="text-input-container message-box">
                    <span>+</span>
                    <input type="text" name="message" id="message-input">
                </div>
            </div>
        </main>
        <?php include "../components/right-sidebar.php"; ?>
    </div>

</body>
</html>