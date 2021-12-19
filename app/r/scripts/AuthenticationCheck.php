<?php
function isAuthenticated()
{
    return !empty($_SESSION['authenticated']);
}

if(!isAuthenticated())
{
    header('Location: login.php');
    exit();
}
?>