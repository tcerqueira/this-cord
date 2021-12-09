<?php
require_once '../bootstrap.php';
use controllers\UserController;

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod != 'GET')
{
    sendResponse(methodNotAllowedResponse());
    exit();
}

if(count($_GET) > 1)
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$controller = new UserController($dbConnection);
if(count($_GET) == 0) {
    $response = $controller->getAllUsers();
}
else if(isset($_GET['id'])) {
    $response = $controller->getUserById($_GET['id']);
}
else if(isset($_GET['username'])) {
    $response = $controller->getUserByUsername($_GET['username']);
}
else {
    sendResponse(unprocessableEntityResponse());
    exit();
}

sendResponse($response);
?>