<?php
require_once '../../bootstrap.php';

use controllers\AuthorizationController;
use controllers\TextChannelController;

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
if(!isset($input['channelname']) ||
    !isset($input['guild_id']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$authorization = new AuthorizationController($dbConnection);
$membership = $authorization->membershipByGuild($input['guild_id'], getId());
if(!$membership['is_member'] || $membership['role'] < 1)
{
    sendResponse(forbiddenResponse());
    exit();
}

$controller = new TextChannelController($dbConnection);
$response = $controller->createTextChannel($input['guild_id'], $input);

sendResponse($response);
?>