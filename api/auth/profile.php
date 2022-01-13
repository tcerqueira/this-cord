<?php
require "../bootstrap.php";
use controllers\AuthenticationController;

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod != 'GET')
{
    sendResponse(methodNotAllowedResponse());
    exit();
}

if(!isAuthenticated())
{
    sendResponse(unauthorizedResponse());
    exit();
}

$controller = new AuthenticationController($dbConnection);
$response = $controller->getProfile(getId());

sendResponse($response);
?>