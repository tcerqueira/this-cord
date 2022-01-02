const serversContainer = document.getElementById('guilds-container');

const userServers = [
    { id: 1, name: 'server 1', initials: 'S1', theme_color: '#f00'},
    { id: 2, name: 'server 2', initials: 'S2', theme_color: '#0f0'},
    { id: 3, name: 'server 3', initials: 'S3', theme_color: '#00f'}
];

userServers.forEach((server) => {
    const serverCard = renderServerCard(server);
    serversContainer.append(serverCard);
});

function renderServerCard(server)
{
    const serverCard = document.createElement('div');
    serverCard.className = "icon-size-medium icon-card side-card";
    serverCard.dataset.tooltip = server.name;
    serverCard.innerText = server.initials;
    serverCard.style = '--icon-bg-color: ' + server.theme_color + ';';

    return serverCard;
}
