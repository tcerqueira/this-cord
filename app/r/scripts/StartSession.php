<?php
session_start();

function isAuthenticated()
{
    return !empty($_SESSION['authenticated']);
}
?>