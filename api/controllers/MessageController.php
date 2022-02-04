<?php
namespace controllers;
use gateways\MessageGateway;
use stdClass;

class MessageController
{
    private $db;
    private $messageGateway;

    public function __construct($db)
    {
        $this->db = $db;
        $this->messageGateway = new MessageGateway($db);
    }

    public function getMessage($id)
    {
        $result = $this->messageGateway->find($id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem retrieving message.');
            return $response;
        }
        $result = pg_fetch_assoc($result);
        $response = okResponse($result ? $result : new stdClass());
        return $response;
    }

    public function getFromChannel($channel_id, $params = [])
    {
        $since = $params['since'] ? $params['since'] : date('Y-m-d H:i:se', 0);
        $until = $params['until'] ? $params['until'] : null;
        $result = $this->messageGateway->findInChannel($channel_id, $since, $until);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem retrieving messages of channel.');
            return $response;
        }
        $result_arr = [];
        while($row = pg_fetch_assoc($result)) {
            $res = $this->messageObjectFromResult($row);
            array_push($result_arr, $res);
        }
        $response = okResponse($result_arr);
        return $response;
    }

    public function createMessage($channel_id, $author_id, $input)
    {
        $result = $this->messageGateway->insert([
            'channel_id' => $channel_id,
            'author_id' => $author_id,
            'reply_to' => $input['reply_to'],
            'content' => $input['content']
        ]);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem sending message.');
            return $response;
        }
        $result = pg_fetch_assoc($result);
        $result = $this->messageGateway->find($result['id']);
        $result = pg_fetch_assoc($result);
        $result = $this->messageObjectFromResult($result);
        $response = okResponse($result);
        return $response;
    }

    public function updateMessage($id, $input)
    {
        $result = $this->messageGateway->update($id, [
            'content' => $input['content']
        ]);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem editing message.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }

    public function deleteMessage($id)
    {
        $result = $this->messageGateway->delete($id);
        if(!$result)
        {
            $response = internalServerErrorResponse('Problem deleting message.');
            return $response;
        }
        $response = okResponse(['success' => true]);
        return $response;
    }

    private function messageObjectFromResult($result)
    {
        $reply_res = null;
        if($result['reply_to'] != null) {
            $reply_aux = $this->messageGateway->find($result['reply_to']);
            $reply_aux = pg_fetch_assoc($reply_aux);
            if(!$reply_res) {
                $reply_res = null;
            }
            $reply_res = array_merge($reply_aux, [
                'author' => [
                    'id' => $reply_aux['author_id'],
                    'username' => $reply_aux['username'],
                    'theme_color' => $reply_aux['theme_color']
                ]
            ]);
        }
        $res = [
            'id' => $result['id'],
            'channel_id' => $result['channel_id'],
            'sent_at' => $result['sent_at'],
            'content' => $result['content'],
            'author' => [
                'id' => $result['author_id'],
                'username' => $result['username'],
                'theme_color' => $result['theme_color'],
                'img_name' => $result['img_name']
            ],
            'reply' => $reply_res
        ];
        return $res;
    }
}
