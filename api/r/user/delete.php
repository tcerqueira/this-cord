<?php
require_once '../../bootstrap.php';
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

$input = (array) json_decode(file_get_contents('php://input'), TRUE);
if(!isset($input['password']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$controller = new UserController($dbConnection);
$response = $controller->deleteUser($_SESSION['id'], $input['password']);
setAuthenticated(false);

sendResponse($response);
?>