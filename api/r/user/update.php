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
if(!isset($input['username']) ||
    !isset($input['email']) ||
    !isset($input['theme_color']) ||
    !isset($input['user_description']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$controller = new UserController($dbConnection);
$response = $controller->updateUser(getId(), $input);

sendResponse($response);
?>