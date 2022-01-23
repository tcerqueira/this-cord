function renderNav(myGuilds, currentId = null)
{
    const serversContainer = document.getElementById('guilds-container');
    while(serversContainer.firstChild) {
        serversContainer.removeChild(serversContainer.firstChild);
    }
    let isHome = true;
    myGuilds.forEach((server) => {
        const isCurrent = server.id === currentId;
        const serverCard = renderServerCard(server, isCurrent);
        serversContainer.append(serverCard);
        if(isCurrent)
            isHome = false;
    });
    if(isHome)
        document.querySelector('.icon-card[data-tooltip=Home]').classList.add('current-server');
}

document.getElementById('createGuildNavIcon').onclick = () => {
    openCreateGuildModal();
};

document.getElementById('logoutIcon').addEventListener('click', async () => {
    try {
        await api.signOut();
    }
    catch (err) {
        console.log(err);
    }
    finally {
        document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        window.location.href = 'login.php';
    }
});

function addServerCard(server)
{
    document.getElementById('guilds-container').append(renderServerCard(server, false));
}

function renderServerCard(server, isCurrent) {
    const anchor = document.createElement('a');
    anchor.href = server.channels.length ? `text-channel.php?id=${server.channels[0]}` : `guild-home.php?id=${server.id}`;

    const serverCard = document.createElement('div');
    anchor.append(serverCard);
    serverCard.className = "icon-size-medium icon-card side-card";
    if(isCurrent)
        serverCard.classList.add('current-server');
    serverCard.dataset.tooltip = server.guildname;
    serverCard.dataset.id = server.id;
    serverCard.innerText = server.initials;
    serverCard.style = '--icon-bg-color: ' + server.theme_color + ';';

    return anchor;
}