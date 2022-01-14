const currentTextChannelId = document.getElementById('currentChannelId').dataset.channelId;

render();
async function render()
{
    try {
        const [ myGuilds, channel ] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchTextChannel({ id: currentTextChannelId })
        ]);
        
        const [ members, textChannels ] = await Promise.all([
            api.fetchGuildMembers({ id: channel.guild_id }),
            api.fetchAllChannels({guildId : channel.guild_id})
        ]);

        renderNav(myGuilds, channel.guild_id);
        renderMembers(members);
        renderChat(messages);
        renderTextChannels(textChannels, currentTextChannelId);
    } catch (err) {
        console.log(err);
    }
}

