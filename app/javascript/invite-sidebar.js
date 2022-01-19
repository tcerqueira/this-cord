function renderGuildInvites(guilds) {
    const list = document.getElementById('inviteList');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    guilds.forEach(guild => {
        list.append(createGuildInviteItem(guild));
    })
}

function createGuildInviteItem(guild) {
    const inviteItem = document.getElementById('inviteItemTemplate').cloneNode(true);
    inviteItem.style = '';
    inviteItem.removeAttribute('id');

    inviteItem.querySelector('.icon-card').style = `--icon-bg-color: ${guild.theme_color};`;
    inviteItem.querySelector('span').innerText = guild.guildname;

    // icon click handlers
    inviteItem.querySelector('img[alt=accept-guild-icon]').parentNode.addEventListener('click', async () => {
        try {
            await api.acceptGuildInvite({ id: guild.id });
            const myGuilds = await api.fetchMyGuilds();
            renderNav(myGuilds);
            inviteItem.parentNode.removeChild(inviteItem);
        }
        catch (err) {
            console.log(err);
        }
    })

    inviteItem.querySelector('img[alt=decline-guild-icon]').parentNode.addEventListener('click', async () => {
        try {
            await api.declineGuildInvite({ id: guild.id });
            inviteItem.parentNode.removeChild(inviteItem);
        }
        catch (err) {
            console.log(err);
        }
    })

    return inviteItem;
}