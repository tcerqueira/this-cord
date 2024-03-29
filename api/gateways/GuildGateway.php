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
        $query = "SELECT guild.id AS guild_id, guildname, initials, guild.theme_color AS guild_theme_color, guild.img_name AS guild_img,
                    public_user.*, array_to_json(array_agg(text_channel.id)) channels
                FROM guild
                JOIN public_user_VIEW AS public_user ON admin_id=public_user.id
                LEFT JOIN text_channel ON guild.id=guild_id
                WHERE guild.id=$1
                GROUP BY guild.id, public_user.id, public_user.username, public_user.userstatus, public_user.theme_color, public_user.user_description, public_user.img_name;";
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
        $query = "SELECT DISTINCT member_id, member.username, member.userstatus, member.theme_color, member.img_name,
                    guild_role, invite_status, invite_sender, user_description
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
        $query = "SELECT guild.id, guildname, initials, theme_color, img_name, array_to_json(array_agg(text_channel.id)) channels
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

    public function updateAvatar($id, $filename)
    {
        $query = "UPDATE guild
                SET img_name=$2
                WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id, $filename]);
        return $result;
    }
}
?>