<?php
require_once 'database_connector.php';

$schema = 'this-cord';
$dbConnection = (new DatabaseConnector)->getConnection();
if($dbConnection)
    pg_exec($dbConnection, "set search_path to '".$schema."';");

?>