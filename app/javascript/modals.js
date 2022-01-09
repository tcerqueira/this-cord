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

function renderUserModal(user)
{
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

function renderConfirmationModal(message, callbackFn)
{
    document.getElementById('confirmation-message').innerText = message;
    // remove all event listeners
    const oldButton = document.getElementById("confirm-btn-modal");
    const newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);

    newButton.addEventListener('click', callbackFn);
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