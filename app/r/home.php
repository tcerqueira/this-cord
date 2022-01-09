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
        <main class="main-container">
        
        </main>
        <?php include "../components/invite-sidebar.php"; ?>
    </div>

</body>
</html>