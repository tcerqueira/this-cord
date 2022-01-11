render();

async function render()
{
    try {
        const [ myGuilds, friends, guildInvites ] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchFriends(),
            api.fetchGuildInvites()
        ]);

        renderNav(myGuilds);
        renderUsersList(friends.filter(f => f.invite_status === '1' && f.userstatus === '1'));
        console.log(friends);

        let currentTab = 'online';
        document.getElementById('onlineTabBtn').addEventListener('click', (evt) => {
            if(currentTab === 'online')
                return;
            document.getElementById(currentTab+'TabBtn').classList.remove('selected-tab');
            currentTab = 'online';
            document.getElementById(currentTab+'TabBtn').classList.add('selected-tab');

            renderUsersList(friends.filter(f => f.invite_status === '1' && f.userstatus === '1'));
        });
        
        document.getElementById('allTabBtn').addEventListener('click', () => {
            if(currentTab === 'all')
                return;
            document.getElementById(currentTab+'TabBtn').classList.remove('selected-tab');
            currentTab = 'all';
            document.getElementById(currentTab+'TabBtn').classList.add('selected-tab');

            renderUsersList(friends.filter(f => f.invite_status === '1'));
        });
        
        document.getElementById('pendingTabBtn').addEventListener('click', () => {
            if(currentTab === 'pending')
                return;
            document.getElementById(currentTab+'TabBtn').classList.remove('selected-tab');
            currentTab = 'pending';
            document.getElementById(currentTab+'TabBtn').classList.add('selected-tab');

            renderUsersList(friends.filter(f => f.invite_status === '0'));
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

        

    });
}

function createUserItem(user) {
    const userItem = document.getElementById('userItemTemplate').cloneNode(true);
    userItem.style = '';
    userItem.removeAttribute('id');

    userItem.querySelector('.icon-card').style = "--icon-bg-color: " + user.theme_color + ';';
    userItem.querySelector('.user-item-username').innerText = user.username;
    userItem.querySelector('.user-item-username + span').innerText = user.userstatus === '1' ? 'Online' : 'Offline';

    switch(user.invite_status) {
        case undefined:
            userItem.querySelector('img[alt=add-icon]').parentNode.style = '';
            break;
        case '1':
            userItem.querySelector('img[alt=message-icon]').parentNode.parentNode.style = '';
            userItem.querySelector('img[alt=remove-icon]').parentNode.style = '';
            break;
        case '0':
            if(user.request_sender === currentProfileId)
                userItem.querySelector('img[alt=sent-icon]').parentNode.style = '';
            else {
                userItem.querySelector('img[alt=accept-icon]').parentNode.style = '';
                userItem.querySelector('img[alt=decline-icon]').parentNode.style = '';
            }
            break;
    }

    return userItem;

}