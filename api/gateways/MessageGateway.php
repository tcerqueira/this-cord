<?php
namespace gateways;
class MessageGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function find($id)
    {
        $query = "SELECT * FROM channel_message WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findAllOfChannel($channel_id)
    {
        $query = "SELECT * FROM channel_message WHERE channel_id=$1;";
        $result = pg_query_params($this->db, $query, [$channel_id]);
        return $result;
    }

    public function findGuildOfMessage($id)
    {
        $query = "SELECT guild.id
                FROM channel_message
                JOIN text_channel
                ON channel_id=text_channel.id
                JOIN guild
                ON guild_id=guild.id
                WHERE channel_message.id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }
}
?>