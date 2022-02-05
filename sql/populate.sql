-- ADMIN
INSERT INTO this_user (id, username, pass, email, user_description)
    VALUES ('00000000-0000-0000-0000-000000000000', 'admin', '$2y$11$Z.6NTgEuOU2SjttPTVgbK.gH62V70XUWThR6rLlfegdA7xDnHvMFu', 'admin@admin.com', 'admin account');
INSERT INTO guild (id, guildname, initials, admin_id) VALUES ('00000000-0000-0000-0000-000000000000', '__direct_messages', '_DM', '00000000-0000-0000-0000-000000000000');
-- -----

INSERT INTO this_user (username, pass, email) VALUES ('lou', 'lou', 'lou@mail.com');
INSERT INTO this_user (username, pass, email) VALUES ('pa99', 'pa99', 'pa99@mail.com');

INSERT INTO guild (guildname, admin_id) VALUES ('feup', 'fa999d1b-a41e-5f9a-c8d8-e83cc500d64e');

INSERT INTO text_channel (channelname, guild_id) VALUES ('general', '8ee69718-f66e-09d8-d950-4641b1b4056a');

INSERT INTO channel_message (channel_id, author_id, content) VALUES ('2b05c9fd-321c-ef14-13dd-35816e0655ea', 'fa999d1b-a41e-5f9a-c8d8-e83cc500d64e', 'Bem vindos');
INSERT INTO channel_message (channel_id, author_id, content) VALUES ('2b05c9fd-321c-ef14-13dd-35816e0655ea', 'd22c4846-ccad-4cca-d59e-911dea0c6201', 'Olá lou!');