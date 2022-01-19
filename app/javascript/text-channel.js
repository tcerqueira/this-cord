const currentTextChannelId = document.getElementById('currentChannelId').dataset.channelId;

render();
async function render() {
    try {
        const [myGuilds, channel, messages] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchTextChannel({ id: currentTextChannelId }),
            api.fetchMessages({ channelId: currentTextChannelId })
        ]);
        
        const [ members, textChannels ] = await Promise.all([
            api.fetchGuildMembers({ id: channel.guild_id }),
            api.fetchAllChannels({guildId : channel.guild_id})
        ]);

        renderNav(myGuilds, channel.guild_id);
        renderMembers(members);
        renderSendMessage(currentTextChannelId);
        renderChat(messages);
        renderTextChannels(textChannels, currentTextChannelId);

        document.getElementById('inviteToGuildIcon').addEventListener('click', () => {
            openGuildInviteModal(channel.guild_id);
        });

        document.querySelector('.page-header').innerText = `# ${channel.channelname}`;

    } catch (err) {
        console.log(err);
    }
}
