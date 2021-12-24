<?php
namespace controllers;
use gateways\TextChannelGateway;

class TextChannelController
{
    private $db;
    private $textChannelGateway;
    private $id;

    public function __construct($db, $channel_id)
    {
        $this->db = $db;
        $this->textChannelGateway = new TextChannelGateway($db);
        $this->id = $channel_id;
    }

    public function createTextChannel($input)
    {

    }

    public function updateTextChannel($input)
    {

    }

    public function deleteTextChannel($channel_id)
    {

    }
}
?>