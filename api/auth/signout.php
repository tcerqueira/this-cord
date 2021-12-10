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

$id = $_SESSION['id'];
$controller = new AuthenticationController($dbConnection);
$response = $controller->signOut($id);
setAuthenticated(false);

sendResponse($response);
?>