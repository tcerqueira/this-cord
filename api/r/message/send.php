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
if(!isset($input['channel_id']) ||
    !isset($input['author_id']) ||
    !array_key_exists('reply_to', $input) ||
    !isset($input['content']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$authorization = new AuthorizationController($dbConnection);
$membebership = $authorization->membershipByChannel($input['channel_id'], getId());
if(!$membebership['is_member'])
{
    sendResponse(forbiddenResponse());
    exit();
}

$controller = new MessageController($dbConnection);
$response = $controller->createMessage($input['channel_id'], $input);

sendResponse($response);
?>