const guild = { id: '123', guildname: 'tyty', initials: 'ty', admin_id: '543', theme_color: '#0f0' };
const members = [
    { id: '2', username: 'titi', userstatus: '1', theme_color: '#f00' },
    { id: '1', username: 'lou', userstatus: '0', theme_color: '#a00' },
    { id: '3', username: 'pa99', userstatus: '1', theme_color: '#0a0' },
    { id: '4', username: 'rezi', userstatus: '0', theme_color: '#00a' }
];

document.querySelectorAll('.username').forEach(username => {
    const user = members.find(member => member.id === username.dataset.userId);
    
    username.addEventListener('click', () => {
        // const user = fetchUser(username.dataset.userId);
        renderUserModal({
            username: user.username,
            theme_color: user.theme_color,
            description: user.user_description,
            user_note: localStorage.getItem('note_' + user.id)
        })
        openModal('user-modal');
    })
})