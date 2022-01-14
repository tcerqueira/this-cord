const modalPane = document.querySelector('.modal-pane');

window.onclick = evt => {
    if(evt.target == modalPane)
        closeModal();
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

document.getElementById('cancel-btn-modal').addEventListener('click', closeModal);

function openUserModal(user)
{
    openModal('user-modal');
    const {
        id,
        username,
        theme_color,
        user_description,
        userstatus,
        is_friend
    } = user;
    // = fetchUser
    const user_note = localStorage.getItem(`note_${id}`);

    const usernameSpan = document.getElementById('username-user-modal');
    const themeDiv = document.getElementById('theme-user-modal');
    const aboutP = document.getElementById('about-user-modal');
    const noteP = document.getElementById('note-user-modal');
    const friendBtn = document.getElementById('add-remove-friend-btn');

    usernameSpan.innerText = username;
    usernameSpan.style = userstatus === '1' ? '--bg-color: var(--color-green);' : '--bg-color: var(--color-dark-grey);';
    themeDiv.style = `--user-bg-panel: ${theme_color};`;
    aboutP.innerText = user_description;
    noteP.innerText = user_note;
    if(is_friend)
    {
        friendBtn.innerText = 'Remove';
        // https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
    }
    else {
        friendBtn.innerText = 'Add';
    }
}

function openConfirmationModal(message, callbackFn)
{
    openModal('confirmation-modal');
    document.getElementById('confirmation-message').innerText = message;
    // remove all event listeners
    const oldButton = document.getElementById("confirm-btn-modal");
    const newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);
    
    newButton.addEventListener('click', callbackFn);
}

// openGuildInviteModal('fd26e47f-e404-237e-7f36-9053b13138f3');

function openGuildInviteModal(guildId)
{
    openModal('guild-invite-modal');
    document.getElementById('searchGuildInviteForm').addEventListener('submit', async evt => {
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
    })
    
    document.getElementById('inviteModalBtn').addEventListener('click', async evt => {
        try {
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
        }
    });
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