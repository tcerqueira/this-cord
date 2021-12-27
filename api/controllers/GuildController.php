<?php
namespace controllers;
use gateways\GuildGateway;
use GuzzleHttp\Psr7\Response;

class GuildController
{
    private $db;
    private $guildGateway;

    public function __construct($db)
    {
        $this->db = $db;
        $this->guildGateway = new GuildGateway($db);
    }

    public function getGuild($id, $user_id)
    {
        $result = $this->guildGateway->find($id);
        $result = pg_fetch_assoc($result);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    public function getGuildsByUser($user_id)
    {

    }

    public function getUserRoles($id, $user_id)
    {

    }

    public function createGuild($user_id, $input)
    {
        $result = $this->guildGateway->insert([
            $input['guildname'],
            $input['initials'],
            $user_id,
            $input['open_invite_key'],
            $input['theme_color']
        ]);
        if(!$result)
        {
            $response = internalServerErrorResponse();
            return $response;
        }
        $result = pg_fetch_assoc($result);
        $response = okResponse(['guild_id' => $result['id']]);
        return $response;
    }

    public function updateGuild($id, $input)
    {

    }

    public function deleteGuild($id, $user_id)
    {

    }

    public function getMembers($id)
    {
        
    }

    public function inviteMember($id, $added_user_id, $invite_sender_id)
    {

    }

    public function kickMember($id, $member_id, $requester_id)
    {

    }

    public function updateMemberRole($id, $member_id, $requester_id)
    {

    }
}
?>