render();

async function render()
{
    try {
        let [ myGuilds, friends, guildInvites ] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchFriends(),
            api.fetchGuildInvites()
        ]);

        renderNav(myGuilds);

        let [ onlineList, allList, pendingList ] = [
            friends.filter(f => f.invite_status === '1' && f.userstatus === '1'),
            friends.filter(f => f.invite_status === '1'),
            friends.filter(f => f.invite_status === '0')
        ];
        // console.log(friends);

        let currentTab = window.location.hash?.slice(1) || 'online';
        switchTab('online', currentTab);
        switch(currentTab) {
            case 'online':
                renderUsersList(onlineList); break;
            case 'all':
                renderUsersList(allList); break;
            case 'pending':
                renderUsersList(pendingList); break;
        }

        document.getElementById('onlineTabBtn').addEventListener('click', (evt) => {
            if(currentTab === 'online')
                return;
            switchTab(currentTab, 'online');
            currentTab = 'online';

            renderUsersList(onlineList);
        });
        
        document.getElementById('allTabBtn').addEventListener('click', () => {
            if(currentTab === 'all')
                return;
            switchTab(currentTab, 'all');
            currentTab = 'all';

            renderUsersList(allList);
        });
        
        document.getElementById('pendingTabBtn').addEventListener('click', () => {
            if(currentTab === 'pending')
                return;
            switchTab(currentTab, 'pending');
            currentTab = 'pending';

            renderUsersList(pendingList);
        });
    }
    catch (err) {
        console.log(err);
    }
}

function renderUsersList(usersList) {
    const list = document.getElementById('usersList');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    usersList.forEach(user => {
        if(user.id === currentProfileId)
            return;
        const item = createUserItem(user);
        list.append(item);

        item.addEventListener('click', () => {
            openModal('user-modal');
            renderUserModal(user);
        });

        getAddIcon(item).addEventListener('click', async (evt) => {
            evt.stopPropagation();
            try {
                await api.requestFriend({ id: user.id });
                user.invite_status = '0';
                user.request_sender = currentProfileId;
                friends.push(user);
                const newUserItem = createUserItem(user);
                item.parentNode.replaceChild(newUserItem, item);
            }
            catch (err) {
                console.log(err);
            }
        });

        getMessageIcon(item).addEventListener('click', (evt) => {
            evt.stopPropagation();
        });

        getRemoveIcon(item).addEventListener('click', (evt) => {
            evt.stopPropagation();

        });

        getSentIcon(item).addEventListener('click', (evt) => {
            evt.stopPropagation();
        });

        getAcceptIcon(item).addEventListener('click', (evt) => {
            evt.stopPropagation();
        });

        getDeclineIcon(item).addEventListener('click', (evt) => {
            evt.stopPropagation();
        });

        // cancel request icon on hover
        getSentIcon(item).addEventListener('mouseover', (evt) => {
            evt.stopPropagation();
            getSentIcon(item).querySelector('img[alt=sent-icon]').style = 'display: none;'
            getSentIcon(item).querySelector('img[alt=cancel-sent-icon]').style = 'display: inline-block;'
        });

        getSentIcon(item).addEventListener('mouseout', (evt) => {
            evt.stopPropagation();
            getSentIcon(item).querySelector('img[alt=sent-icon]').style = 'display: inline-block;'
            getSentIcon(item).querySelector('img[alt=cancel-sent-icon]').style = 'display: none;'
        });

    });
}

function createUserItem(user) {
    const userItem = document.getElementById('userItemTemplate').cloneNode(true);
    userItem.style = '';
    userItem.removeAttribute('id');

    userItem.querySelector('.icon-card').style = `--icon-bg-color: ${user.theme_color};`;
    userItem.querySelector('.user-item-username').innerText = user.username;
    userItem.querySelector('.user-item-username + span').innerText = user.userstatus === '1' ? 'Online' : 'Offline';

    switch(user.invite_status) {
        case undefined:
            getAddIcon(userItem).style = '';
            break;
        case '1':
            getMessageIcon(userItem).href = `direct-message.php?id=${user.message_channel}`;
            getMessageIcon(userItem).style = '';
            getRemoveIcon(userItem).style = '';
            break;
        case '0':
            if(user.request_sender === currentProfileId)
                getSentIcon(userItem).style = '';
            else {
                getAcceptIcon(userItem).style = '';
                getDeclineIcon(userItem).style = '';
            }
            break;
    }

    return userItem;
}

function switchTab(oldTab, newTab) {
    document.getElementById(oldTab+'TabBtn').classList.remove('selected-tab');
    document.getElementById(newTab+'TabBtn').classList.add('selected-tab');
    document.querySelector('.home-container > h3').innerText = newTab.charAt(0).toUpperCase() + newTab.slice(1);
}

function getAddIcon(userItem) {
    return userItem.querySelector('img[alt=add-icon]').parentNode;
}
function getMessageIcon(userItem) {
    return userItem.querySelector('img[alt=message-icon]').parentNode.parentNode;
}
function getRemoveIcon(userItem) {
    return userItem.querySelector('img[alt=remove-icon]').parentNode;
}
function getSentIcon(userItem) {
    return userItem.querySelector('img[alt=sent-icon]').parentNode;
}
function getAcceptIcon(userItem) {
    return userItem.querySelector('img[alt=accept-icon]').parentNode;
}
function getDeclineIcon(userItem) {
    return userItem.querySelector('img[alt=decline-icon]').parentNode;
}