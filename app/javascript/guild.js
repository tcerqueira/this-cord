const guild = { id: '123', guildname: 'tyty', initials: 'ty', admin_id: '543', theme_color: '#0f0' };
const members = [
    { id: 'c3b8d6a5-ba84-9040-08ab-9dc3a7949c3d', username: 'titi', userstatus: '1', theme_color: '#f00', guild_role:'2', invite_status:'1', invite_sender:'2'},
    { id: '1', username: 'lou', userstatus: '0', theme_color: '#a00', guild_role:'0', invite_status:'1', invite_sender:'2'},
    { id: '3', username: 'pa99', userstatus: '1', theme_color: '#0a0', guild_role:'0', invite_status:'1', invite_sender:'2'},
    { id: '4', username: 'rezi', userstatus: '0', theme_color: '#00a', guild_role:'1', invite_status:'1', invite_sender:'2'}
];

document.querySelectorAll('.username').forEach(username => {
    const user = members.find(member => member.id === username.dataset.userId);
    
    username.addEventListener('click', () => {
        // const user = fetchUser(username.dataset.userId);
        const modalUser = { id:'1', username:'lou', theme_color:'#00a', description:'sou eu, o lou', userstatus: '1', is_friend:false};
        openUserModal(modalUser);
    })
})


// renderMembers(members);

// async function renderMembers() {
//     try {
//         const channel = await getCurrentChannel({currentTextChannelId});
//         const members = await api.fetchGuildMembers({ id: channel.guild_id });
//         renderMembersList(members);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

function renderMembers(members) {
    const { admin, mods, online, offline, invited} = members.reduce((res, member) => {
        if(member.guild_role === '2') {
            res.admin = member;
            return res;
        }
        if(member.guild_role === '1') {
            res.mods.push(member);
            return res;
        }
        if(member.invite_status === '0') {
            res.invited.push(member);
            return res;
        }
        if(member.userstatus === '1') {
            res.online.push(member);
            return res;
        }
        res.offline.push(member);
        return res;
    }, { admin: undefined, mods: [], online: [], offline: [], invited: []});

    const ownerUl = document.getElementById('ownerUl');
    const modsUl = document.getElementById('modsUl');
    const onlineUl = document.getElementById('onlineUl');
    const offlineUl = document.getElementById('offlineUl');
    const invitedUl = document.getElementById('invitedUl');

    ownerUl.append(createMemberItem(admin));

    mods.forEach(mod => {
        modsUl.append(createMemberItem(mod));
    })

    online.forEach(on => {
        onlineUl.append(createMemberItem(on));
    })

    offline.forEach(off => {
        offlineUl.append(createMemberItem(off));
    })

    invited.forEach(inv => {
        invitedUl.append(createMemberItem(inv));
    })
}

function createMemberItem(member) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');

    li.className = 'member-container rounded-container';
    if(member.userstatus === '0') li.classList.add('offline');
    div.className = 'icon-card icon-size-medium';
    div.style = '--icon-bg-color: ' + member.theme_color + ';';
    span.innerText = member.username;
    span.style = '--sidebar-username-color: ' + member.theme_color + ';';

    li.append(div, span);
    li.addEventListener('click', () => {
        openUserModal({
            id: member.member_id,
            ...member
        });
        
    })
    return li;
}