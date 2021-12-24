<?php
namespace controllers;
use gateways\MessageGateway;

class MessageController
{
    private $db;
    private $messageGateway;

    public function __construct($db)
    {
        $this->db = $db;
        $this->messageGateway = new MessageGateway($db);
    }

    public function getMessagesFromChannel($channel_id, $params)
    {

    }

    public function createMessage($channel_id, $input)
    {

    }

    public function updateMessage($id, $input)
    {

    }

    public function deleteMessage($id)
    {

    }
}
?>