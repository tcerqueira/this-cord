<?php
require_once '../bootstrap.php';
require_once 'UserController.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];

if($requestMethod != 'GET' || count($_GET) > 1)
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$controller = new UserController($dbConnection);
if(count($_GET) == 0) {
    $response = $controller->getAllUsers();
}
else if(isset($_GET['id'])) {
    $response = $controller->getUser($_GET['id']);
}
sendResponse($response);
?>