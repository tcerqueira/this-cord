CREATE TABLE this_user (
    id UUID DEFAULT md5(random()::text || clock_timestamp()::text)::uuid,
    username VARCHAR(64) NOT NULL,
    pass CHAR(60) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    userstatus SMALLINT NOT NULL DEFAULT 0,
    theme_color CHAR(7) DEFAULT '#7289da',
    user_description TEXT DEFAULT '',
    img_name VARCHAR(64) DEFAULT 'user_default.gif',
    PRIMARY KEY (id)
);

CREATE TABLE guild (
    id UUID DEFAULT md5(random()::text || clock_timestamp()::text)::uuid,
    guildname VARCHAR(64) NOT NULL,
    initials VARCHAR(3) DEFAULT 'SRV',
    admin_id UUID NOT NULL,
    open_invite_key VARCHAR(64) DEFAULT 'this-cord',
    theme_color CHAR(7) DEFAULT '#7289da',
    img_name VARCHAR(64) DEFAULT 'guild_default.gif',
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
    PRIMARY KEY (id),
    FOREIGN KEY (channel_id) REFERENCES text_channel(id) ON DELETE CASCADE
);

CREATE TABLE guild_members (
    guild_id UUID,
    member_id UUID,
    invite_status SMALLINT NOT NULL DEFAULT 0 CHECK(invite_status IN (0,1)), -- 0 - invited; 1 - accepted
    invite_sender UUID,
    guild_role SMALLINT NOT NULL CHECK(guild_role IN (0,1,2)),  -- 0-member; 1-mod; 2-admin
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
);

CREATE UNIQUE INDEX unique_friend_pairs ON this_friends(least(friend_1,friend_2), greatest(friend_1,friend_2));
CREATE INDEX ordered_channel_messages_index ON channel_message(channel_id, sent_at);

CREATE VIEW public_user_VIEW AS
SELECT id, username, userstatus, theme_color, user_description, img_name
FROM this_user;

CREATE OR REPLACE FUNCTION update_reply() RETURNS TRIGGER AS $$
    BEGIN
        UPDATE channel_message SET reply_to=NULL WHERE reply_to=OLD.id;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_delete_message
AFTER DELETE ON channel_message 
FOR EACH ROW
EXECUTE PROCEDURE update_reply();
