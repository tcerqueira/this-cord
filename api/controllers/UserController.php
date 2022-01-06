<?php
namespace controllers;

use gateways\TextChannelGateway;
use gateways\UserGateway;
use stdClass;

class UserController
{
    private $db;
    private $userGateway;

    public function __construct($db)
    {
        $this->db = $db;
        $this->userGateway = new UserGateway($db);
    }

    public function getAllUsers()
    {
        $result = $this->userGateway->findAll();
        $result = pg_fetch_all($result);
        $response = okResponse($result ? $result : []);
        return $response;
    }

    public function getUserById($id)
    {
        $result = $this->userGateway->find($id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem retrieving user.');
            return $response;
        }
        $result = pg_fetch_assoc($result);
        $response = okResponse($result ? $result : new stdClass());
        return $response;
    }

    public function searchUser($username)
    {
        $result = $this->userGateway->searchByUsername($username);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem retrieving user.');
            return $response;
        }
        $result = pg_fetch_all($result);
        $response = okResponse($result ? $result : []);
        return $response;
    }

    
    public function updateUser($id, $input)
    {
        $result = $this->userGateway->update($id, [
            'username' => $input['username'],
            'email' => $input['email'],
            'theme_color' => $input['theme_color'],
            'user_description' => $input['user_description']
        ]);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem updating user.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }
    
    public function deleteUser($id)
    {        
        $result = $this->userGateway->delete($id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem deleting user.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }
    
    public function getFriends($id)
    {
        $result = $this->userGateway->findAllFriends($id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem retrieving friends list.');
            return $response;
        }
        $result = pg_fetch_all($result);
        $response = okResponse($result ? $result : []);
        return $response;
    }

    public function requestFriend($user_id, $friend_id)
    {
        $result = $this->userGateway->insertFriend($user_id, $friend_id, $user_id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem sending friend request.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }

    public function addFriend($user_id, $friend_id)
    {
        $result = $this->userGateway->findFriend($user_id, $friend_id);
        $result = pg_fetch_assoc($result);
        if(!$result)
        {
            $response = notFoundResponse();
            return $response;
        }
        if(intval($result['invite_status']) == 1)
        {
            $response = conflictResponse('Already friends.');
            return $response;
        }
        if($result['request_sender'] == $user_id)
        {
            $response = forbiddenResponse();
            return $response;
        }
        
        $channelGateway = new TextChannelGateway($this->db);
        $error = false;
        pg_query($this->db, 'BEGIN');
        $result_channel = $channelGateway->insert([
            '00000000-0000-0000-0000-000000000000',
            '__direct_message',
            true
        ]);
        $result_channel = pg_fetch_assoc($result_channel);
        if(!$result_channel) {
            $error = true;
            // pg_query()
        }
        $result = $this->userGateway->updateFriend($user_id, $friend_id, [
            'invite_status' => 1,
            'message_channel' => $result_channel['id']
        ]);
        if(!$result) $error = true;
        pg_query($this->db, 'COMMIT');

        if($error)
        {
            $response = internalServerErrorResponse('Problem accepting friend request.');
            return $response;
        }
        $result = $this->userGateway->findFriend($user_id, $friend_id);
        $result = pg_fetch_assoc($result);
        $response = okResponse($result);
        return $response;
    }

    public function removeFriend($user_id, $friend_id)
    {
        $result = $this->userGateway->findFriend($user_id, $friend_id);
        $result = pg_fetch_assoc($result);
        if(!$result)
        {
            $response = notFoundResponse();
            return $response;
        }
        $error = false;
        pg_query($this->db, 'BEGIN');
        if(intval($result['invite_status']) == 1)
        {
            $channelGateway = new TextChannelGateway($this->db);
            $result = $channelGateway->delete($result['message_channel']);
            if(!$result) $error = true;
        }
        $result = $this->userGateway->deleteFriend($user_id, $friend_id);
        if(!$result) $error = true;
        pg_query($this->db, 'COMMIT');

        if($error)
            $response = internalServerErrorResponse('Problem removing friend.');
        else
            $response = okResponse(['success' => true]);
        return $response;
    }
}
?>