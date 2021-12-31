<?php
require_once '../../bootstrap.php';

use controllers\AuthorizationController;
use controllers\MessageController;

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

if(!isset($_GET['channel_id']) && !isset($_GET['message_id']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$authorization = new AuthorizationController($dbConnection);
if(isset($_GET['message_id']))
    $membebership = $authorization->membershipByMessage($_GET['message_id'], getId());
else
    $membebership = $authorization->membershipByChannel($_GET['channel_id'], getId());

if(!$membebership['is_member'] || $membebership['invite_status'] != 1)
{
    sendResponse(forbiddenResponse());
    exit();
}

$controller = new MessageController($dbConnection);
if(isset($_GET['message_id']))
    $response = $controller->getMessage($_GET['message_id']);
else
    $response = $controller->getAllFromChannel($_GET['channel_id']);

sendResponse($response);
?>