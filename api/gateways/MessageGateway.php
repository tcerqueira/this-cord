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
        $query = "SELECT channel_message.*,
                    public_user_VIEW.username, public_user_VIEW.theme_color
                FROM channel_message
                JOIN public_user_VIEW ON author_id=public_user_VIEW.id
                WHERE channel_message.id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findAllOfChannel($channel_id)
    {
        $query = "SELECT channel_message.*,
                    public_user_VIEW.username, public_user_VIEW.theme_color
                FROM channel_message
                JOIN public_user_VIEW ON author_id=public_user_VIEW.id
                WHERE channel_message.channel_id=$1
                ORDER BY channel_message.sent_at ASC;";
        $result = pg_query_params($this->db, $query, [$channel_id]);
        return $result;
    }

    public function findGuildOfMessage($id)
    {
        $query = "SELECT guild.id, channel_message.author_id
                FROM channel_message
                JOIN text_channel
                ON channel_id=text_channel.id
                JOIN guild
                ON guild_id=guild.id
                WHERE channel_message.id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function insert($input)
    {
        $query = "INSERT INTO channel_message (channel_id, author_id, reply_to, content)
                VALUES ($1, $2, $3, $4)
                RETURNING id;";
        $result = pg_query_params($this->db, $query, $input);
        return $result;
    }

    public function update($id, $input)
    {
        $query = "UPDATE channel_message SET content=$2 WHERE id=$1;";
        $result = pg_query_params($this->db, $query, array_merge([$id], $input));
        return $result;
    }

    public function delete($id)
    {
        $query = "DELETE FROM channel_message WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }
}
