<?php
namespace controllers;
use gateways\TextChannelGateway;

class TextChannelController
{
    private $db;
    private $channelGateway;

    public function __construct($db)
    {
        $this->db = $db;
        $this->channelGateway = new TextChannelGateway($db);
    }

    public function getAllFromGuild($guild_id)
    {
        $result = $this->channelGateway->findAllOfGuild($guild_id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem retrieving text channels.');
            return $response;
        }
        $response = okResponse(pg_fetch_all($result));
        return $response;
    }

    public function getTextChannel($id)
    {
        $result = $this->channelGateway->find($id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem retrieving text channel.');
            return $response;
        }
        var_dump(pg_fetch_all($result));
        $response = okResponse(pg_fetch_assoc($result));
        return $response;
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