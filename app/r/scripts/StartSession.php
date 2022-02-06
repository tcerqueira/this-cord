<?php
session_set_cookie_params([
    'path' => '/~up201707238/sie/this-cord'
]);
session_start();

function isAuthenticated()
{
    return !empty($_SESSION['authenticated']);
}
?>