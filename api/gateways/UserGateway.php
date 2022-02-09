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
        $result = pg_exec($this->db, "SELECT * FROM public_user_VIEW;");
        return $result;
    }

    public function find($id)
    {
        $query = "SELECT * FROM public_user_VIEW WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function findProfile($id)
    {
        // $query = "SELECT * FROM this_user WHERE id=$1;";
        $query = "UPDATE this_user SET userstatus=1 WHERE id=$1 RETURNING *;";
        $result = pg_query_params($this->db, $query, [$id]);
        return $result;
    }

    public function searchByUsername($username)
    {
        $query = "SELECT * FROM public_user_VIEW WHERE LOWER(username) LIKE LOWER($1) AND id<>'00000000-0000-0000-0000-000000000000'
                LIMIT 50;";
        $result = pg_query_params($this->db, $query, ['%'.$username.'%']);
        return $result;
    }

    public function findByUsername($username)
    {
        // $query = "SELECT * FROM \"this-cord\".\"public_user_VIEW\" WHERE username=$1;";
        $query = "SELECT * FROM public_user_VIEW WHERE username=$1;";
        $result = pg_query_params($this->db, $query, [$username]);
        return $result;
    }

    public function insert(Array $input)
    {
        $query = "INSERT INTO this_user (username, email, pass) VALUES ($1, $2, $3) RETURNING id;";
        $result = pg_query_params($this->db, $query, $input);
        return $result;
    }

    public function update($id, Array $input)
    {  
        $query = "UPDATE this_user SET username=$2, email=$3, theme_color=$4, user_description=$5 WHERE id=$1;";
        $result = pg_query_params($this->db, $query, array_merge([$id], $input));
        return $result;
    }

    public function updateStatus($id, $status)
    {  
        $query = "UPDATE this_user SET userstatus=$2 WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id, $status]);
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

    public function updatePassword($id, $password)
    {
        $query = "UPDATE this_user SET pass=$2 WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id, $password]);
        return $result;
    }

    public function findFriend($user_id, $friend_id)
    {
        $query = "SELECT public_user_VIEW.*, invite_status, request_sender, message_channel
                FROM public_user_VIEW
                LEFT JOIN this_friends
                ON friend_1=LEAST($1, $2)::uuid AND friend_2=GREATEST($1, $2)::uuid
                WHERE id=$2::uuid;";
        $result = pg_query_params($this->db, $query, [$user_id, $friend_id]);
        return $result;
    }

    public function findAllFriends($user_id)
    {
        $query = "SELECT public_user_VIEW.*, invite_status, request_sender, message_channel
                FROM this_friends
                JOIN public_user_VIEW AS public_user_VIEW
                ON friend_2=public_user_VIEW.id
                WHERE friend_1=$1
                UNION ALL
                SELECT public_user_VIEW.*, invite_status, request_sender, message_channel
                FROM this_friends
                JOIN public_user_VIEW AS public_user_VIEW
                ON friend_1=public_user_VIEW.id
                WHERE friend_2=$1;";
        $result = pg_query_params($this->db, $query, [$user_id]);
        return $result;
    }

    public function findFriendByChannel($channel_id)
    {
        $query = "SELECT friend_1, friend_2
                FROM this_friends
                WHERE message_channel=$1;";
        $result = pg_query_params($this->db, $query, [$channel_id]);
        return $result;
    }

    public function insertFriend($friend1, $friend2, $requester)
    {
        $query = "INSERT INTO this_friends (friend_1, friend_2, request_sender)
                VALUES (LEAST($1, $2)::uuid, GREATEST($1, $2)::uuid, $3);";
        $result = pg_query_params($this->db, $query, [$friend1, $friend2, $requester]);
        return $result;
    }

    public function updateFriend($friend1, $friend2, $input)
    {
        $query = "UPDATE this_friends
                SET invite_status=$3, message_channel=$4
                WHERE friend_1=LEAST($1, $2)::uuid AND friend_2=GREATEST($1, $2)::uuid;";
        $result = pg_query_params($this->db, $query, array_merge([$friend1, $friend2], $input));
        return $result;
    }

    public function deleteFriend($friend1, $friend2)
    {
        $query = "DELETE FROM this_friends WHERE friend_1=LEAST($1, $2)::uuid AND friend_2=GREATEST($1, $2)::uuid;";
        $result = pg_query_params($this->db, $query, [$friend1, $friend2]);
        return $result;
    }

    public function updateAvatar($id, $filename)
    {
        $query = "UPDATE this_user
                SET img_name=$2
                WHERE id=$1;";
        $result = pg_query_params($this->db, $query, [$id, $filename]);
        return $result;
    }
}
?>