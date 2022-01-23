<?php
require_once '../../../bootstrap.php';
use controllers\UserController;

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

if(count($_GET) > 1)
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$controller = new UserController($dbConnection);
if(count($_GET) == 0) {
    $response = $controller->getFriends(getId());
}
else if(isset($_GET['id'])) {
    $response = $controller->getFriend(getId(), $_GET['id']);
}
else {
    $response = unprocessableEntityResponse();
}

sendResponse($response);
?>