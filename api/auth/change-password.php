<?php
require "../bootstrap.php";
use controllers\AuthenticationController;

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

$input = (Array) json_decode(file_get_contents('php://input'), TRUE);
if(!isset($input['old_password']) || !isset($input['new_password']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$controller = new AuthenticationController($dbConnection);
$response = $controller->changePassword(getId(), $input['old_password'], $input['new_password']);

sendResponse($response);
?>