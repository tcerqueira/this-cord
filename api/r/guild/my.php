<?php
require_once '../../bootstrap.php';
use controllers\GuildController;

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod != 'GET')
{
    sendResponse(methodNotAllowedResponse());
    exit();
}

if(!isAuthenticated())
{
    sendResponse(unauthorizedResponse());
    exit();
}

$controller = new GuildController($dbConnection);
$response = $controller->getGuildsByUser(getId());

sendResponse($response);
?>