<?php
require "../../bootstrap.php";
use controllers\GuildController;

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
if(!isset($input['guild_id']) ||
    !isset($input['answer']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$controller = new GuildController($dbConnection);
$response = $controller->answerInvite($input['guild_id'], getId(), $input['answer']);

sendResponse($response);
?>