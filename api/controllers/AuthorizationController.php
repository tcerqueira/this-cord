<?php
namespace controllers;

use gateways\GuildGateway;
use gateways\TextChannelGateway;
use gateways\MessageGateway;
use gateways\UserGateway;

class AuthorizationController
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function membershipByGuild($guild_id, $user_id)
    {
        $guildGateway = new GuildGateway($this->db);
        $result = $guildGateway->findMembers($guild_id);
        while($row = pg_fetch_assoc($result))
        {
            if($row['member_id'] == $user_id){
                return ['is_member' => true,
                        'invite_status' => intval($row['invite_status']),
                        'role' => intval($row['guild_role'])];
            }
        }
        return ['is_member' => false];
    }

    public function membershipByChannel($channel_id, $user_id)
    {
        $channelGateway = new TextChannelGateway($this->db);
        $result = $channelGateway->findGuildOfChannel($channel_id);
        $result = pg_fetch_assoc($result);
        if(!$result)
        {
            return ['is_member' => false];
        }
        if($result['is_direct_message'] == 't')
        {
            $userGateway = new UserGateway($this->db);
            $result_f = $userGateway->findFriendByChannel($channel_id);
            $result_f = pg_fetch_assoc($result_f);
            if($result_f['friend_1'] != $user_id && $result_f['friend_2'] != $user_id)
                return ['is_member' => false];
        }
        
        return $this->membershipByGuild($result['id'], $user_id);
    }

    public function membershipByMessage($message_id, $user_id)
    {
        $messageGateway = new MessageGateway($this->db);
        $result = $messageGateway->findGuildOfMessage($message_id);
        $result = pg_fetch_assoc($result);
        if(!$result)
        {
            return ['is_member' => false];
        }
        
        return array_merge(['is_author' => $result['author_id'] == $user_id],
            $this->membershipByGuild($result['id'], $user_id));
    }

    public function validatePassword($user_id, $password)
    {
        $userGateway = new UserGateway($this->db);
        $result = $userGateway->getPassword($user_id);
        $result = pg_fetch_assoc($result);
        return password_verify($password, $result['pass']);
    }
}
?>