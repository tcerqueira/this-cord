<?php
require_once 'database_connector.php';
require_once 'responses/sendResponse.php';
require_once 'responses/unprocessable_entity_422.php';
require_once 'responses/service_unavailable_503.php';
require_once 'gateways/UserGateway.php';
require_once 'gateways/TextChannelGateway.php';
require_once 'gateways/MessageGateway.php';
require_once 'gateways/GuildGateway.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$schema = 'this-cord';
$dbConnection = (new DatabaseConnector)->getConnection();
if($dbConnection)
    pg_exec($dbConnection, "set search_path to '".$schema."';");
else {
    sendResponse(serviceUnavailableResponse());
    exit();
}
    
?>