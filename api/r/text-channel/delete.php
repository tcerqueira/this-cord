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
if(!isset($input['channel_id']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$authorization = new AuthorizationController($dbConnection);
$membebership = $authorization->membershipByChannel($input['channel_id'], getId());
if(!$membebership['is_member'] || $membebership['role'] < 1)
{
    sendResponse(forbiddenResponse());
    exit();
}

$controller = new TextChannelController($dbConnection);
$response = $controller->deleteTextChannel($input['channel_id']);

sendResponse($response);
?>