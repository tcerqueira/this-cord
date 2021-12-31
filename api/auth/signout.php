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
    sendResponse(unauthorizedResponse('Not logged in.'));
    exit();
}

$controller = new AuthenticationController($dbConnection);
$response = $controller->signOut(getId());
setAuthenticated(false);

sendResponse($response);
?>