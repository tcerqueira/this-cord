<?php
function serviceUnavailableResponse()
{
    $response['status_code_header'] = 'HTTP/1.1 503 Service Unavailable';
    $response['body'] = json_encode([
        'success' => false,
        'error' => 'Lost connection to database.'
    ]);
    return $response;
}
?>