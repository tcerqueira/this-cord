<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ThisCord API</title>
</head>
<style>
.endpoint-container {
    max-width: 600px;
}

.endpoint-container > div {
    display: flex;
}

code {
    width: 50%;
    display: block;
    white-space: pre-wrap;
    margin-inline: 2rem;
    padding: 0 1em 1em 1em;
    border: 1px solid grey;
    border-radius: 4px;
    background-color: lightgray;
}

h2 {
    margin-top: 3rem;
    text-align: center;
}
</style>
<body>
    <h1>API Overview</h1>
    <nav>
        <ol>
            <li>
                <a href="#authentication">Authentication</a>
                <ol>
                    <li><a href="#signin">Sign in</a></li>
                    <li><a href="#signup">Sign up</a></li>
                    <li><a href="#signout">Sign out</a></li>
                    <li><a href="#profile">Get profile of logged user</a></li>
                    <li><a href="#change-password">Change password</a></li>
                </ol>
            </li>
            <li>
                <a href="#user">User</a>
                <ol>
                    <li><a href="#user-id">Get User by ID</a></li>
                    <li><a href="#user-name">Search User by username</a></li>
                    <li><a href="#user-update">Update User</a></li>
                    <li><a href="#user-avatar">Update User avatar</a></li>
                    <li><a href="#user-delete">Delete User</a></li>
                </ol>
            </li>
            <li>
                <a href="#friends">Friends</a>
                <ol>
                    <li><a href="#friend-list">List Friends</a></li>
                    <li><a href="#friend-get">Get a Friend</a></li>
                    <li><a href="#friend-request">Request Friend</a></li>
                    <li><a href="#friend-accept">Accept Friend</a></li>
                    <li><a href="#friend-decline">Decline Friend</a></li>
                    <li><a href="#friend-remove">Remove Friend</a></li>
                </ol>
            </li>
            <li>
                <a href="#guild">Guild</a>
                <ol>
                    <li><a href="#guild-get">Get a Guild</a></li>
                    <li><a href="#guild-my">Get my Guilds</a></li>
                    <li><a href="#guild-create">Create Guild</a></li>
                    <li><a href="#guild-update">Update Guild</a></li>
                    <li><a href="#guild-avatar">Update Guild avatar</a></li>
                    <li><a href="#guild-admin">Transfer Guild admin</a></li>
                    <li><a href="#guild-leave">Leave Guild</a></li>
                    <li><a href="#guild-delete">Delete Guild</a></li>
                </ol>
            </li>
            <li>
                <a href="#members">Guild members</a>
                <ol>
                    <li><a href="#members-get">Get Members</a></li>
                    <li><a href="#members-update">Update Member role</a></li>
                    <li><a href="#members-kick">Kick Member</a></li>
                </ol>
            </li>
            <li>
                <a href="#invites">Guild invites</a>
                <ol>
                    <li><a href="#invite-list">List guild invites</a></li>
                    <li><a href="#invite-toguild">Invite to guild</a></li>
                    <li><a href="#invite-generate">Generate open guild invite</a></li>
                    <li><a href="#invite-answer">Answer guild invite</a></li>
                    <li><a href="#invite-join">Join guild with open invite</a></li>
                </ol>
            </li>
            <li>
                <a href="#channel">Text channel</a>
                <ol>
                    <li><a href="#channel-get">Get text channel</a></li>
                    <li><a href="#channel-all">Get all text channels from a guild</a></li>
                    <li><a href="#channel-create">Create text channel</a></li>
                    <li><a href="#channel-update">Update text channel</a></li>
                    <li><a href="#channel-delete">Delete text channel</a></li>
                </ol>
            </li>
            <li>
                <a href="#message">Message</a>
                <ol>
                    <li><a href="#message-get">Get message</a></li>
                    <li><a href="#message-all">Get messages from channel</a></li>
                    <li><a href="#message-send">Send message</a></li>
                    <li><a href="#message-edit">Edit message</a></li>
                    <li><a href="#message-delete">Delete message</a></li>
                </ol>
            </li>
        </ol>
    </nav>
    <section id="authentication">
        <h2>Authentication endpoints</h2>
        <div id="signin" class="endpoint-container">
            <h3>// Sign in</h3>
            <p>POST /api/auth/signin.php</p>
            <div>
<code>
// Request
{
    username,
    password
}
</code>
<code>
// Response
{
    id
}
</code>
            </div>
        </div>
        <div id="signup" class="endpoint-container">
            <h3>// Sign up</h3>
            <p>POST /api/auth/signup.php</p>
            <div>
