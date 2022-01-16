const modalPane = document.querySelector('.modal-pane');

window.onclick = evt => {
    if(evt.target == modalPane)
        closeModal();
}

function openUserModal(user)
{
    openModal('user-modal');
    const {
        id,
        username,
        theme_color,
        user_description,
        userstatus,
        message_channel
    } = user;
    const user_note = localStorage.getItem(`note_${id}`);

    const usernameSpan = document.getElementById('username-user-modal');
    const themeDiv = document.getElementById('theme-user-modal');
    const aboutP = document.getElementById('about-user-modal');
    const noteP = document.getElementById('note-user-modal');

    usernameSpan.innerText = username;
    usernameSpan.style = userstatus === '1' ? '--bg-color: var(--color-green);' : '--bg-color: var(--color-dark-grey);';
    themeDiv.style = `--user-bg-panel: ${theme_color};`;
    aboutP.innerText = user_description;
    noteP.innerText = user_note;
    renderUserFriendButton(user);
}

function renderUserFriendButton(user) {
    const friendBtn = document.getElementById('add-remove-friend-btn');
    if(user.id === currentProfileId) {
        friendBtn.style.visibility = 'hidden';
        return;
    }

    if(user.invite_status === '0' && user.request_sender != currentProfileId) {
        friendBtn.style.visibility = 'visible';
        friendBtn.innerText = 'Accept request';
        friendBtn.onclick = async () => {
            friendBtn.disabled = true;
            try {
                await api.acceptFriendRequest({ id: user.id });
                user.invite_status = '1';
                renderUserFriendButton(user);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                friendBtn.disabled = false;
            }
        }
    }
    else if(user.invite_status === null) {
        friendBtn.style.visibility = 'visible';
        friendBtn.innerText = 'Add';
        friendBtn.onclick = async () => {
            friendBtn.disabled = true;
            try {
                await api.requestFriend({ id: user.id });
                user.invite_status = '0';
                user.request_sender = currentProfileId;
                renderUserFriendButton(user);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                friendBtn.disabled = false;
            }
        }
    }
    else {
        friendBtn.style.visibility = 'hidden';
    }
}

document.getElementById('direct-message-input').addEventListener('keypress', evt => {
    const code = evt.keyCode || evt.which;
    if(code === 13)
    {
        if(evt.target.value !== '')
        {
            console.log(evt.target.value);
            evt.target.value = '';
            // send message
            closeModal();
        }
    }
})

function openCreateGuildModal()
{
    openModal('create-guild-modal');
}

document.getElementById('guildThemePicker').addEventListener('input', evt => {
    document.getElementById('createGuildBanner').style = `--guild-bg-color: ${evt.target.value};`;
});

document.getElementById('createGuildForm').onsubmit = async evt => {
    evt.preventDefault();
    try {
        let form = {
            guildname: document.getElementById('guildnameInput').value,
            initials: document.getElementById('initialsInput').value,
            openInviteKey: document.getElementById('inviteKeyInput').value ? document.getElementById('inviteKeyInput').value: null,
            themeColor: document.getElementById('guildThemePicker').value
        }
        const { id: guildId } = await api.createGuild(form);
        const guild = await api.fetchGuild({ id: guildId });
        addServerCard(guild);
    }
    catch (err) {
        console.log(err);
        document.getElementById('createGuildMessage').innerText = err.error;
    }
    finally {
        closeModal();
    }
};

document.getElementById('createGuildSubmitBtn').onclick = evt => {
    evt.target.disabled = true;
    document.getElementById('createGuildForm').requestSubmit();
    evt.target.disabled = false;
}

