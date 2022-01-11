<?php
require 'scripts/StartSession.php';
require 'scripts/NotAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "../components/head.php"; ?>
    <link rel="stylesheet" href="../styles/home.css">
    <link rel="stylesheet" href="../styles/guild-invites.css">
    <link rel="stylesheet" href="../styles/dm-nav.css">
    <script src="../javascript/home.js" defer></script>
</head>
<body>
    <?php require 'scripts/UserId.php'; ?>
    <?php include '../components/modals.php'; ?>

    <div class="default-container global-container">
        <?php include '../components/nav-primary.php'; ?>
        <?php include '../components/nav-dm.php'; ?>
        <?php include '../components/server-header.php'; ?>
        <?php include '../components/home-topbar.php'; ?>
        <main class="main-container home-container">
            <h3>Online</h3>
            <ul class="users-list">
                <li class="user-item">
                    <div class="icon-card icon-size-small">

                    </div>
                    <div class="user-item-info">
                        <span class="user-item-username">Username</span>
                        <span>Status</span>
                    </div>
                    <div class="user-item-options">
                        <a href="#">
                            <div data-tooltip="Message">
                                <img src="../public/message-svgrepo-com.svg" alt="mensage-icon">
                            </div>
                        </a>
                        <div class="bg-green" data-tooltip="Request friend">
                            <img src="../public/add-plus-svgrepo-com.svg" alt="add-icon">
                        </div>
                        <div class="bg-blue" data-tooltip="Request sent">
                            <img src="../public/mail-sent-svgrepo-com.svg" alt="sent-icon">
                        </div>
                        <div class="bg-red" data-tooltip="Remove friend">
                            <img src="../public/remove-user-svgrepo-com.svg" alt="remove-icon">
                        </div>
                        <!-- <div data-tooltip="Options">
                            <img src="../public/options-vertical-svgrepo-com.svg" alt="options-icon">
                        </div> -->
                    </div>
                </li>
                <li class="user-item">
                    <div class="icon-card icon-size-small">

                    </div>
                    <div class="user-item-info">
                        <span class="user-item-options">Username</span>
                        <span>Status</span>
                    </div>
                    <div class="user-item-options">
                        <a href="#">
                            <div><img src="../public/message-svgrepo-com.svg" alt="mensage-icon"></div>
                        </a>
                        <div><img src="../public/options-vertical-svgrepo-com.svg" alt="options-icon"></div>
                    </div>
                </li>
            </ul>
        </main>
        <?php include "../components/invite-sidebar.php"; ?>
    </div>

</body>
</html>