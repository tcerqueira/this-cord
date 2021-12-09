<?php
require __DIR__ . '/vendor/autoload.php';
require 'database_connector.php';
require 'responses/sendResponse.php';
require 'responses/responses.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$schema = 'this-cord';
$connector = new DatabaseConnector;

$dbConnection = $connector->getConnection();
if($dbConnection)
    $connector->setSchema($schema);
else {
    sendResponse(serviceUnavailableResponse());
    exit();
}
    
?>