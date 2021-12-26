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
                    <!-- <li id="message-2" class="message">
                        <div class="reply-preview"><span class="username">@tanso</span>: hello bro</div>
                        <h3 class="message-author">
                            <div class="author-avatar">
                                lou
                            </div>
                            <span>
                                <span class="username">lou</span>
                                <span class="message-date">Agora</span>
                            </span>
                        </h3>
                        Hello mockmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                        <div class="message-options">
                            <a href="#"><img src="../public/reply-svgrepo-com.svg" alt="reply-icon"></a>
                            <a href="#"><img src="../public/trash-svgrepo-com.svg" alt="remove-icon"></a>
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