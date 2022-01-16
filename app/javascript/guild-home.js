const currentGuildlId = document.getElementById('currentGuildId').dataset.guildId;

render();
async function render()
{
    try {
        const [ myGuilds, members ] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchGuildMembers({ id: currentGuildlId })
        ]);

        renderNav(myGuilds, currentGuildlId);
        renderMembers(members);

        document.getElementById('inviteToGuildIcon').addEventListener('click', () => {
            openGuildInviteModal(channel.guild_id);
        })
    } catch (err) {
        console.log(err);
    }
}

document.querySelector('.guild-home-container div').addEventListener('click', () => {
    openCreateChannelModal(currentGuildlId);
});