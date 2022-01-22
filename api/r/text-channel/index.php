<?php
require_once '../../bootstrap.php';

use controllers\AuthorizationController;
use controllers\TextChannelController;

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

if(!isset($_GET['guild_id']) && !isset($_GET['channel_id']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$authorization = new AuthorizationController($dbConnection);
if(isset($_GET['channel_id']))
    $membership = $authorization->membershipByChannel($_GET['channel_id'], getId());
else
    $membership = $authorization->membershipByGuild($_GET['guild_id'], getId());

if(!$membership['is_member'] || $membership['invite_status'] != 1)
{
    sendResponse(forbiddenResponse());
    exit();
}

$controller = new TextChannelController($dbConnection);
if(isset($_GET['channel_id']))
    $response = $controller->getTextChannel($_GET['channel_id']);
else
    $response = $controller->getAllFromGuild($_GET['guild_id']);

sendResponse($response);
?>