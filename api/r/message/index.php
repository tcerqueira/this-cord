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

if(!isset($_GET['channel_id']) && !isset($_GET['message_id']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$authorization = new AuthorizationController($dbConnection);
if(isset($_GET['message_id']))
    $membership = $authorization->membershipByMessage($_GET['message_id'], getId());
else
    $membership = $authorization->membershipByChannel($_GET['channel_id'], getId());

if(!$membership['is_member'] || $membership['invite_status'] != 1)
{
    sendResponse(forbiddenResponse());
    exit();
}

$controller = new MessageController($dbConnection);
if(isset($_GET['message_id']))
    $response = $controller->getMessage($_GET['message_id']);
else
    $response = $controller->getFromChannel($_GET['channel_id'], [
        'since' => $_GET['since'],
        'until' => $_GET['until']
    ]);

sendResponse($response);
?>