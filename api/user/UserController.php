<?php

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

    public function getUser($id)
    {
        $result = $this->userGateway->find($id);
        $result = pg_fetch_assoc($result);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    public function createUser(array $input)
    {
        $result = $this->userGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = json_encode(array('success' => true));
        if(!$result)
        {
            $response['body'] = json_encode(array('success' => false, 'message' => pg_result_error($result)));
        }
        return $response;
    }
}
?>