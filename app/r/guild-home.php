<?php
require 'scripts/StartSession.php';
require 'scripts/NotAuthenticatedCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "../components/head.php" ?>
    <link rel="stylesheet" href="../styles/chat.css">
    <link rel="stylesheet" href="../styles/sidebar.css">
    <script src="../javascript/guild.js" defer></script>
    <script src="../javascript/guild-home.js" defer></script>
</head>
<body>
    <?php require 'scripts/UserId.php' ?>
    <div id="currentGuildId" data-guild-id="<?php echo $_GET['id'];?>"></div>
    <?php include '../components/modals.php'; ?>
    
    <div class="default-container global-container">
        <?php include '../components/nav-primary.php'; ?>
        <?php include '../components/nav-secondary.php'; ?>
        <?php include '../components/server-header.php'; ?>
        <?php include '../components/channel-header.php'; ?>
        <main class="main-container text-channel-container">
            
        </main>
        <?php include "../components/right-sidebar.php"; ?>
    </div>

</body>
</html>