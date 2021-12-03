<?php
function methodNotAllowedResponse()
{
    $response['status_code_header'] = 'HTTP/1.1 405 Method Not Allowed';
    $response['body'] = json_encode([
        'success' => false,
        'error' => 'Invalid HTTP Method.'
    ]);
    return $response;
}
?>