<?php
namespace controllers;
use gateways\GuildGateway;
use gateways\UserGateway;

class GuildController
{
    private $db;
    private $guildGateway;
    private $authorization;

    public function __construct($db)
    {
        $this->db = $db;
        $this->guildGateway = new GuildGateway($db);
        $this->authorization = new AuthorizationController($db);
    }

    public function getGuild($id, $user_id)
    {
        $membership = $this->authorization->membershipByGuild($id, $user_id);
        if(!$membership['is_member'])
        {
            $response = forbiddenResponse();
            return $response;
        }
        $result = $this->guildGateway->find($id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem finding guild.');
            return $response;
        }
        $result = pg_fetch_assoc($result);
        $result_arr = [
            'id' => $result['guild_id'],
            'guildname' => $result['guildname'],
            'initials' => $result['initials'],
            'theme_color' => $result['guild_theme_color'],
            'img_name' => $result['guild_img'],
            'channels' => $result['channels'] == "[null]" ? [] : json_decode($result['channels']),
            'admin' => [
                'id' => $result['id'],
                'username' => $result['username'],
                'theme_color' => $result['theme_color'],
                'userstatus' => $result['userstatus'],
                'user_description' => $result['user_description'],
                'img_name' => $result['img_name']
            ]
        ];
        $response = okResponse($result_arr);
        return $response;
    }

    public function getGuildsByUser($user_id)
    {
        $result = $this->guildGateway->findAllOfMember($user_id, 1);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem finding guilds of member.');
            return $response;
        }

        $result_arr = [];
        while($row = pg_fetch_assoc($result)) {
            if($row['channels'] == "[null]")
                $row['channels'] = [];
            else
                $row['channels'] = json_decode($row['channels']);
            array_push($result_arr, $row);
        }
        $response = okResponse($result_arr);
        return $response;
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

    public function updateGuild($id, Array $input, $user_id)
    {
        $result = $this->guildGateway->findExact($id);
        $result = pg_fetch_assoc($result);
        if(!$result)
        {
            $response = notFoundResponse('Guild not found.');
            return $response;
        }
        if($result['admin_id'] != $user_id)
        {
            $response = forbiddenResponse();
            return $response;
        }
        $update_in = [
            'guildname' => isset($input['guildname']) ? $input['guildname'] : $result['guildname'],
            'initials' => isset($input['initials']) ? $input['initials'] : $result['initials'],
            'open_invite_key' => isset($input['open_invite_key']) ? $input['open_invite_key'] : $result['open_invite_key'],
            'theme_color' => isset($input['theme_color']) ? $input['theme_color'] : $result['theme_color']
        ];
        $result = $this->guildGateway->update($id, $update_in);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem updating guild.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }

