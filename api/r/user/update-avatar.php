<?php
require "../../bootstrap.php";
use controllers\UserController;

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod != 'POST')
{
    sendResponse(methodNotAllowedResponse());
    exit();
}

if(!isAuthenticated())
{
    sendResponse(unauthorizedResponse());
    exit();
}

$controller = new UserController($dbConnection);
$response = $controller->updateUserAvatar(getId(), $_FILES['user_avatar']);

sendResponse($response);
?>