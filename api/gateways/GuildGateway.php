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
        $query = "SELECT guild.id,guildname,initials,admin_id,this_user.username AS admin_username,guild.theme_color
                 FROM guild
                 JOIN this_user
                 ON admin_id=this_user.id
                 WHERE guild.id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findExact($id)
    {
        $query = "SELECT * FROM guild WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findMembers($id)
    {
        // $query = "SELECT DISTINCT member_id, member.username, member.userstatus, member.theme_color, guild_role,invite_status, inviter.username 
        //           FROM guild_members
        //           JOIN this_user AS member
        //           ON member.id=member_id
        //           JOIN this_user AS inviter
        //           ON inviter.id=invite_sender
        //           WHERE guild_id=$1;";
        $query = "SELECT DISTINCT member_id, member.username, member.userstatus, member.theme_color, guild_role,invite_status, invite_sender
                  FROM guild_members
                  JOIN this_user AS member
                  ON member.id=member_id
                  WHERE guild_id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findMember($id, $user_id)
    {
        $query = "SELECT DISTINCT member_id, username, userstatus, theme_color, guild_role, invite_status ".
                 "FROM guild_members ".
                 "JOIN this_user ".
                 "ON id=member_id ".
                 "WHERE guild_id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findAllOfMember($member_id, $invite_status)
    {
        $query = "SELECT guild.id, guildname, initials, theme_color, array_to_json(COALESCE(array_agg(text_channel.id), '{}'::UUID[])) channels
                FROM guild_members
                JOIN guild ON guild.id=guild_id
                LEFT JOIN text_channel USING (guild_id)
                WHERE member_id=$1 AND invite_status=$2 AND guild_id<>'00000000-0000-0000-0000-000000000000'
                GROUP BY guild.id;";
        $result = pg_query_params($this->db, $query, [$member_id, $invite_status]);
        return $result;
    }

    public function insert(Array $input)
    {
        $query = "INSERT INTO guild (guildname, initials, admin_id, open_invite_key, theme_color) ".
                 "VALUES ($1, $2, $3, $4, $5) ".
                 "RETURNING id;";
        $result = pg_query_params($this->db, $query, $input);
        return $result;
    }

    public function update($id, Array $input)
    {
        $query = "UPDATE guild
                SET guildname=$2, initials=$3, open_invite_key=$4, theme_color=$5
                WHERE id=$1;";
        $result = pg_query_params($this->db, $query, array_merge([$id],$input));
        return $result;
    }

    public function delete($id)
    {
        $query = "DELETE FROM guild WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function updateAdmin($id, $user_id)
    {
        $query = "UPDATE guild SET admin_id=$1 WHERE id=$2;";
        $result = pg_query_params($this->db, $query, [$id, $user_id]);
        return $result;
    }

    public function insertMember($id, Array $input)
    {
        $query = "INSERT INTO guild_members (guild_id, member_id, invite_status, invite_sender, guild_role) ".
                 "VALUES ($1, $2, $3, $4, $5);";
        $result = pg_query_params($this->db, $query, array_merge([$id],$input));
        return $result;
    }

    public function updateMember($id, $member_id, Array $input)
    {
        $query = "UPDATE guild_members
                 SET invite_status=$3, guild_role=$4
                 WHERE guild_id=$1 AND member_id=$2;";
        $result = pg_query_params($this->db, $query, array_merge([
            $id,
            $member_id],
            $input
        ));
        return $result;
    }

    public function deleteMember($id, $member_id)
    {
        $query = "DELETE FROM guild_members
                 WHERE guild_id=$1 AND member_id=$2;";
        $result = pg_query_params($this->db, $query, [$id, $member_id]);
        return $result;
    }
}
?>