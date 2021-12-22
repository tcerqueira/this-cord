const serversContainer = document.getElementById('guilds-container');

const userServers = [
    { id: 1, name: 'server 1', initials: 'S1'},
    { id: 2, name: 'server 2', initials: 'S2'},
    { id: 3, name: 'server 3', initials: 'S3'}
];

userServers.forEach((server) => {
    const serverCard = createServerCard(server);
    serversContainer.append(serverCard);
});

function createServerCard(server)
{
    const serverCard = document.createElement('div');
    serverCard.className = "side-card";
    serverCard.dataset.tooltip = server.name;
    serverCard.innerText = server.initials;

    return serverCard;
}
