<?php
namespace controllers;
use gateways\UserGateway;

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
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    public function getUserById($id)
    {
        $result = $this->userGateway->find($id);
        $result = pg_fetch_assoc($result);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    public function getUserByUsername($username)
    {
        $result = $this->userGateway->find(0, $username);
        $result = pg_fetch_assoc($result);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    // public function createUser(Array $input)
    // {
    //     $result = $this->userGateway->insert($input);
    //     if(!$result)
    //     {
    //         $response = internalServerErrorResponse();
    //     }
    //     $response['status_code_header'] = 'HTTP/1.1 201 Created';
    //     $response['body'] = json_encode(array('success' => true));
    //     return $response;
    // }

    public function updateUser($id, Array $input)
    {
        
    }

    public function deleteUserById($id)
    {
        $result = $this->userGateway->delete($id);
        $response = $this->handleDeleteUserResponse($result);
        return $response;
    }

    public function deleteUserByUsername($username)
    {
        $result = $this->userGateway->delete(0, $username);
        $response = $this->handleDeleteUserResponse($result);
        return $response;
    }

    private function handleDeleteUserResponse($result)
    {
        if(!$result)
        {
            $response = internalServerErrorResponse();
        }
        else
        {
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            $response['body'] = json_encode([
                'success' => true,
                'rows_affected' => pg_affected_rows($result)
            ]);
        }
        return $response;
    }
}
?>