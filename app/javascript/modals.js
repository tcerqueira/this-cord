const modalPane = document.querySelector('.modal-pane');
let currentModal

window.onclick = evt => {
    if(evt.target == modalPane)
        closeModal();
}

// openModal('user-modal');
// renderUserModal({
//     username: 'lou',
//     theme_color: '#f00',
//     description: 'sou um tansinnho',
//     user_note: localStorage.getItem('note_1')
// })

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

function renderUserModal({username, theme_color, description, user_note})
{
    const usernameSpan = document.getElementById('username-user-modal');
    const themeDiv = document.getElementById('theme-user-modal');
    const aboutP = document.getElementById('about-user-modal');
    const noteP = document.getElementById('note-user-modal');

    usernameSpan.innerText = username;
    themeDiv.style = `--user-bg-panel: ${theme_color};`;
    aboutP.innerText = description;
    noteP.innerText = user_note;
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