function openCreateChannelModal(guildId) {
    openModal('create-textchannel-modal');
    document.getElementById('createChannelForm').onsubmit = async evt => {
        evt.preventDefault();
        try {
            const channelName = document.getElementById('channelNameInput').value;
            if(!channelName)
                return;
            const { id: channelId } = await api.createTextChannel({
                guildId,
                channelName
            });
            const guildsContainer = document.getElementById('guilds-container');
            if(guildsContainer) {
                const navGuild = [...guildsContainer.children].find(g => g.children[0].dataset.id === guildId);
                navGuild.href = `text-channel.php?id=${channelId}`;
            }
            closeModal();
        }
        catch (err) {
            console.log(err);
        }
    }
}

function openConfirmationModal(message, callbackFn)
{
    openModal('confirmation-modal');
    document.getElementById('confirmation-message').innerText = message;

    const button = document.getElementById("confirm-btn-modal");
    button.onclick = callbackFn;
}

document.getElementById('cancel-btn-modal').onclick = closeModal;

function openGuildInviteModal(guildId)
{
    openModal('guild-invite-modal');
    document.getElementById('searchGuildInviteForm').onsubmit =  async evt => {
        evt.preventDefault();
        try {
            const searchQuery = document.getElementById('inviteModalInput').value;
            const searchResults = await api.searchUser({ username: searchQuery });
            const usersList = searchResults.filter(u => u.id !== currentProfileId);
            renderModalSearchResults(usersList);
        }
        catch (err) {
            console.log(err);
        }
    };
    
    document.getElementById('inviteModalBtn').onclick = async evt => {
        try {
            evt.target.disabled = true;
            const toInviteItems = document.getElementById('toInviteList').children;
            const idList = [...toInviteItems].map(item => item.dataset.id);
            const responses = await Promise.all(idList.map(id => {
                return api.inviteToGuild({
                    guildId,
                    userId: id
                });
            }));
        }
        catch (err) {
            console.log(err);
        }
        finally {
            closeModal();
            evt.target.disabled = false;
        }
    };
}

function renderModalSearchResults(results)
{
    const list = document.getElementById('searchModalList');
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    results.forEach(user => {
        list.append(createModalSearchItem(user));
    })
}

function addToInviteList(toInvite)
{
    const list = document.getElementById('toInviteList');

    const findUser = [...list.children].find(u => u.dataset.id === toInvite.id);
    if(findUser)
        return;
    list.append(createModalToInviteItem(toInvite));
}

function createModalSearchItem(user)
{
    const searchItem = document.getElementById('searchItemTemplate').cloneNode(true);
    searchItem.style = '';
    searchItem.removeAttribute('id');

    searchItem.querySelector('.icon-card').style = `--icon-bg-color: ${user.theme_color};`;
    const usernameSpan = searchItem.querySelector(':scope > span');
    usernameSpan.innerText = user.username;
    usernameSpan.style = `--user-theme-color: ${user.theme_color};`;
    const idSpan = document.getElementById('shortIdSpan').cloneNode(true);
    idSpan.innerText = ` #${user.id.slice(0,6)}`;
    idSpan.removeAttribute('id');
    searchItem.querySelector(':scope > span').append(idSpan);

    searchItem.querySelector('.invite-to-guild-icon').addEventListener('click', () => {
        searchItem.parentNode.removeChild(searchItem);
        addToInviteList(user);
    });

    return searchItem;
}

function createModalToInviteItem(user)
{
    const inviteItem = document.getElementById('toInviteItemTemplate').cloneNode(true);
    inviteItem.style = '';
    inviteItem.removeAttribute('id');

    inviteItem.querySelector('span').innerText = user.username;
    inviteItem.querySelector('img').addEventListener('click', () => {
        inviteItem.parentNode.removeChild(inviteItem);
    });
    inviteItem.style = `--user-theme-color: ${user.theme_color};`;
    inviteItem.dataset.id = user.id;

    return inviteItem;
}

function openModal(elemId)
{
    modalPane.style.display = 'flex';
    const modal = document.getElementById(elemId);
    modal.style.display = 'block';
}

function closeModal()
{
    modalPane.style.display = 'none';
    const modalList = document.querySelectorAll('.modal-container');
    modalList.forEach(modal => {
        modal.style.display = 'none';
    });
}