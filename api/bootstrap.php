<?php session_start(); ?>
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

// ############################### SESSION MANAGEMENT ######################################
// #########################################################################################

$timeout = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > $timeout)) {
    // last request was more than 30 minutes ago
    session_unset();     // unset $_SESSION variable for the run-time 
    session_destroy();   // destroy session data in storage
}
$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp

if (!isset($_SESSION['CREATED'])) {
    $_SESSION['CREATED'] = time();
} else if (time() - $_SESSION['CREATED'] > $timeout) {
    // session started more than 30 minutes ago
    session_regenerate_id(true);    // change session ID for the current session and invalidate old session ID
    $_SESSION['CREATED'] = time();  // update creation time
}

function isAuthenticated()
{
    return !empty($_SESSION['authenticated']);
}

function setAuthenticated($bool)
{
    $_SESSION['authenticated'] = $bool;
}
    
?>