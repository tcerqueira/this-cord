<?php
require "../bootstrap.php";
use controllers\AuthenticationController;

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod != 'POST')
{
    sendResponse(methodNotAllowedResponse());
    exit();
}

if(isAuthenticated())
{
    sendResponse(unauthorizedResponse('You need to log out first.'));
    exit();
}

$input = (Array) json_decode(file_get_contents('php://input'), TRUE);
if(!isset($input['username']) || !isset($input['password']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$username = $input['username'];
$password = $input['password'];

$controller = new AuthenticationController($dbConnection);
$id = $controller->signIn($username, $password);

$response = okResponse();
if(!$id)
{
    $response = unauthorizedResponse('Login failed. Check your credentials.');
}
else
{
    setAuthenticated(true);
    $_SESSION['id'] = $id;
}

sendResponse($response);
?>