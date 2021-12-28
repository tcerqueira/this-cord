const textChannelList = document.getElementById('text-channels-list');

const allTextChannels = [
    {id: 1, name: 'jardim-de-convivio-da-feup'},
    {id: 2, name: 'spam'}
];

allTextChannels.forEach(textChannel => {
    const textChannelItem = renderTextChannel(textChannel);
    textChannelList.append(textChannelItem);
});


function renderTextChannel(textChannel)
{
    const listItem = document.createElement('li');
    listItem.id = 'textChannel_' + textChannel.id;
    listItem.classList.add('text-channel');
    
    const listItemAnchor = document.createElement('a');
    listItemAnchor.src = "#";
    listItem.append(listItemAnchor);
    listSpan = document.createElement('span');
    listSpan.innerText = textChannel.name;
    listItemAnchor.append(listSpan);
    
    const div = document.createElement('div');
    div.classList.add('text-channel-icons');
    listItem.append(div);
    
    const anchorAddIcon = document.createElement('a');
    anchorAddIcon.src = '#';
    div.append(anchorAddIcon);
    
    const addIcon = document.createElement('img');
    anchorAddIcon.append(addIcon);
    addIcon.classList.add('icon-text-size');
    addIcon.src = "../public/add_user.svg";
    addIcon.alt = "add_user";
    
    const anchorsettingsIcon = document.createElement('a');
    anchorsettingsIcon.src = "#";
    div.append(anchorsettingsIcon);
    
    const settingsIcon = document.createElement('img');
    anchorsettingsIcon.append(settingsIcon);
    settingsIcon.classList.add('icon-text-size');
    settingsIcon.src = "../public/settings.svg";
    settingsIcon.alt = "settings";

    return listItem;
}