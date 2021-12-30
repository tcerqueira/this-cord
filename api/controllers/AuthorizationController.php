<?php
namespace controllers;

use gateways\GuildGateway;
use gateways\TextChannelGateway;
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
        
        return $this->membershipByGuild($result['id'], $user_id);
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