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
        $query = "SELECT DISTINCT member_id, username, userstatus, theme_color, invite_status ".
                 "FROM guild_members ".
                 "JOIN this_user ".
                 "ON id=member_id ".
                 "WHERE guild_id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findAllOfMember($member_id)
    {
        $query = "SELECT guild.id, guildname, initials, theme_color ".
                 "FROM guild_members ".
                 "JOIN guild ".
                 "ON guild.id=guild_id ".
                 "WHERE member_id=$1;";
        $result = pg_query_params($this->db, $query, [$member_id]);
        return $result;
    }

    public function insert($input)
    {
        $query = "INSERT INTO guild (guildname, initials, admin_id, open_invite_key, theme_color) ".
                 "VALUES ($1, $2, $3, $4, $5) ".
                 "RETURNING id;";
        $result = pg_query_params($this->db, $query, $input);
        return $result;
    }

    public function insertMember($id, $input)
    {
        $query = "INSERT INTO guild_members (guild_id, member_id, invite_status, invite_sender, guild_role) ".
                 "VALUES ($1, $2, $3, $4, $5);";
        $result = pg_query_params($this->db, $query, array_merge([$id],$input));
        return $result;
    }
}
?>