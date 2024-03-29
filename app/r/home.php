<?php
require 'scripts/StartSession.php';
require 'scripts/NotAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <?php include "scripts/head.php" ?>
    <link rel="stylesheet" href="../styles/home.css">
    <link rel="stylesheet" href="../styles/dm-nav.css">
    <script src="../javascript/components/dm-nav.js" defer></script>
    <script src="../javascript/components/invite-sidebar.js" defer></script>
    <script src="../javascript/home.js" defer></script>
</head>

<body>
    <?php require 'scripts/UserId.php'; ?>
    <?php include '../components/modals.php'; ?>

    <div class="default-container global-container">
        <?php include '../components/nav-primary.php'; ?>
        <?php include '../components/nav-dm.php'; ?>
        <?php include '../components/dm-header.php'; ?>
        <?php include '../components/home-topbar.php'; ?>
        <main class="main-container home-container">
            <h3>Online</h3>
            <ul id="usersList" class="users-list">

            </ul>
            <template id="userItemTemplate">
                <li class="user-item">
                    <div class="icon-card icon-size-small">
                        <img src="" alt="user_avatar">
                    </div>
                    <div class="user-item-info">
                        <span class="user-item-username">Username <span class="user-item-shortid">#123456</span></span>
                        <span>Status</span>
                    </div>
                    <div class="user-item-options">
                        <a href="#" style="display: none;">
                            <div class="home-options-icon home-icon-size-2" data-tooltip="Message">
                                <img src="../public/message-svgrepo-com.svg" alt="message-icon">
                            </div>
                        </a>
                        <div class="home-options-icon home-icon-size-2 bg-green" data-tooltip="Request friend" style="display: none;">
                            <img src="../public/add-plus-svgrepo-com.svg" alt="add-icon">
                        </div>
                        <div class="home-options-icon home-icon-size-2 bg-blue" data-tooltip="Cancel request" style="display: none;">
                            <img src="../public/mail-sent-svgrepo-com.svg" alt="sent-icon">
                            <img style="display: none;" src="../public/cancel-nofill-svgrepo-com.svg" alt="cancel-sent-icon">
                        </div>
                        <div class="home-options-icon home-icon-size-2 bg-red" data-tooltip="Remove friend" style="display: none;">
                            <img src="../public/remove-user-svgrepo-com.svg" alt="remove-icon">
                        </div>
                        <div class="home-options-icon home-icon-size-2 bg-green" data-tooltip="Accept request" style="display: none;">
                            <img src="../public/check-svgrepo-com.svg" alt="accept-icon">
                        </div>
                        <div class="home-options-icon home-icon-size-2 bg-red" data-tooltip="Decline request" style="display: none;">
                            <img src="../public/remove-user-svgrepo-com.svg" alt="decline-icon">
                        </div>
                    </div>
                </li>
            </template>
        </main>
        <?php include "../components/invite-sidebar.php"; ?>
    </div>

</body>

</html>