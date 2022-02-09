const currentGuildId = document.getElementById('currentGuildId').dataset.guildId;
const currentInviteKey = document.getElementById('currentInviteKey').dataset.inviteKey;
const currentGuildname = document.getElementById('currentGuildname').dataset.guildname;
const currentGuildAvatar = document.getElementById('currentGuildAvatar').dataset.guildAvatar;

render();
async function render() {
    try {
        document.getElementById('guildname').innerText = currentGuildname;
        document.querySelector('.display-prompt img').src = `${api.imgUrl}/${currentGuildAvatar}`;

        document.getElementById('joinBtn').onclick = async () => {
            try {
                await api.joinGuild({
                    guildId: currentGuildId,
                    inviteKey: currentInviteKey
                });
                const myGuilds = await api.fetchMyGuilds();
                const guild = myGuilds.find(g => g.id === currentGuildId);

                document.querySelector('.display-prompt').style.display = 'none';
                document.querySelector('.display-success').style.display = 'flex';
                if(guild.channels.length === 0)
                    document.querySelector('.display-success a').href = `guild-home.php?id=${currentGuildId}`;
                else
                    document.querySelector('.display-success a').href = `text-channel.php?id=${guild.channels[0]}`;
            }
            catch (err) {
                console.log(err);
                document.querySelector('.display-prompt').style.display = 'none';
                document.querySelector('.display-failure').style.display = 'flex';
            }
        }
    }
    catch (err) {
        console.log(err);
        document.querySelector('.display-prompt').style.display = 'none';
        document.querySelector('.display-failure').style.display = 'flex';
    }
}