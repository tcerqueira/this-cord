<?php
namespace gateways;
class UserGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $result = pg_exec($this->db, "SELECT id, username, userstatus, theme_color, user_description FROM this_user;");
        return $result;
    }

    public function find($id)
    {
        $query = "SELECT id, username, userstatus, theme_color, user_description FROM this_user WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findByUsername($username)
    {
        $query = "SELECT id, username, userstatus, theme_color, user_description FROM this_user WHERE username LIKE $1 LIMIT 50;";
        $result = pg_query_params($this->db, $query, ['%'.$username.'%']);
        return $result;
    }

    public function insert(Array $input)
    {
        $query = "INSERT INTO this_user (username, email, pass) VALUES ($1, $2, $3);";
        $result = pg_query_params($this->db, $query, $input);
        return $result;
    }

    public function update($id, Array $input)
    {  
        $query = "UPDATE this_user SET username=$2, email=$3, theme_color=$4, user_description=$5 WHERE id=$1;";
        $result = pg_query_params($this->db, $query, array_merge([$id], $input));
        return $result;
    }

    public function delete($id)
    {
        $query = "DELETE FROM this_user WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function getPassword($id)
    {
        $query = "SELECT pass FROM this_user WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }
}
?>