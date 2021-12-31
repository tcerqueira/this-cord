<?php
namespace gateways;
class TextChannelGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function find($id)
    {
        $query = "SELECT * FROM text_channel WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findGuildOfChannel($id)
    {
        $query = "SELECT guild.*
                FROM text_channel
                JOIN guild
                ON guild.id=guild_id
                WHERE text_channel.id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findAllOfGuild($guild_id)
    {
        $query = "SELECT * FROM text_channel WHERE guild_id=$1;";
        $result = pg_query_params($this->db, $query, [$guild_id]);
        return $result;
    }

    public function insert($input)
    {
        $query = "INSERT INTO text_channel (guild_id, channelname, is_direct_message) VALUES ($1, $2, $3) RETURNING id;";
        $result = pg_query_params($this->db, $query, $input);
        return $result;
    }

    public function update($id, $input)
    {
        $query = "UPDATE text_channel SET channelname=$2 WHERE id=$1;";
        $result = pg_query_params($this->db, $query, array_merge([$id], $input));
        return $result;
    }
}
?>