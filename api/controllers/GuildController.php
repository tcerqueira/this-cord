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
        if(!$this->isMember($id, $user_id))
        {
            $response = forbiddenResponse();
            return $response;
        }
        $result = $this->guildGateway->find($id);
        $result = pg_fetch_assoc($result);
        $response = okResponse($result);
        return $response;
    }

    public function getGuildsByUser($user_id)
    {
        $result = $this->guildGateway->findAllOfMember($user_id);
        if(!$result)
        {
            $response = internalServerErrorResponse();
            return $response;
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode(pg_fetch_all($result));
        return $response;
    }

    public function getUserRoles($id, $user_id)
    {

    }

    public function createGuild($user_id, $input)
    {
        $result_g = $this->guildGateway->insert([
            $input['guildname'],
            $input['initials'],
            $user_id,
            $input['open_invite_key'],
            $input['theme_color']
        ]);
        if(!$result_g)
        {
            $response = internalServerErrorResponse();
            return $response;
        }
        $result_g = pg_fetch_assoc($result_g);
        $result_m = $this->guildGateway->insertMember($result_g['id'], [
            $user_id,
            1,  // accepted
            NULL,
            2   // admin
        ]);
        if(!$result_m)
        {
            $response = internalServerErrorResponse('Problem inserting member.');
            return $response;
        }
        $response = okResponse(['guild_id' => $result_g['id']]);
        return $response;
    }

    public function updateGuild($id, $input)
    {

    }

    public function deleteGuild($id, $user_id)
    {

    }

    public function getMembers($id, $user_id)
    {
        $result = $this->guildGateway->findMembers($id);
        $found = false;
        while($row = pg_fetch_assoc($result))
        {
            if($row['member_id'] == $user_id && $row['invite_status'] == 1)
                $found = true;
        }

        if(!$found)
        {
            $response = forbiddenResponse();
            return $response;
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        // $repsonse['body']
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

    private function isMember($id, $user_id)
    {
        $result = $this->guildGateway->findMembers($id);
        while($row = pg_fetch_assoc($result))
        {
            if($row['member_id'] == $user_id && $row['invite_status'] == 1)
                return true;
        }
        return false;
    }
}
?>