    public function updateGuildAvatar($id, $file)
    {
        $filename = $file['name'] != '' ? 'guild_'.$id : 'guild_default.gif';
        if($file['name'] != '') {
            if(!move_uploaded_file($file['tmp_name'], '../../public/'.$filename)) {
                $response = internalServerErrorResponse('Problem uploading guild avatar.');
                return $response;
            }
        }
        $result = $this->guildGateway->updateAvatar($id, $filename);
        if(!$result) {
            $response = internalServerErrorResponse('Problem updating guild avatar.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }

    public function deleteGuild($id, $user_id, $password)
    {
        $membership = $this->authorization->membershipByGuild($id, $user_id);
        if(!$membership['is_member'] || $membership['role'] != 2)
        {
            $response = forbiddenResponse();
            return $response;
        }

        if(!$this->validatePassword($user_id, $password))
        {
            $response = forbiddenResponse();
            return $response;
        }
        $result = $this->guildGateway->delete($id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem deleting guild.');
            return $response;
        }
        unlink('../../public/guild_'.$id);
        $response = okResponse(['success' => true]);
        return $response;
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
        $result = pg_fetch_all($result);
        $response = okResponse($result ? $result : []);
        return $response;
    }

    public function inviteMember($id, $added_user_id, $invite_sender_id)
    {
        $membership = $this->authorization->membershipByGuild($id, $invite_sender_id);
        if(!$membership['is_member'] || intval($membership['role']) < 1)
        {
            $response = forbiddenResponse();
            return $response;
        }
        $membership = $this->authorization->membershipByGuild($id, $added_user_id);
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

    public function listInvites($user_id)
    {
        $result = $this->guildGateway->findAllOfMember($user_id, 0);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem finding invites for guilds.');
            return $response;
        }
        $result = pg_fetch_all($result);
        $response = okResponse($result ? $result : []);
        return $response;
    }

    public function answerInvite($id, $user_id, bool $answer)
    {
        $membership = $this->authorization->membershipByGuild($id, $user_id);
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

    public function openInvite($id, $user_id, $key)
    {
        $membership = $this->authorization->membershipByGuild($id, $user_id);
        if($membership['is_member'])
        {
            $response = conflictResponse('Already a member or invited.');
            return $response;
        }
        $result = $this->guildGateway->findExact($id);
        $result = pg_fetch_assoc($result);
        if(!$result || $result['open_invite_key'] != $key)
        {
            $response = forbiddenResponse();
            return $response;
        }
        $result = $this->guildGateway->insertMember($id, [
            'member_id' => $user_id,
            'invite_status' => 1,
            'invite_sender' => $result['admin_id'],
            'guild_role' => 0
        ]);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem joining with open invite key.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }

    public function generateOpenInvite($id)
    {
        $result = $this->guildGateway->findExact($id);
        if(!$result) {
            $response = internalServerErrorResponse('Problem retrieving open invite.');
            return $response;
        }
        $result = pg_fetch_assoc($result);
        $response = okResponse([
            'guild_id' => $result['id'],
            'open_invite_key' => $result['open_invite_key']
        ]);
        return $response;
    }

    public function kickMember($id, $member_id, $requester_id)
    {
        $membership = $this->authorization->membershipByGuild($id, $requester_id);
        if(!$membership['is_member'] || intval($membership['role']) < 1)
        {
            $response = forbiddenResponse();
            return $response;
        }
        $membership = $this->authorization->membershipByGuild($id, $member_id);
        if(!$membership['is_member'] || intval($membership['role']) == 2)
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

    public function leaveGuild($id, $member_id)
    {
        $membership = $this->authorization->membershipByGuild($id, $member_id);
        if(!$membership['is_member'] || $membership['invite_status'] == 0)
        {
            $response = forbiddenResponse();
            return $response;
        }
        if(intval($membership['role']) == 2)
        {
            $response = forbiddenResponse("You need to transfer guild ownership first.");
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

    public function transferAdmin($id, $new_admin, $old_admin, $password)
    {
        $membership = $this->authorization->membershipByGuild($id, $old_admin);
        if(!$membership['is_member'] || $membership['invite_status'] != 1 || $membership['role'] != 2)
        {
            $response = forbiddenResponse();
            return $response;
        }
        
        if(!$this->validatePassword($old_admin, $password))
        {
            $response = forbiddenResponse();
            return $response;
        }
        pg_query($this->db, 'BEGIN');
        $result = $this->guildGateway->updateAdmin($id, $new_admin);
        $result = $this->guildGateway->updateMember($id, $new_admin, [1,2]); // 1:accepted invite; 2:admin role
        $result = $this->guildGateway->updateMember($id, $old_admin, [1,1]); // 1:accepted invite; 1:mod role
        pg_query($this->db, 'COMMIT');
        $response = okResponse(['success' => true]);
        return $response;
    }

    public function updateMemberRole($id, $member_id, $guild_role, $requester_id)
    {
        $membership = $this->authorization->membershipByGuild($id, $requester_id);
        if(!$membership['is_member'] || $membership['role'] != 2)
        {
            $response = forbiddenResponse();
            return $response;
        }
        $membership = $this->authorization->membershipByGuild($id, $member_id);
        if(!$membership['is_member'] || $membership['role'] == 2)
        {
            $response = forbiddenResponse();
            return $response;
        }
        $result = $this->guildGateway->updateMember($id, $member_id, [1,$guild_role]);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem updating member role.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
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

    private function validatePassword($user_id, $password)
    {
        $userGateway = new UserGateway($this->db);
        $result = $userGateway->getPassword($user_id);
        $result = pg_fetch_assoc($result);
        // return password_verify($password, $result['pass']);
        return (new AuthenticationController($this->db))->verifyPassword($password, $result['pass']);
    }
}
?>