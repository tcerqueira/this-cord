CREATE TABLE guild (
    id SERIAL,
    guildname VARCHAR(64) NOT NULL,
    admin_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE text_channel (
    id SERIAL,
    channelname VARCHAR(64) NOT NULL,
    guild_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE channel_message (
    id SERIAL,
    channel_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    -- attachment_id (???)
    PRIMARY KEY (id, channel_id)
);

CREATE TABLE user (
    id SERIAL,
    username VARCHAR(64) NOT NULL,
    userstatus INTEGER,
    PRIMARY KEY (id)
);