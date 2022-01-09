// renderNav();

// async function renderNav() {
//     try {
//         const myGuilds = await api.fetchMyGuilds();
        
//         const serversContainer = document.getElementById('guilds-container');
//         myGuilds.forEach((server) => {
//             const serverCard = renderServerCard(server);
//             serversContainer.append(serverCard);
//         });
//     }
//     catch(err) {
//         console.log(err);
//     }
// }

function renderNav(myGuilds, currentId)
{
    const serversContainer = document.getElementById('guilds-container');
    myGuilds.forEach((server) => {
        const serverCard = renderServerCard(server);
        serversContainer.append(serverCard);
    });
}

function renderServerCard(server) {
    const anchor = document.createElement('a');
    anchor.href = server.channels.length ? 'text-channel.php?id=' + server.channels[0] : 'guild-home.php';

    const serverCard = document.createElement('div');
    anchor.append(serverCard);
    serverCard.className = "icon-size-medium icon-card side-card";
    serverCard.dataset.tooltip = server.guildname;
    serverCard.innerText = server.initials;
    serverCard.style = '--icon-bg-color: ' + server.theme_color + ';';

    return anchor;
}