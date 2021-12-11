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

    public function deleteUser($id, $password)
    {
        $result = $this->userGateway->getPassword($id);
        $result = pg_fetch_assoc($result);
        $hashed_password = $result['pass'];
        if(!password_verify($password, $hashed_password))
        {
            $response = unauthorizedResponse('Could not authenticate.');
            return $response;
        }
        
        $result = $this->userGateway->delete($id);
        if(!$result)
        {
            $response = internalServerErrorResponse();
        }
        else
        {
            $response = okResponse([
                'rows_affected' => pg_affected_rows($result)
            ]);
        }
        return $response;
    }
}
?>