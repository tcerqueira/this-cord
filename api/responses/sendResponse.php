<?php
function sendResponse($response)
{
    header($response['status_code_header']);
    if ($response['body']) {
        echo $response['body'];
    }
}
?>