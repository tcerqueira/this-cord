<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ThisCord API</title>
</head>
<body>
    <h1>API Overview</h1>
    <h2>Example usage:</h2>
    <span>// return all users</span> <br>
    <span>GET /user</span> <br>
    <br>
    <span>// return user with id</span> <br>
    <span>GET /user?id=123</span> <br>
    <br>
    <span>// create a user</span> <br>
    <span>POST /user/create/</span> <br>
    <span>Headers:</span> <br>
    <span>Content-Type: application/x-www-form-urlencoded</span> <br>
    <br>
    <span>// update a user</span> <br>
    <span>POST /user/update/</span> <br>
    <span>Headers:</span> <br>
    <span>Content-Type: application/x-www-form-urlencoded</span> <br>
    <br>
    <span>// delete a user</span> <br>
    <span>POST /user/delete/</span> <br>
    <span>Headers:</span> <br>
    <span>Content-Type: application/x-www-form-urlencoded</span> <br>
    <br>
</body>
</html>