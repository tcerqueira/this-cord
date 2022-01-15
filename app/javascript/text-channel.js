const currentTextChannelId = document.getElementById('currentChannelId').dataset.channelId;

render();
async function render()
{
    try {
        const [ myGuilds, channel ] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchTextChannel({ id: currentTextChannelId })
        ]);
        const members = await api.fetchGuildMembers({ id: channel.guild_id });

        renderNav(myGuilds, channel.guild_id);
        renderMembers(members);
        renderChat(messages);

        document.getElementById('inviteToGuildIcon').addEventListener('click', () => {
            openGuildInviteModal(channel.guild_id);
        })
    } catch (err) {
        console.log(err);
    }
}