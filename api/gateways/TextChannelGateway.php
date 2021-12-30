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
}
?>