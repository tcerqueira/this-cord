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
    sendResponse(unauthorizedResponse('Needs to be logged out.'));
    exit();
}

$input = (Array) json_decode(file_get_contents('php://input'), TRUE);
if(!isset($input['username']) || !isset($input['email']) || !isset($input['password']))
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$regex_res = preg_match('/^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/', $input['username']);
if(!$regex_res)
{
    sendResponse(unprocessableEntityResponse());
    exit();
}

$options = [
    'cost' => 11
];
$username = $input['username'];
$email = $input['email'];
$password = password_hash($input['password'], PASSWORD_BCRYPT, $options);

$controller = new AuthenticationController($dbConnection);
$response = $controller->signUp([
    $username,
    $email,
    $password
]);
sendResponse($response);
?>