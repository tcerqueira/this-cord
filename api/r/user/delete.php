<?php
require_once '../../bootstrap.php';

use controllers\AuthorizationController;
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

$authorization = new AuthorizationController($dbConnection);
if(!$authorization->validatePassword(getId(), $input['password']))
{
    $response = forbiddenResponse();
    return $response;
}

$controller = new UserController($dbConnection);
$response = $controller->deleteUser(getId());
setAuthenticated(false);

sendResponse($response);
