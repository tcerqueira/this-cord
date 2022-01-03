<?php
namespace controllers;

use gateways\GuildGateway;
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
        $guildGateway = new GuildGateway($this->db);
        $error = false;

        pg_query($this->db, 'BEGIN');

        $result = $this->userGateway->insert($input);
        $result = pg_fetch_assoc($result);
        if(!$result) $error = true;
        $id = $result['id'];

        $result = $guildGateway->insertMember('00000000-0000-0000-0000-000000000000', [
            $id,
            1,
            '00000000-0000-0000-0000-000000000000',
            0
        ]);
        if(!$result) $error = true;
        pg_query($this->db, 'COMMIT');

        if($error)
            $response = internalServerErrorResponse();
        else
            $response = okResponse(['id' => $id]);
        return $response;
    }

    public function signIn($username, $password)
    {
        $result_user = $this->userGateway->findByUsername($username);
        $result_user = pg_fetch_assoc($result_user);
        $id = $result_user['id'];
        if(empty($id))
            return false;
        
        $result = $this->userGateway->getPassword($id);
        $result = pg_fetch_assoc($result);
        $hashed_password = $result['pass'];
        if(!password_verify($password, $hashed_password))
            return false;
        
        $result = $this->userGateway->updateStatus($result_user['id'], 1);
        if(!$result)
            return false;
        return $id;
    }

    public function signOut($id)
    {
        $result = $this->userGateway->updateStatus($id, 0);
        $response = okResponse(['success' => true]);
        return $response;
    }

}
?>