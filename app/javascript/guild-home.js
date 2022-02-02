const currentGuildlId = document.getElementById('currentGuildId').dataset.guildId;

render();
async function render()
{
    try {
        const [ myGuilds, members, user ] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchGuildMembers({ id: currentGuildlId }),
            api.fetchUser({ id: currentProfileId })
        ]);

        renderNav(myGuilds, currentGuildlId);
        renderMembers(members);
        renderUserbar(user);
        
        const { guildname: currentGuildname } = myGuilds.find(g => g.id===currentGuildlId);
        document.getElementById('guildHeader').innerText = currentGuildname;

        document.getElementById('inviteToGuildIcon').addEventListener('click', () => {
            openGuildInviteModal(currentGuildlId);
        });

        document.querySelector('.page-header').innerText = `Welcome to guild`;
        document.querySelector('.title > img').addEventListener('click', () => {
            openCreateChannelModal(currentGuildlId);
        });
    } catch (err) {
        console.log(err);
        openErrorModal(err.error, () => {
            window.location.href = 'login.php';
        });
    }
}

document.querySelector('.guild-home-container div').addEventListener('click', () => {
    openCreateChannelModal(currentGuildlId);
});