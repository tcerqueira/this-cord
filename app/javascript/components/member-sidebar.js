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
    const li = document.getElementById('memberItemTemplate').content.firstElementChild.cloneNode(true);
    const wrapper = li.querySelector('.status-wrapper');
    const div = li.querySelector('.icon-card');
    const span = li.querySelector('span');
    const img = li.querySelector('img');

    if(member.userstatus === '1') {
        li.classList.remove('offline');
        wrapper.classList.remove('status-offline');
    }
    // div.className = 'icon-card icon-size-medium';
    div.style = '--icon-bg-color: ' + member.theme_color + ';';
    span.innerText = member.username;
    span.style = '--sidebar-username-color: ' + member.theme_color + ';';
    img.src = `${api.imgUrl}/${member.img_name}`;

    li.addEventListener('click', async () => {
        try {
            const friend = await api.fetchFriend({ id: member.member_id });
            openUserModal(friend);
        }
        catch (err) {
            console.log(err);
        }        
    });
    return li;
}