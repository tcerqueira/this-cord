<?php
namespace gateways;
class GuildGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function find($id)
    {
        $query = "SELECT id,guildname,initials,admin_id,theme_color ".
                 "FROM guild ".
                 "WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findMembers($id)
    {

    }

    public function findAllOfMember($member_id)
    {

    }

    public function insert($input)
    {
        $query = "INSERT INTO guild (guildname, initials, admin_id, open_invite_key, theme_color) ".
                 "VALUES ($1, $2, $3, $4, $5) ".
                 "RETURNING id;";
        $result = pg_query_params($this->db, $query, $input);
        return $result;
    }
}
?>