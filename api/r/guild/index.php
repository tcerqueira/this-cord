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

if(count($_GET) > 1)
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$controller = new GuildController($dbConnection);
if(count($_GET) == 0) {
    $response = $controller->getGuildsByUser(getId());
}
else if(isset($_GET['id'])) {
    $response = $controller->getGuild($_GET['id'], getId());
}
else {
    sendResponse(unprocessableEntityResponse());
    exit();
}

sendResponse($response);
?>