<?php
require_once '../../bootstrap.php';

use controllers\AuthorizationController;
use controllers\MessageController;

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
if(!isset($input['message_id']) ||
    !isset($input['content']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$authorization = new AuthorizationController($dbConnection);
$membership = $authorization->membershipByMessage($input['message_id'], getId());
if(!$membership['is_member'] || $membership['role'] < 1 || !$membership['is_author'])
{
    sendResponse(forbiddenResponse());
    exit();
}

$controller = new MessageController($dbConnection);
$response = $controller->updateMessage($input['message_id'], $input);

sendResponse($response);
?>