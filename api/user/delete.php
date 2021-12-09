<?php
require_once '../bootstrap.php';
use controllers\UserController;

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod != 'POST')
{
    sendResponse(methodNotAllowedResponse());
    exit();
}

$input = (array) json_decode(file_get_contents('php://input'), TRUE);

if(!isset($input['id']) && !isset($input['username']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$controller = new UserController($dbConnection);
if(isset($input['id']))
{
    $id = $input['id'];
    $response = $controller->deleteUserById($id);
}
else {
    $username = $input['username'];
    $response = $controller->deleteUserByUsername($username);
}
sendResponse($response);
?>