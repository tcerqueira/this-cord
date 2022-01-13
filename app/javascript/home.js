var friends = [];
render();

async function render()
{
    try {
        let [ myGuilds, friendsList, guildInvites ] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchFriends(),
            api.fetchGuildInvites()
        ]);
        friends.push(...friendsList);

        renderNav(myGuilds);

        let currentTab = window.location.hash?.slice(1) || 'online';
        switchTab('online', currentTab);
        switch(currentTab) {
            case 'online':
                renderUsersList(getOnlineList(friends)); break;
            case 'all':
                renderUsersList(getAllList(friends)); break;
            case 'pending':
                renderUsersList(getPendingList(friends)); break;
        }

        document.getElementById('onlineTabBtn').addEventListener('click', () => {
            if(currentTab === 'online')
                return;
            switchTab(currentTab, 'online');
            currentTab = 'online';

            renderUsersList(getOnlineList(friends));
        });
        
        document.getElementById('allTabBtn').addEventListener('click', () => {
            if(currentTab === 'all')
                return;
            switchTab(currentTab, 'all');
            currentTab = 'all';

            renderUsersList(getAllList(friends));
        });
        
        document.getElementById('pendingTabBtn').addEventListener('click', () => {
            if(currentTab === 'pending')
                return;
            switchTab(currentTab, 'pending');
            currentTab = 'pending';

            renderUsersList(getPendingList(friends));
        });
    }
    catch (err) {
        console.log(err);
    }
}

function getOnlineList(friendsList) {
    return friendsList.filter(f => f.invite_status === '1' && f.userstatus === '1');
}

function getAllList(friendsList) {
    return friendsList.filter(f => f.invite_status === '1');
}

function getPendingList(friendsList) {
    return friendsList.filter(f => f.invite_status === '0');
}

function renderUsersList(usersList, friendsList) {
    const list = document.getElementById('usersList');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    usersList.forEach(user => {
        if(user.id === currentProfileId)
            return;
        const item = createUserItem(user);
        list.append(item);
    });
}

function createUserItem(user) {
    const userItem = document.getElementById('userItemTemplate').cloneNode(true);
    userItem.style = '';
    userItem.removeAttribute('id');
    userItem.addEventListener('click', () => {
        openModal('user-modal');
        renderUserModal(user);
    });

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
    // event handlers
    getAddIcon(userItem).addEventListener('click', async (evt) => {
        evt.stopPropagation();
        try {
            await api.requestFriend({ id: user.id });
            user.invite_status = '0';
            user.request_sender = currentProfileId;
            friends.push(user);
            const newUserItem = createUserItem(user);
            userItem.parentNode.replaceChild(newUserItem, userItem);
        }
        catch (err) {
            console.log(err);
        }
    });

    getMessageIcon(userItem).addEventListener('click', (evt) => {
        evt.stopPropagation();
    });

    getRemoveIcon(userItem).addEventListener('click', (evt) => {
        evt.stopPropagation();
        openModal('confirmation-modal');
        renderConfirmationModal('Are you sure you want to remove friend?', async () => {
            try {
                await api.removeFriend({ id: user.id });
                user.invite_status = undefined;
                friends = friends.filter(f => f.id !== user.id);
                const newUserItem = createUserItem(user);
                userItem.parentNode.replaceChild(newUserItem, userItem);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                closeModal();
            }
        })
    });

    getAcceptIcon(userItem).addEventListener('click', async (evt) => {
        evt.stopPropagation();
        try {
            const newFriend = await api.acceptFriendRequest({ id: user.id });
            friends = friends.map(f => {
                if(f.id === user.id)
                    f = newFriend;
                return f;
            });
            const newUserItem = createUserItem(newFriend);
            userItem.parentNode.replaceChild(newUserItem, userItem);
        }
        catch (err) {
            console.log(err);
        }
    });

    getDeclineIcon(userItem).addEventListener('click', async (evt) => {
        evt.stopPropagation();
        try {
            await api.removeFriend({ id: user.id });
            user.invite_status = undefined;
            friends = friends.filter(f => f.id !== user.id);
            document.getElementById('usersList').removeChild(userItem);
        }
        catch (err) {
            console.log(err);
        }
    });
    // handler for cancelling request
    getSentIcon(userItem).addEventListener('click', async (evt) => {
        evt.stopPropagation();
        try {
            await api.removeFriend({ id: user.id });
            user.invite_status = undefined;
            friends = friends.filter(f => f.id !== user.id);
            const newUserItem = createUserItem(user);
            userItem.parentNode.replaceChild(newUserItem, userItem);
        }
        catch (err) {
            console.log(err);
        }
    });
    // cancel request icon on hover
    getSentIcon(userItem).addEventListener('mouseover', (evt) => {
        evt.stopPropagation();
        getSentIcon(userItem).querySelector('img[alt=sent-icon]').style = 'display: none;'
        getSentIcon(userItem).querySelector('img[alt=cancel-sent-icon]').style = 'display: inline-block;'
    });

    getSentIcon(userItem).addEventListener('mouseout', (evt) => {
        evt.stopPropagation();
        getSentIcon(userItem).querySelector('img[alt=sent-icon]').style = 'display: inline-block;'
        getSentIcon(userItem).querySelector('img[alt=cancel-sent-icon]').style = 'display: none;'
    });

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