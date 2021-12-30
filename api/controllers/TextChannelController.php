<?php
namespace controllers;
use gateways\TextChannelGateway;

class TextChannelController
{
    private $db;
    private $textChannelGateway;

    public function __construct($db)
    {
        $this->db = $db;
        $this->textChannelGateway = new TextChannelGateway($db);
    }

    public function getAllFromGuild($guild_id)
    {
        
    }

    public function getTextChannel($id)
    {

    }

    public function createTextChannel($guild_id, $user_id, $input)
    {

    }

    public function updateTextChannel($id, $user_id, $input)
    {

    }

    public function deleteTextChannel($id, $user_id)
    {

    }
}
?>