const guild = { id: '123', guildname: 'tyty', initials: 'ty', admin_id: '543', theme_color: '#0f0' };
const members = [
    { id: '2', username: 'titi', userstatus: '1', theme_color: '#f00', guild_role:'2', invite_status:'1', invite_sender:'2'},
    { id: '1', username: 'lou', userstatus: '0', theme_color: '#a00', guild_role:'0', invite_status:'1', invite_sender:'2'},
    { id: '3', username: 'pa99', userstatus: '1', theme_color: '#0a0', guild_role:'0', invite_status:'1', invite_sender:'2'},
    { id: '4', username: 'rezi', userstatus: '0', theme_color: '#00a', guild_role:'1', invite_status:'1', invite_sender:'2'}
];

document.querySelectorAll('.username').forEach(username => {
    const user = members.find(member => member.id === username.dataset.userId);
    
    username.addEventListener('click', () => {
        // const user = fetchUser(username.dataset.userId);
        const modalUser = { id:'1', username:'lou', theme_color:'#00a', description:'sou eu, o lou', userstatus: '1', is_friend:false};
        openModal('user-modal');
        renderUserModal(modalUser);
    })
})