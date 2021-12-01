<?php
require_once '../../bootstrap.php';
require_once '../UserController.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];

if($requestMethod != 'POST' || !isset($_POST['username']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$username = $_POST['username'];

$controller = new UserController($dbConnection);
$response = $controller->createUser(array($username));
sendResponse($response);
?>