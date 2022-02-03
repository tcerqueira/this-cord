<?php
require "../../bootstrap.php";
use controllers\GuildController;
use controllers\AuthorizationController;

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

if(!isset($_POST['guild_id']) || $_FILES['guild_avatar']['name'] == '')
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$authorization = new AuthorizationController($dbConnection);
$mem = $authorization->membershipByGuild($_POST['guild_id'], getId());
if(!$mem['is_member'] || $mem['role'] < 1)
{
    $response = forbiddenResponse();
    return $response;
}

$controller = new GuildController($dbConnection);
$response = $controller->updateGuildAvatar($input['guild_id'], $_FILES['guild_avatar']);

sendResponse($response);
?>