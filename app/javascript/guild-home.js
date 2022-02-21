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
        document.getElementById('channelHeader').innerText = 'Welcome to guild !';
        const { guild_role: role } = members.find(m => m.member_id === currentProfileId);
        if(parseInt(role) < 1) {
            document.getElementById('serverHeaderInviteIcon').style.display = 'none';
            document.getElementById('createChannelIcon').style.display = 'none';
        }

        document.getElementById('inviteToGuildIcon').addEventListener('click', () => {
            openGuildInviteModal(currentGuildlId);
        });

        document.querySelector('.title img').addEventListener('click', () => {
            openCreateChannelModal(currentGuildlId);
        });

        document.getElementById('openGuildSettings').onclick = () => {
            window.location.href = `guild-settings.php?guild_id=${currentGuildlId}`;
        }
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