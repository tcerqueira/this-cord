CREATE TABLE this_user (
    id UUID DEFAULT md5(random()::text || clock_timestamp()::text)::uuid,
    username VARCHAR(64) NOT NULL,
    pass CHAR(60) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    userstatus SMALLINT NOT NULL DEFAULT 0,
    theme_color CHAR(7) DEFAULT '#7289da',
    user_description TEXT DEFAULT '',
    img_name VARCHAR(50) DEFAULT 'img_default.jpg',
    PRIMARY KEY (id)
);

CREATE TABLE guild (
    id UUID DEFAULT md5(random()::text || clock_timestamp()::text)::uuid,
    guildname VARCHAR(64) NOT NULL,
    initials VARCHAR(3) DEFAULT 'SRV',
    admin_id UUID NOT NULL,
    open_invite_key VARCHAR(64) DEFAULT 'this-cord',
    theme_color CHAR(7) DEFAULT '#7289da',
    img_name VARCHAR(50) DEFAULT 'img_default.jpg',
    PRIMARY KEY (id),
    FOREIGN KEY (admin_id) REFERENCES this_user(id)
);

CREATE TABLE text_channel (
    id UUID DEFAULT md5(random()::text || clock_timestamp()::text)::uuid,
    channelname VARCHAR(64) NOT NULL,
    guild_id UUID NOT NULL,
    is_direct_message BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (guild_id) REFERENCES guild(id) ON DELETE CASCADE
);

CREATE TABLE channel_message (
    id UUID DEFAULT md5(random()::text || clock_timestamp()::text)::uuid,
    channel_id UUID NOT NULL,
    author_id UUID NOT NULL,
    reply_to UUID,
    sent_at TIMESTAMPTZ DEFAULT Now(),
    content TEXT NOT NULL,
    -- attachment_id (???)
    PRIMARY KEY (id),
    FOREIGN KEY (channel_id) REFERENCES text_channel(id) ON DELETE CASCADE
);

CREATE TABLE guild_members (
    guild_id UUID,
    member_id UUID,
    invite_status SMALLINT NOT NULL DEFAULT 0 CHECK(invite_status IN (0,1)), -- 0 - invited; 1 - accepted
    invite_sender UUID,
    guild_role SMALLINT NOT NULL CHECK(guild_role IN (0,2)),
    PRIMARY KEY (guild_id, member_id),
    FOREIGN KEY (guild_id) REFERENCES guild(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES this_user(id) ON DELETE CASCADE
);

CREATE TABLE this_friends (
    friend_1 UUID CHECK(friend_1<>friend_2),
    friend_2 UUID CHECK(friend_2<>friend_1),
    invite_status SMALLINT NOT NULL DEFAULT 0 CHECK(invite_status IN (0,1)), -- 0 - invited; 1 - accepted
    request_sender UUID CHECK(friend_1=request_sender OR friend_2=request_sender),
    message_channel UUID,
    PRIMARY KEY (friend_1, friend_2),
    FOREIGN KEY (friend_1) REFERENCES this_user(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_2) REFERENCES this_user(id) ON DELETE CASCADE,
    FOREIGN KEY (request_sender) REFERENCES this_user(id) ON DELETE CASCADE,
    FOREIGN KEY (message_channel) REFERENCES text_channel(id) ON DELETE CASCADE
    -- UNIQUE (friend_1, friend_2)
    -- CONSTRAINT U_Friendship UNIQUE (LEAST(friend_1, friend_2), GREATEST(friend_1, friend_2))
);

CREATE UNIQUE INDEX unique_friend_pairs ON this_friends(least(friend_1,friend_2), greatest(friend_1,friend_2));

CREATE VIEW public_user_VIEW AS
SELECT id, username, userstatus, theme_color, user_description
FROM this_user;

