<?php
require_once '../bootstrap.php';
require_once 'UserController.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod != 'POST')
{
    sendResponse(methodNotAllowedResponse());
    exit();
}

$input = (array) json_decode(file_get_contents('php://input'), TRUE);
if(empty($input))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$username = $input['username'];

$controller = new UserController($dbConnection);
$response = $controller->createUser(array($username));
sendResponse($response);
?>