<code>
// Request
{
    username,
    email,
    password
}
</code>
<code>
// Response
{
    id
}
</code>
            </div>
        </div>
        <div id="signout" class="endpoint-container">
            <h3>// Sign out</h3>
            <p>POST /api/auth/signout.php</p>
            <div>
<code>

</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="profile" class="endpoint-container">
            <h3>// Get profile of logged user</h3>
            <p>GET /api/auth/profile.php</p>
            <div>
<code>
    
</code>
<code>
// Response
{
    id,
    username,
    userstatus,
    theme_color,
    user_description,
    img_name,
    email,
    pass
}
</code>
            </div>
        </div>
        <div id="change-password" class="endpoint-container">
            <h3>// Change password</h3>
            <p>POST /api/auth/change-password.php</p>
            <div>
<code>
// Request
{
    old_password,
    new_password
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
    </section>
    <section id="user">
        <h2>User endpoints</h2>
        <div id="user-id" class="endpoint-container">
            <h3>// Get User by ID</h3>
            <p>GET /api/r/user/?id=c00171c5-65ae-09e9-d226-9958b7ffff11</p>
            <div>
<code>

</code>
<code>
// Response
{
    id,
    username,
    userstatus,
    theme_color,
    user_description,
    img_name
}
</code>
            </div>
        </div>
        <div id="user-name" class="endpoint-container">
            <h3>// Search User by username</h3>
            <p>GET /api/r/user/?username=resende</p>
            <div>
<code>

</code>
<code>
// Response
{
    id,
    username,
    userstatus,
    theme_color,
    user_description,
    img_name
}
</code>
            </div>
        </div>
        <div id="user-update" class="endpoint-container">
            <h3>// Update User</h3>
            <p>POST /api/r/user/update.php</p>
            <div>
<code>
// Request
{
    username,
    email,
    theme_color,
    user_description
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="user-avatar" class="endpoint-container">
            <h3>// Update User avatar</h3>
            <p>POST /api/r/user/update-avatar.php</p>
            <div>
<code>
// Request
{
    user_avatar (binary)
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="user-delete" class="endpoint-container">
            <h3>// Delete User</h3>
            <p>POST /api/r/user/delete.php</p>
            <div>
<code>
// Request
{
    password
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
    </section>
    <section id="friends">
        <h2>Friends endpoints</h2>
        <div id="friend-list" class="endpoint-container">
            <h3>// List Friends</h3>
            <p>GET /api/r/user/friends/</p>
            <div>
<code>

</code>
<code>
// Response
[{
    id,
    username,
    theme_color,
    user_description,
    userstatus,
    img_name,
    inivite_status,
    message_channel,
    request_sender
}]
</code>
            </div>
        </div>
        <div id="friend-get" class="endpoint-container">
            <h3>// Get a Friend</h3>
            <p>GET /api/r/user/friends/?id=c00171c5-65ae-09e9-d226-9958b7ffff11</p>
            <div>
<code>

</code>
<code>
// Response
{
    id,
    username,
    theme_color,
    user_description,
    userstatus,
    img_name,
    inivite_status,
    message_channel,
    request_sender
}
</code>
            </div>
        </div>
        <div id="friend-request" class="endpoint-container">
            <h3>// Request Friend</h3>
            <p>POST /api/r/user/friends/request.php</p>
            <div>
<code>
// Request
{
    friend_id
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="friend-accept" class="endpoint-container">
            <h3>// Accept Friend</h3>
            <p>POST /api/r/user/friends/accept.php</p>
            <div>
<code>
// Request
{
    friend_id
}
</code>
<code>
// Response
{
    id,
    username,
    theme_color,
    user_description,
    userstatus,
    img_name,
    inivite_status,
    message_channel,
    request_sender
}
</code>
            </div>
        </div>
        <div id="friend-decline" class="endpoint-container">
            <h3>// Decline Friend</h3>
            <p>GET /api/r/user/friends/decline.php</p>
            <div>
<code>
// Request
{
    friend_id
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="friend-remove" class="endpoint-container">
            <h3>// Remove Friend</h3>
            <p>POST /api/r/user/friends/remove.php</p>
            <div>
<code>
// Request
{
    friend_id
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
    </section>
    <section id="guild">
        <h2>Guild endpoints</h2>
        <div id="guild-get" class="endpoint-container">
            <h3>// Get a Guild</h3>
            <p>GET /api/r/guild/?id=2a5864ba-f83a-57af-bcf9-8502f2c1bc09</p>
            <div>
<code>
    
</code>
<code>
// Response
{
    id,
    guildname,
    initials,
    theme_color,
    img_name,
    channels: [ id ],
    admin: {
        id,
        username,
        theme_color,
        userstatus,
        user_description,
        img_name
    }
}
</code>
            </div>
        </div>
        <div id="guild-my" class="endpoint-container">
            <h3>// Get my Guilds</h3>
            <p>GET /api/r/guild/my.php</p>
            <div>
<code>
    
</code>
<code>
// Response
{
    id,
    guildname,
    initials,
    theme_color,
    img_name,
    channels: [ id ],
    admin: {
        id,
        username,
        theme_color,
        userstatus,
        user_description,
        img_name
    }
}
</code>
            </div>
        </div>
        <div id="guild-create" class="endpoint-container">
            <h3>// Create Guild</h3>
            <p>POST /api/r/guild/create.php</p>
            <div>
<code>
// Request
{
    guildname,
    initials,
    theme_color,
    open_invite_key?
}
</code>
<code>
// Response
{
    id
}
</code>
            </div>
        </div>
        <div id="guild-update" class="endpoint-container">
            <h3>// Update Guild</h3>
            <p>POST /api/r/guild/update.php</p>
            <div>
<code>
// Request
{
    guild_id,
    guildname?,
    initials?,
    theme_color?,
    open_invite_key?
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="guild-avatar" class="endpoint-container">
            <h3>// Update Guild avatar</h3>
            <p>POST /api/r/guild/update-avatar.php</p>
            <div>
<code>
// Request
{
    guild_id,
    guild_avatar (binary)
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="guild-admin" class="endpoint-container">
            <h3>// Transfer Guild admin</h3>
            <p>POST /api/r/guild/transfer-admin.php</p>
            <div>
<code>
// Request
{
    guild_id,
    new_admin,
    password
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="guild-leave" class="endpoint-container">
            <h3>// Leave Guild</h3>
            <p>POST /api/r/guild/leave.php</p>
            <div>
<code>
// Request
{
    guild_id
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="guild-delete" class="endpoint-container">
            <h3>// Delete Guild</h3>
            <p>POST /api/r/guild/delete.php</p>
            <div>
<code>
// Request
{
    guild_id,
    password
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
    </section>
    <section id="members">
        <h2>Guild members endpoints</h2>
        <div id="members-get" class="endpoint-container">
            <h3>// Get Members</h3>
            <p>GET /api/r/guild/members/?id=2a5864ba-f83a-57af-bcf9-8502f2c1bc09</p>
            <div>
<code>

</code>
<code>
// Response
[{
    member_id,
    username,
    theme_color,
    user_description,
    img_name,
    userstatus,
    guild_role,
    inivite_status,
    invite_sender
}]
</code>
            </div>
        </div>
        <div id="members-update" class="endpoint-container">
            <h3>// Update Member role</h3>
            <p>POST /api/r/guild/members/role.php</p>
            <div>
<code>
// Request
{
    guild_id,
    member_id,
    guild_role
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="members-kick" class="endpoint-container">
            <h3>// Kick Member</h3>
            <p>POST /api/r/guild/members/kick.php</p>
            <div>
<code>
// Resquest
{
    guild_id,
    member_id
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
    </section>
    <section id="invites">
        <h2>Guild invites endpoints</h2>
        <div id="invite-list" class="endpoint-container">
            <h3>// List guild invites</h3>
            <p>GET /api/r/guild/invite/list.php</p>
            <div>
<code>

</code>
<code>
// Response
{
    id,
    guildname,
    initials,
    theme_color,
    img_name,
    channels: [ id ]
}
</code>
            </div>
        </div>
        <div id="invite-toguild" class="endpoint-container">
            <h3>// Invite to guild</h3>
            <p>POST /api/r/guild/invite/</p>
            <div>
<code>
// Request
{
    guild_id,
    added_user_id
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="invite-generate" class="endpoint-container">
            <h3>// Generate open guild invite</h3>
            <p>GET /api/r/guild/invite/generate.php?guild_id=2a5864ba-f83a-57af-bcf9-8502f2c1bc09</p>
            <div>
<code>

</code>
<code>
// Response
{
    guild_id,
    open_invite_key
}
</code>
            </div>
        </div>
        <div id="invite-answer" class="endpoint-container">
            <h3>// Answer guild invite</h3>
            <p>POST /api/r/guild/invite/answer.php?guild_id=2a5864ba-f83a-57af-bcf9-8502f2c1bc09</p>
            <div>
<code>
// Request
{
    guild_id,
    answer
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="invite-join" class="endpoint-container">
            <h3>// Join guild with open invite</h3>
            <p>POST /api/r/guild/invite/open.php</p>
            <div>
<code>
// Request
{
    guild_id,
    open_invite_key
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
    </section>
    <section id="channel">
        <h2>Text channel endpoints</h2>
        <div id="channel-get" class="endpoint-container">
            <h3>// Get text channel</h3>
            <p>GET /api/r/text-channel/?channel_id=9fe6fe9d-ed83-6bad-2c9c-8a33fab5d803</p>
            <div>
<code>

</code>
<code>
// Response
{
    id,
    channelname,
    guild_id,
    is_direct_message
}
</code>
            </div>
        </div>
        <div id="channel-all" class="endpoint-container">
            <h3>// Get all text channels from a guild</h3>
            <p>GET /api/r/text-channel/?guild_id=2a5864ba-f83a-57af-bcf9-8502f2c1bc09</p>
            <div>
<code>

</code>
<code>
// Response
[{
    id,
    channelname,
    guild_id,
    is_direct_message
}]
</code>
            </div>
        </div>
        <div id="channel-create" class="endpoint-container">
            <h3>// Create text channel</h3>
            <p>POST /api/r/text-channel/create.php</p>
            <div>
<code>
// Request
{
    guild_id,
    channelname
}
</code>
<code>
// Response
{
    id
}
</code>
            </div>
        </div>
        <div id="channel-update" class="endpoint-container">
            <h3>// Update text channel</h3>
            <p>POST /api/r/text-channel/update.php</p>
            <div>
<code>
// Request
{
    channel_id,
    channelname
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="channel-delete" class="endpoint-container">
            <h3>// Delete text channel</h3>
            <p>POST /api/r/text-channel/delete.php</p>
            <div>
<code>
// Request
{
    channel_id
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
    </section>
    <section id="message">
        <h2>Message endpoints</h2>
        <div id="message-get" class="endpoint-container">
            <h3>// Get message</h3>
            <p>GET /api/r/message/?message_id=9fe6fe9d-ed83-6bad-2c9c-8a33fab5d803</p>
            <div>
<code>

</code>
<code>
// Response
{
    id,
    channel_id,
    author_id,
    reply_to,
    sent_at,
    content,
    username,
    theme_color,
    img_name
}
</code>
            </div>
        </div>
        <div id="message-all" class="endpoint-container">
            <h3>// Get messages from channel</h3>
            <p>GET /api/r/mesasagr/?channel_id=9fe6fe9d-ed83-6bad-2c9c-8a33fab5d803&since=2022-02-02%2000:50:07.01932-00&until=2022-02-02%2000:50:07.01932-00</p>
            <div>
<code>

</code>
<code>
// Response
{
    id,
    channel_id,
    sent_at,
    content,
    author: {
        id,
        username,
        theme_color,
        img_name
    },
    reply: {
        id,
        channel_id,
        sent_at,
        content,
        author: {
            id,
            username,
            theme_color,
            img_name
        },
        reply_to
    }
}
</code>
            </div>
        </div>
        <div id="message-send" class="endpoint-container">
            <h3>// Send message</h3>
            <p>POST /api/r/message/send.php</p>
            <div>
<code>
// Request
{
    channel_id,
    reply_to,
    content
}
</code>
<code>
// Response
{
    id,
    channel_id,
    sent_at,
    content,
    author: {
        id,
        username,
        theme_color,
        img_name
    },
    reply: {
        id,
        channel_id,
        sent_at,
        content,
        author: {
            id,
            username,
            theme_color,
            img_name
        },
        reply_to
    }
}
</code>
            </div>
        </div>
        <div id="message-edit" class="endpoint-container">
            <h3>// Edit message</h3>
            <p>POST /api/r/message/edit.php</p>
            <div>
<code>
// Request
{
    message_id,
    content
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
        <div id="message-delete" class="endpoint-container">
            <h3>// Delete message</h3>
            <p>POST /api/r/message/delete.php</p>
            <div>
<code>
// Request
{
    message_id
}
</code>
<code>
// Response
{
    success
}
</code>
            </div>
        </div>
    </section>
</body>
</html>