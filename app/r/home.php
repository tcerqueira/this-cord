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
    <script src="../javascript/home.js" defer></script>
</head>
<body>
    <?php require 'scripts/UserId.php'; ?>
    <?php include '../components/modals.php'; ?>

    <div class="default-container global-container">
        <?php include '../components/nav-primary.php'; ?>
        <?php include '../components/nav-friends.php'; ?>
        <?php include '../components/server-header.php'; ?>
        <?php include '../components/home-topbar.php'; ?>
        <main class="main-container home-container">
            <h2>Online</h2>
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