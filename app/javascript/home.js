var friends = [];
render();

async function render()
{
    try {
        let [ myGuilds, friendsList, guildInvites, user ] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchFriends(),
            api.fetchGuildInvites(),
            api.fetchUser({ id: currentProfileId })
        ]);
        friends.push(...friendsList);

        renderNav(myGuilds);
        renderDmNav(getAllList(friends));
        renderGuildInvites(guildInvites);
        renderUserbar(user);

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
            switchTab(currentTab, 'online');
            currentTab = 'online';
            renderUsersList(getOnlineList(friends));
        });
        
        document.getElementById('allTabBtn').addEventListener('click', () => {
            switchTab(currentTab, 'all');
            currentTab = 'all';
            renderUsersList(getAllList(friends));
        });
        
        document.getElementById('pendingTabBtn').addEventListener('click', () => {
            switchTab(currentTab, 'pending');
            currentTab = 'pending';
            renderUsersList(getPendingList(friends));
        });

        document.getElementById('searchTopbarForm').addEventListener('submit', async (evt) => {
            evt.preventDefault();
        });

        var searchDelay;
        document.getElementById('topbar-search-input').oninput = () => {
            clearTimeout(searchDelay);
            searchDelay = setTimeout(async () => {
                try {
                    const searchQuery = document.getElementById('topbar-search-input').value;
                    if(!searchQuery) {
                        renderUsersList([]);
                        return;
                    }
                    document.querySelector('.home-container > h3').innerText = 'Search';
                    const searchResult = await api.searchUser({ username: searchQuery });
                    const searchList = searchResult.map(u => {
                        const friend = friends.find(f => f.id === u.id);
                        if(!friend)
                            return u;
                        u.invite_status = friend.invite_status;
                        u.request_sender = friend.request_sender;
                        u.message_channel = friend.message_channel;
                        return u;
                    });
                    renderUsersList(searchList);
                }
                catch (err) {
                    console.log(err);
                }
            }, 200);
        };
    }
    catch (err) {
        console.log(err);
        openErrorModal(err.error, () => {
            // window.location.href = 'login.php';
            closeModal();
        });
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
    const userItem = document.getElementById('userItemTemplate').content.firstElementChild.cloneNode(true);
    userItem.addEventListener('click', () => {
        openUserModal(user);
    });

    userItem.querySelector('.icon-card').style = `--icon-bg-color: ${user.theme_color};`;
    userItem.querySelector('.icon-card img').src = `${api.imgUrl}/${user.img_name}`;
    userItem.querySelector('.user-item-username').innerText = user.username;
    const spanShortId = document.createElement('span');
    spanShortId.className = 'user-item-shortid';
    spanShortId.innerText = ` #${user.id.slice(0,6)}`;
    userItem.querySelector('.user-item-username').append(spanShortId);
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
    getAddIcon(userItem).addEventListener('click', async function addHandler(evt) {
        evt.stopPropagation();
        this.removeEventListener('click', addHandler);
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
        finally {
            this.addEventListener('click', addHandler);
        }
    });

    getMessageIcon(userItem).addEventListener('click', (evt) => {
        evt.stopPropagation();
    });

    getRemoveIcon(userItem).addEventListener('click', (evt) => {
        evt.stopPropagation();
        openConfirmationModal('Are you sure you want to remove friend?', async evt => {
            try {
                evt.target.disabled = true;
                await api.removeFriend({ id: user.id });
                user.invite_status = undefined;
                friends = friends.filter(f => f.id !== user.id);
                const newUserItem = createUserItem(user);
                userItem.parentNode.replaceChild(newUserItem, userItem);
                renderDmNav(getAllList(friends));
            }
            catch (err) {
                console.log(err);
            }
            finally {
                closeModal();
                evt.target.disabled = false;
            }
        })
    });

    getAcceptIcon(userItem).addEventListener('click', async function acceptHandler(evt) {
        evt.stopPropagation();
        this.removeEventListener('click', acceptHandler);
        try {
            const newFriend = await api.acceptFriendRequest({ id: user.id });
            friends = friends.map(f => {
                if(f.id === user.id)
                    f = newFriend;
                return f;
            });
            const newUserItem = createUserItem(newFriend);
            userItem.parentNode.replaceChild(newUserItem, userItem);
            renderDmNav(getAllList(friends));
        }
        catch (err) {
            console.log(err);
        }
        finally {
            this.addEventListener('click', acceptHandler);
        }
    });

    getDeclineIcon(userItem).addEventListener('click', async function declineHandler(evt) {
        evt.stopPropagation();
        this.removeEventListener('click', declineHandler);
        try {
            await api.removeFriend({ id: user.id });
            user.invite_status = undefined;
            friends = friends.filter(f => f.id !== user.id);
            document.getElementById('usersList').removeChild(userItem);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            this.addEventListener('click', declineHandler);
        }
    });
    // handler for cancelling request
    getSentIcon(userItem).addEventListener('click', async function cancelHandler(evt) {
        evt.stopPropagation();
        this.removeEventListener('click', cancelHandler);
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
            this.addEventListener('click', cancelHandler);
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
    window.history.replaceState({}, document.title, `#${newTab}`);
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