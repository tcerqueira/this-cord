<?php

function okResponse($fields = [])
{
    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode($fields ? $fields : []);
    return $response;
}

function internalServerErrorResponse($error_msg = 'Internal server error.')
{
    $response['status_code_header'] = 'HTTP/1.1 500 Internal Server Error';
    $response['body'] = json_encode([
        'success' => false,
        'error' => $error_msg
    ]);
    return $response;
}

function methodNotAllowedResponse($error_msg = 'Invalid HTTP Method.')
{
    $response['status_code_header'] = 'HTTP/1.1 405 Method Not Allowed';
    $response['body'] = json_encode([
        'success' => false,
        'error' => $error_msg
    ]);
    return $response;
}

function serviceUnavailableResponse($error_msg = 'No connection to database.')
{
    $response['status_code_header'] = 'HTTP/1.1 503 Service Unavailable';
    $response['body'] = json_encode([
        'success' => false,
        'error' => $error_msg
    ]);
    return $response;
}

function unprocessableEntityResponse($error_msg = 'Invalid input.')
{
    $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
    $response['body'] = json_encode([
        'success' => false,
        'error' => $error_msg
    ]);
    return $response;
}

function unauthorizedResponse($error_msg = 'Authentication required.')
{
    $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
    $response['body'] = json_encode([
        'success' => false,
        'error' => $error_msg
    ]);
    return $response;
}

function forbiddenResponse($error_msg = 'Permission denied.')
{
    $response['status_code_header'] = 'HTTP/1.1 403 Forbidden';
    $response['body'] = json_encode([
        'success' => false,
        'error' => $error_msg
    ]);
    return $response;
}

function conflictResponse($error_msg = 'Resource already exists.')
{
    $response['status_code_header'] = 'HTTP/1.1 409 Conflict';
    $response['body'] = json_encode([
        'success' => false,
        'error' => $error_msg
    ]);
    return $response;
}

function notFoundResponse($error_msg = 'Not found.')
{
    $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
    $response['body'] = json_encode([
        'success' => false,
        'error' => $error_msg
    ]);
    return $response;
}
?>