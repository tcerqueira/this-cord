<?php
require 'scripts/StartSession.php';
require 'scripts/NotAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <?php include "../components/head.php"; ?>
    <link rel="stylesheet" href="../styles/chat.css">
    <link rel="stylesheet" href="../styles/home.css">
    <link rel="stylesheet" href="../styles/dm-nav.css">
    <script src="../javascript/dm-nav.js" defer></script>
    <script src="../javascript/invite-sidebar.js" defer></script>
    <script src="../javascript/chat.js" defer></script>
    <script src="../javascript/direct-message.js" defer></script>
</head>

<body>
    <?php require 'scripts/UserId.php'; ?>
    <?php include '../components/modals.php'; ?>

    <div class="default-container global-container">
        <?php include '../components/nav-primary.php'; ?>
        <?php include '../components/nav-dm.php'; ?>
        <?php include '../components/dm-header.php'; ?>
        <?php include '../components/channel-header.php'; ?>
        <main class="main-container text-channel-container">
            <?php include '../components/chat.php'; ?>
        </main>
        <?php include "../components/invite-sidebar.php"; ?>
    </div>

</body>

</html>