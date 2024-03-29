const modalPane = document.querySelector('.modal-pane');

window.onclick = evt => {
    if(evt.target == modalPane)
        closeModal();
}

function openUserModal(user)
{
    closeModal();
    openModal('user-modal');
    const {
        id,
        username,
        theme_color,
        user_description,
        userstatus,
        message_channel,
        img_name
    } = user;

    const user_note = localStorage.getItem(`note_${currentProfileId.slice(0,6)}_${id}`);
    const usernameSpan = document.getElementById('username-user-modal');
    const shortId = document.getElementById('shortIdUserModal');
    const themeDiv = document.getElementById('theme-user-modal');
    const aboutP = document.getElementById('about-user-modal');
    const noteP = document.getElementById('note-user-modal');
    const statusWrapper = document.querySelector('.username-container .status-wrapper');

    usernameSpan.innerText = username;
    shortId.innerText = `#${id.slice(0,6)}`;
    statusWrapper.classList.remove('status-offline');
    if(userstatus === '0')
        statusWrapper.classList.add('status-offline');
    
    document.querySelector('.username-container img').src = `${api.imgUrl}/${img_name}`;
    document.querySelector('.username-container .icon-card').style = `--icon-bg-color: ${theme_color};`;
    themeDiv.style = `--user-bg-panel: ${theme_color};`;
    aboutP.innerText = user_description;
    noteP.value = user_note;
    renderUserFriendButton(user);
    
    document.getElementById('userNoteForm').onsubmit = evt => {
        evt.preventDefault();
        const noteText = document.getElementById('note-user-modal').value;
        localStorage.setItem(`note_${currentProfileId.slice(0,6)}_${id}`, noteText);
        document.getElementById('unfocusTag').focus();
    }
    
    if(!message_channel)
        document.getElementById('sendMessageModalForm').style.display = 'none';
    else
        document.getElementById('sendMessageModalForm').style.display = 'block';

    document.getElementById('sendMessageModalForm').onsubmit = async evt => {
        evt.preventDefault();
        const content = document.getElementById('direct-message-input').value;
        if(!content)
            return;
        try {
            closeModal();
            await api.sendMessage({
                channelId: message_channel,
                replyTo: null,
                content
            });
            window.location.href = `direct-message.php?id=${message_channel}`;
        }
        catch (err) {
            console.log(err);
        }
    };
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

function openCreateGuildModal()
{
    closeModal();
    document.getElementById('createGuildError').innerText = '';
    openModal('create-guild-modal');
}

document.getElementById('guildThemePicker').addEventListener('input', evt => {
    document.getElementById('createGuildBanner').style = `--guild-bg-color: ${evt.target.value};`;
    document.getElementById('iconCardPreview').style = `--icon-bg-color: ${evt.target.value};`;
});

document.getElementById('guild-img-input').onchange = () => {
    const avatar = document.getElementById('guild-img-input').files[0];
    document.getElementById('createGuildError').innerText = '';
    // check size bigger than 5MB
    if(avatar?.size > 5*1048576) {
        document.getElementById('createGuildError').innerText = 'File size too big.';
        document.getElementById('guild-img-input').value = '';
        document.getElementById('guildImagePreview').src = '#';
        return;
    }
    document.getElementById('guildImagePreview').src = avatar ? URL.createObjectURL(avatar) : `${api.imgUrl}/guild_default.gif`;
}

document.getElementById('createGuildForm').onsubmit = async evt => {
    evt.preventDefault();
    const guildname = document.getElementById('guildnameInput').value;
    const initials = document.getElementById('initialsInput').value;

    if(!guildname || !initials) {
        document.getElementById('createGuildError').innerText = 'Invalid input.';
        return;
    }
    if(guildname.length > 24) {
        document.getElementById('createGuildError').innerText = 'Guild name too long';
        return;
    }
    if(initials.length > 3) {
        document.getElementById('createGuildError').innerText = 'Guild initials too long';
        return;
    }

    try {
        let form = {
            guildname,
            initials,
            openInviteKey: document.getElementById('inviteKeyInput').value ? document.getElementById('inviteKeyInput').value: null,
            themeColor: document.getElementById('guildThemePicker').value
        }

        const regEx = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        if(form.openInviteKey !== null) {
            const match = form.openInviteKey.match(regEx);
            if(!match) {
                document.getElementById('createGuildError').innerText = 'Invalid invite key.';
                return;
            }
        }

        const { id: guildId } = await api.createGuild(form);
        await api.updateGuildAvatar({
            guildId,
            avatar: document.getElementById('guild-img-input').files[0]
        });
        const guild = await api.fetchGuild({ id: guildId });
        addServerCard(guild);
        closeModal();
    }
    catch (err) {
        console.log(err);
        document.getElementById('createGuildError').innerText = err.error;
    }
};

document.getElementById('createGuildSubmitBtn').onclick = evt => {
    evt.target.disabled = true;
    document.getElementById('createGuildForm').requestSubmit();
    evt.target.disabled = false;
}

function openCreateChannelModal(guildId) {
    closeModal();
    document.getElementById('createChannelError').innerText = '';
    openModal('create-textchannel-modal');
    document.getElementById('createChannelForm').onsubmit = async evt => {
        evt.preventDefault();
        const channelName = document.getElementById('channelNameInput').value;
        if(!channelName) {
            document.getElementById('createChannelError').innerText = 'Invalid input.';
            return;
        }
        if(channelName.length > 24) {
            document.getElementById('createChannelError').innerText = 'Too long.';
            return;
        }
        try {
            const { id: channelId } = await api.createTextChannel({
                guildId,
                channelName
            });
            const guildsContainer = document.getElementById('guilds-container');
            if(guildsContainer) {
                const navGuild = [...guildsContainer.children].find(g => g.children[0].children[0].dataset.id === guildId);
                navGuild.href = `text-channel.php?id=${channelId}`;
            }
            closeModal();
            window.location.replace(`text-channel.php?id=${channelId}`);
        }
        catch (err) {
            console.log(err);
            document.getElementById('createChannelError').innerText = err.error;
        }
    }
}

function openConfirmationModal(message, callbackFn)
{
    closeModal();
    openModal('confirmation-modal');
    document.getElementById('confirmation-message').innerText = message;

    const button = document.getElementById("confirm-btn-modal");
    button.onclick = callbackFn;
}

document.getElementById('cancel-btn-modal').onclick = closeModal;

async function openGuildInviteModal(guildId)
{
    closeModal();
    document.getElementById('guildInviteError').innerText = '';
    openModal('guild-invite-modal');
    document.getElementById('inviteModalBtn').onclick = async evt => {
        try {
            evt.target.disabled = true;
            const toInviteItems = document.getElementById('toInviteList').children;
            const idList = [...toInviteItems].map(item => item.dataset.id);
            console.log(idList);
            if(idList.length === 0) {
                document.getElementById('guildInviteError').innerText = 'Invite list is empty.';
                return;
            }
            const responses = await Promise.all(idList.map(id => {
                return api.inviteToGuild({
                    guildId,
                    userId: id
                });
            }));
            closeModal();
        }
        catch (err) {
            console.log(err);
            document.getElementById('guildInviteError').innerText = err.error;
        }
        finally {
            evt.target.disabled = false;
        }
    };

    var searchDelay;
    document.getElementById('inviteModalInput').oninput = () => {
        clearTimeout(searchDelay);
        searchDelay = setTimeout(async () => {
            if(!document.getElementById('inviteModalInput').value) {
                renderModalSearchResults(friends);
                return;
            }
            try {
                const searchQuery = document.getElementById('inviteModalInput').value;
                const searchResults = await api.searchUser({ username: searchQuery });
                const usersList = searchResults.filter(u => u.id !== currentProfileId);
                renderModalSearchResults(usersList);
            }
            catch (err) {
                console.log(err);
                document.getElementById('guildInviteError').innerText = err.error;
            }
        }, 200);
    };

    let friends;
    try {
        const { open_invite_key: inviteKey } = await api.generateOpenInvite({ guildId });
        friends = await api.fetchFriends();
        renderModalSearchResults(friends);
        if(inviteKey === null) {
            document.getElementById('copyInviteButton').style.display = 'none';
            return;
        }
        document.getElementById('copyInviteButton').style.display = 'block';
        document.getElementById('copyInviteButton').onclick = async () => {
            try {            
                const index = window.location.href.search('/r/');
                const subUrl = window.location.href.slice(0, index);
                const guild = await api.fetchGuild({ id: guildId });
                const inviteLink = `${subUrl}/r/invite-to-guild.php?guild_id=${guildId}&open_invite_key=${inviteKey}&guildname=${guild.guildname}&avatar=${guild.img_name}`
                    .replaceAll(' ', '%20');
                await navigator.clipboard.writeText(inviteLink);
            }
            catch (err) {
                console.log(err);
                document.getElementById('guildInviteError').innerText = err.error;
            }
        };
    }
    catch (err) {
        console.log(err);
        document.getElementById('guildInviteError').innerText = err.error;
    }

    document.getElementById('searchGuildInviteForm').onsubmit = async evt => {
        evt.preventDefault();
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
    const searchItem = document.getElementById('searchItemTemplate').content.firstElementChild.cloneNode(true);

    searchItem.querySelector('.icon-card').style = `--icon-bg-color: ${user.theme_color};`;
    searchItem.querySelector('.icon-card > img').src = `${api.imgUrl}/${user.img_name}`;
    const usernameSpan = searchItem.querySelector(':scope > span');
    usernameSpan.innerText = user.username;
    usernameSpan.style = `--user-theme-color: ${user.theme_color};`;
    const idSpan = document.createElement('span');
    idSpan.innerText = ` #${user.id.slice(0,6)}`;
    usernameSpan.append(idSpan);

    searchItem.querySelector('.invite-to-guild-icon').addEventListener('click', () => {
        searchItem.parentNode.removeChild(searchItem);
        addToInviteList(user);
    });

    return searchItem;
}

function createModalToInviteItem(user)
{
    const inviteItem = document.getElementById('toInviteItemTemplate').content.firstElementChild.cloneNode(true);

    inviteItem.querySelector('span').innerText = user.username;
    inviteItem.querySelector('img').addEventListener('click', () => {
        inviteItem.parentNode.removeChild(inviteItem);
    });
    inviteItem.style = `--user-theme-color: ${user.theme_color};`;
    inviteItem.dataset.id = user.id;

    return inviteItem;
}

function openErrorModal(message, callbackFn)
{
    closeModal();
    openModal('error-modal');
    document.getElementById('errorModalMessage').innerText = message;
    document.getElementById('errorModalBtn').onclick = callbackFn;
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