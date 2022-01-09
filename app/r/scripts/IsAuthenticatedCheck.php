<?php
if(isAuthenticated())
{
    header('Location: home.php');
    exit();
}
?>