<?php
class DatabaseConnector {

    private $dbConnection = null;

    public function __construct()
    {
        $host = 'db.fe.up.pt';
        $port = '5432';
        $dbname   = 'sie212245';
        $user = 'sie212245';
        $pass = 'QJDXHAbd';

        $this->dbConnection = pg_connect('host='.$host.' port='.$port.' dbname='.$dbname.' user='.$user.' password='.$pass);
    }

    public function getConnection()
    {
        return $this->dbConnection;
    }

    public function setSchema($schema_name)
    {
        $schema_escaped = pg_escape_string($schema_name);
        $query = "set search_path to '".$schema_escaped."';";
        return pg_exec($this->dbConnection, $query);
    }
}
?>