function renderTextChannels(textChannels, currentTextChannelId)
{
    const textChannelList = document.getElementById('text-channels-list');
    textChannels.forEach(textChannel => {
        const textChannelItem = createTextChannelItem(textChannel);
        textChannelList.append(textChannelItem);
    });
    document.getElementById('textChannel_' + currentTextChannelId).classList.add('selected-channel');
}

function createTextChannelItem(textChannel)
{
    const anchorListItem =document.createElement('div');
    // anchorListItem.href= `text-channel.php?id=${textChannel.id}`;
    anchorListItem.addEventListener('click', evt => {
        evt.stopPropagation();
        window.location.href = `text-channel.php?id=${textChannel.id}`;
    });
    anchorListItem.style.cursor = "pointer";
    const listItem = document.createElement('li');
    anchorListItem.append(listItem);
    listItem.id = 'textChannel_' + textChannel.id;
    listItem.classList.add('text-channel');
    const div = document.createElement('div');
    listItem.append(div);
    
    const textIcon = document.createElement('img');
    div.append(textIcon);
    textIcon.classList.add('icon-text-size');
    textIcon.src = "../public/text-channel.svg";
    textIcon.alt = "text-channel";

    // const listItemAnchor = document.createElement('a');
    // listItemAnchor.href = `text-channel.php?id=${textChannel.id}`;
    // div.append(listItemAnchor);
    div.className = 'one-liner';
    listSpan = document.createElement('span');
    listSpan.innerText = textChannel.channelname;
    div.append(listSpan);
    
    // const div1 = document.createElement('div');
    // div1.classList.add('text-channel-icons');
    // listItem.append(div1);

    // const anchorAddIcon = document.createElement('a');
    // anchorAddIcon.href = '#';
    // div1.append(anchorAddIcon);
    
    // const addIcon = document.createElement('img');
    // anchorAddIcon.append(addIcon);
    // addIcon.classList.add('icon-text-size');
    // addIcon.src = "../public/add_user.svg";
    // addIcon.alt = "add_user";
    
    // const anchorsettingsIcon = document.createElement('a');
    // anchorsettingsIcon.href = '#';
    // div.append(anchorsettingsIcon);

    const settingsIcon = document.createElement('img');
    listItem.append(settingsIcon);
    settingsIcon.className = 'text-channel-icons icon-text-size';
    settingsIcon.src = "../public/settings.svg";
    settingsIcon.alt = "settings";
    settingsIcon.addEventListener('click', evt => {
        evt.stopPropagation();
        window.location.href = `guild-settings.php?guild_id=${textChannel.guild_id}#text-channels`;
    });
    return anchorListItem;
}

// function renderVoiceChannel(voiceChannel)
// {
//     const listItem = document.createElement('li');
//     listItem.id = 'voiceChannel_' + voiceChannel.id;
//     listItem.classList.add('text-channel');
    
//     const listItemAnchor = document.createElement('a');
//     listItemAnchor.heref = "#";
//     listItem.append(listItemAnchor);
//     listSpan = document.createElement('span');
//     listSpan.innerText = voiceChannel.name;
//     listItemAnchor.append(listSpan);
    
//     const div = document.createElement('div');
//     div.classList.add('text-channel-icons');
//     listItem.append(div);
    
//     const anchorAddIcon = document.createElement('a');
//     anchorAddIcon.href = '#';
//     div.append(anchorAddIcon);
    
//     const addIcon = document.createElement('img');
//     anchorAddIcon.append(addIcon);
//     addIcon.classList.add('icon-text-size');
//     addIcon.src = "../public/add_user.svg";
//     addIcon.alt = "add_user";
    
//     const anchorsettingsIcon = document.createElement('a');
//     anchorsettingsIcon.href = "#";
//     div.append(anchorsettingsIcon);
    
//     const settingsIcon = document.createElement('img');
//     anchorsettingsIcon.append(settingsIcon);
//     settingsIcon.classList.add('icon-text-size');
//     settingsIcon.src = "../public/settings.svg";
//     settingsIcon.alt = "settings";

//     return listItem;
// }

// Butão das definiçoes precisa de um stop propagation