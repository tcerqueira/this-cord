<?php
function internalServerErrorResponse()
{
    $response['status_code_header'] = 'HTTP/1.1 500 Internal Server Error';
    $response['body'] = json_encode([
        'success' => false,
        'error' => 'Internal error.'
    ]);
    return $response;
}
