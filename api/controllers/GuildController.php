<?php
namespace controllers;
use gateways\GuildGateway;

class GuildController
{
    private $db;
    private $guildGateway;
    private $id;

    public function __construct($db, $guild_id)
    {
        $this->db = $db;
        $this->guildGateway = new GuildGateway($db);
        $this->id = $guild_id;
    }

    public function getGuildsByUser($user_id)
    {

    }

    public function getUserRoles($user_id)
    {

    }

    public function createGuild($user_id, $input)
    {

    }

    public function updateGuild($input)
    {

    }

    public function deleteGuild()
    {

    }

    public function getMembers()
    {
        
    }

    public function inviteMember($added_user_id, $invite_sender_id)
    {

    }

    public function kickMember($member_id)
    {

    }

    public function updateMemberRole($member_id)
    {

    }
}
?>