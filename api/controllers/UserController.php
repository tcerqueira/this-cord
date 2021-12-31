<?php
namespace controllers;
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
        $result = $this->userGateway->findByUsername($username);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem retrieving user.');
            return $response;
        }
        $result = pg_fetch_all($result);
        $response = okResponse($result ? $result : []);
        return $response;
    }

    public function getFriendsList($id)
    {

    }

    public function updateUser($id, $input)
    {
        
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
}
?>