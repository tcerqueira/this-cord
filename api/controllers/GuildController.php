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
        $membership = $this->guildMembership($id, $user_id);
        if(!$membership['is_member'])
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
            $response = internalServerErrorResponse('Problem finding guilds of member.');
            return $response;
        }
        $response = okResponse(pg_fetch_all($result));
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
            $user_id,
            2   // admin
        ]);
        if(!$result_m)
        {
            $response = internalServerErrorResponse('Problem inserting member.');
            return $response;
        }
        $response = okResponse(['id' => $result_g['id']]);
        return $response;
    }

    public function updateGuild($id, Array $input)
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
        $response = okResponse(pg_fetch_all($result));
        return $response;
    }

    public function inviteMember($id, $added_user_id, $invite_sender_id)
    {
        $membership = $this->guildMembership($id, $invite_sender_id);
        if(!$membership['is_member'] || intval($membership['role']) < 1)
        {
            $response = forbiddenResponse();
            return $response;
        }
        $membership = $this->guildMembership($id, $added_user_id);
        if($membership['is_member']){
            $response = conflictResponse();
            return $response;
        }
        $result = $this->guildGateway->insertMember($id, [
            'member_id' => $added_user_id,
            'invite_status' => 0,
            'invite_sender' => $invite_sender_id,
            'guild_role' => 0
        ]);
        if(!$result)
        {
            $response = internalServerErrorResponse();
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }

    public function answerInvite($id, $user_id, bool $answer)
    {
        $membership = $this->guildMembership($id, $user_id);
        if(!$membership['is_member'])
        {
            $response = notFoundResponse('Invite not found.');
            return $response;
        }
        if($membership['invite_status'] != 0)
        {
            $response = conflictResponse('Invite already answered.');
            return $response;
        }
        if($answer)
        {
            $result = $this->guildGateway->updateMember($id, $user_id, [
                'invite_status' => 1,
                'guild_role' => 0
            ]);
        }
        else
        {
            $result = $this->guildGateway->deleteMember($id, $user_id);
        }

        if(!$result)
        {
            $response = internalServerErrorResponse('Problem answering invite.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }

    public function kickMember($id, $member_id, $requester_id)
    {
        $membership = $this->guildMembership($id, $requester_id);
        if(!$membership['is_member'] || intval($membership['role']) < 1)
        {
            $response = forbiddenResponse();
            return $response;
        }
        $result = $this->guildGateway->deleteMember($id, $member_id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem kicking member.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }

    public function updateMemberRole($id, $member_id, $requester_id)
    {

    }

    private function guildMembership($id, $user_id)
    {
        $result = $this->guildGateway->findMembers($id);
        while($row = pg_fetch_assoc($result))
        {
            if($row['member_id'] == $user_id){
                return ['is_member' => true,
                        'invite_status' => $row['invite_status'],
                        'role' => $row['guild_role']];
            }
        }
        return ['is_member' => false];
    }
}
?>