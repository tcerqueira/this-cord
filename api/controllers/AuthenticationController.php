<?php
namespace controllers;
use gateways\UserGateway;

class AuthenticationController
{
    private $db;
    private $userGateway;

    public function __construct($db)
    {
        $this->db = $db;
        $this->userGateway = new UserGateway($db);
    }

    public function signUp(Array $input)
    {
        $result = $this->userGateway->insert($input);
        if(!$result)
        {
            $response = internalServerErrorResponse();
            return $response;
        }
        $response = okResponse();
        return $response;
    }

    public function signIn($username, $password)
    {
        $result = $this->userGateway->find('00000000-0000-0000-0000-000000000000', $username);
        $result = pg_fetch_assoc($result);
        $id = $result['id'];
        if(empty($id))
            return false;
        
        $result = $this->userGateway->getPassword($id);
        $result = pg_fetch_assoc($result);
        $hashed_password = $result['pass'];
        if(!password_verify($password, $hashed_password))
            return false;

        return $id;
    }

    public function signOut($id)
    {
        $response = okResponse();
        return $response;
    }

}
?>