<?php
namespace gateways;
class TextChannelGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    
}
?>