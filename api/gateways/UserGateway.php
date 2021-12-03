<?php
class UserGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $result = pg_exec($this->db, "SELECT * FROM this_user;");
        return $result;
    }

    public function find($id = 0, $username = 'NULL')
    {
        $query = "SELECT * FROM this_user WHERE id=$1 OR username=$2;";
        $result = pg_query_params($this->db, $query, [$id, $username]);
        return $result;
    }

    public function insert(Array $input)
    {
        $query = "INSERT INTO this_user (username) VALUES ($1);";
        $result = pg_query_params($this->db, $query, $input);
        return $result;
    }

    public function update($id, Array $input)
    {

    }

    public function delete($id = 0, $username = 'NULL')
    {
        $query = "DELETE FROM this_user WHERE id=$1 OR username=$2;";
        $result = pg_exec($this->db, $query, [$id, $username]);
        return $result;
    }
}
?>