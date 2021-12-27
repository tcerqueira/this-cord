<?php
namespace gateways;
class GuildGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    
}
?>