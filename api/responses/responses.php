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

function methodNotAllowedResponse()
{
    $response['status_code_header'] = 'HTTP/1.1 405 Method Not Allowed';
    $response['body'] = json_encode([
        'success' => false,
        'error' => 'Invalid HTTP Method.'
    ]);
    return $response;
}

function serviceUnavailableResponse()
{
    $response['status_code_header'] = 'HTTP/1.1 503 Service Unavailable';
    $response['body'] = json_encode([
        'success' => false,
        'error' => 'Lost connection to database.'
    ]);
    return $response;
}

function unprocessableEntityResponse()
{
    $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
    $response['body'] = json_encode([
        'success' => false,
        'error' => 'Invalid input.'
    ]);
    return $response;
}
?>