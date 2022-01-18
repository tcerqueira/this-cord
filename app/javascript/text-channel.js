const currentTextChannelId = document.getElementById('currentChannelId').dataset.channelId;

render();
async function render() {
    try {
        const [myGuilds, channel, messages] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchTextChannel({ id: currentTextChannelId }),
            api.fetchMessages({ channelId: currentTextChannelId })
        ]);
        const members = await api.fetchGuildMembers({ id: channel.guild_id });
        console.log(messages);
        renderNav(myGuilds, channel.guild_id);
        renderMembers(members);
        renderSendMessage(currentTextChannelId);
        renderChat(messages);

        document.getElementById('inviteToGuildIcon').addEventListener('click', () => {
            openGuildInviteModal(channel.guild_id);
        })
    } catch (err) {
        console.log(err);
    }
}
