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
        $result = pg_exec($this->db, 'SELECT * FROM this_user;');
        return $result;
    }

    public function find($id = 0, $username = 'NULL')
    {
        $query = "SELECT * FROM this_user WHERE id=".$id." OR username='".$username."';";
        $result = pg_exec($this->db, $query);
        return $result;
    }

    public function insert(Array $input)
    {
        $query = "INSERT INTO this_user (username) VALUES ($1);";
        $result = pg_prepare($this->db, "insert_user", $query);
        $result = pg_execute($this->db, "insert_user", $input);
        return $result;
    }

    public function update($id, Array $input)
    {

    }

    public function delete($id = 0, $username = 'NULL')
    {
        $query = "DELETE FROM this_user WHERE id=".$id." OR username='".$username."';";
        $result = pg_exec($this->db, $query);
        return $result;
    }
}
?>