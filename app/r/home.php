<?php
require 'scripts/StartSession.php';
require 'scripts/AuthenticationCheck.php';
require 'scripts/SendHeaders.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "../components/head.php" ?>
</head>
<body>

    <div class="default-container global-container">
        <?php include '../components/nav-primary.php'; ?>
        <?php include '../components/nav-secondary.php'; ?>
        <?php include '../components/server-header.php'; ?>
        <?php include '../components/channel-header.php'; ?>
        <main class="main-container">
        
        </main>
        <?php include "../components/right-sidebar.php"; ?>
    </div>

</body>
</html>