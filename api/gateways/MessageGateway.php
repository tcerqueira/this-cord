<?php
namespace gateways;
class MessageGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    
}
?>