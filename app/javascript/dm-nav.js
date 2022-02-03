function renderDmNav(friendsList) {
    const list = document.getElementById('dmList');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    friendsList.forEach(friend => {
        list.append(createDmItem(friend));
    })
}

function createDmItem(friend) {
    const dmItem = document.getElementById('dmItemTemplate').content.cloneNode(true);

    dmItem.querySelector('div').style = `--icon-bg-color: ${friend.theme_color};`;
    dmItem.querySelector('span').innerText = friend.username;
    dmItem.querySelector('a').href = `direct-message.php?id=${friend.message_channel}`;
    dmItem.querySelector('img').src = `${api.imgUrl}/${friend.img_name}`;

    return dmItem;
}