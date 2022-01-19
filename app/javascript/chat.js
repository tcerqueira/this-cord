function renderChat(messages, lastMessage = undefined) {
    let lastMsg = lastMessage;
    let lastMsgItem = undefined;
    messages.forEach(message => {
        const messageItem = renderMessage(message);

        if (message.reply !== null) {
            renderMessageAuthor(messageItem, message);
            renderReply(messageItem, message.reply);
        }
        if (lastMsg && lastMsg.author.id !== message.author.id) {
            renderMessageAuthor(lastMsgItem, lastMsg);
        }

        lastMsg = message;
        lastMsgItem = messageItem;
    });

    if(lastMessage === undefined)
        renderMessageAuthor(document.querySelector('#messages-list > li:last-child'), messages[messages.length-1]);
}

document.querySelectorAll('.reply-message-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const replyingMessage = messages.find(m => m.id === icon.id.split('_')[1]);
        renderReplying(replyingMessage);
    })
});

document.getElementById('cancel-reply-icon').addEventListener('click', evt => {
    removeReplying();
})

function renderSendMessage(channelId) {
    document.getElementById('sendMessageForm').onsubmit = async evt => {
        evt.preventDefault();
        document.getElementById('sendMessageButton').disabled = true;
        try {
            const content = document.getElementById('message-input').value;
            if (!content)
                return;
            const replyTo = document.getElementById('reply-container').dataset.replyId;
            const message = {
                channelId,
                replyTo: replyTo ? replyTo : null,
                content
            }

            const messageRet = await api.sendMessage(message);
            document.getElementById('message-input').value = '';
            removeReplying();
            
        }
        catch (err) {
            console.log(err);
        }
        finally {
            document.getElementById('sendMessageButton').disabled = false;
        }
    };
}

// ############################################################### FUNCTIONS #####################################################################
// ###############################################################################################################################################

function addMessages(messages) {
    messages
}

function renderMessage(message) {
    const listItem = document.createElement('li');
    const messagesList = document.getElementById('messages-list');
    listItem.id = 'message_' + message.id;
    listItem.dataset.sentAt = message.sent_at;
    listItem.classList.add('message');
    // add logic to check if its replying to active user
    if (message.reply?.author.id === currentProfileId)
        listItem.classList.add('message-replying-to-me');

    listItem.innerText = message.content;
    renderMessageOptions(listItem, true);
    messagesList.append(listItem);

    return listItem;
}

function renderMessageOptions(listItem, deletable) {
    const div = document.createElement('div');
    div.classList.add('message-options');
    const replyIcon = document.createElement('img');
    replyIcon.classList.add('reply-message-icon');
    replyIcon.id = 'reply_' + listItem.id.split('_')[1];
    replyIcon.src = "../public/reply-svgrepo-com.svg";
    replyIcon.alt = 'reply-icon';
    div.append(replyIcon);
    if (deletable) {
        const removeIcon = document.createElement('img');
        removeIcon.src = "../public/trash-svgrepo-com.svg";
        removeIcon.alt = 'remove-icon';
        div.append(removeIcon);
    }
    listItem.append(div);
}

function renderMessageAuthor(messageItem, message) {
    const h3 = document.createElement('h3');
    h3.classList.add('message-author');

    const authorAvatar = document.createElement('div');
    authorAvatar.classList.add('author-avatar');
    authorAvatar.classList.add('icon-size-small');
    authorAvatar.classList.add('icon-card');
    // TODO: theme color
    authorAvatar.style = `--icon-bg-color: ${message.author.theme_color};`;
    authorAvatar.innerText = message.author.username;
    h3.append(authorAvatar);

    const authorSpan = document.createElement('span');
    const dateSpan = document.createElement('span');
    const usernameSpan = createUsernameRef(message.author.id, message.author.username, message.author.theme_color);
    dateSpan.classList.add('message-date');
    dateSpan.innerText = (new Date(message.sent_at)).toLocaleString('pt-PT');
    authorSpan.append(usernameSpan);
    authorSpan.append(dateSpan);
    h3.append(authorSpan);

    messageItem.insertBefore(h3, messageItem.childNodes[0]);
}

function renderReply(messageItem, reply) {
    const anchor = document.createElement('a');
    anchor.href = '#message_' + reply.id;
    const div = document.createElement('div');
    anchor.append(div);
    div.classList.add('reply-preview');
    div.innerText = ': ' + reply.content;

    const span = createUsernameRef(reply.author.id, '@' + reply.author.username, reply.author.theme_color);
    div.insertBefore(span, div.childNodes[0]);

    messageItem.insertBefore(anchor, messageItem.childNodes[0]);
}

function renderReplying(replyTo) {
    const replyContainer = document.getElementById('reply-container');
    const channelContainer = document.querySelector('.text-channel-container');
    replyContainer.dataset.replyId = replyTo.id;
    document.getElementById('replyingToUsername')?.remove();
    const replyingTo = createUsernameRef(replyTo.author.id, replyTo.author.username, "#0000ff");
    replyingTo.id = 'replyingToUsername';
    document.querySelector('#reply-container > span').append(replyingTo);

    if (replyContainer.style.display !== 'flex') {
        channelContainer.classList.toggle('text-channel-container-replying');
        replyContainer.style.display = 'flex';
    }
}

function removeReplying() {
    const replyContainer = document.getElementById('reply-container');
    const channelContainer = document.querySelector('.text-channel-container');
    delete replyContainer.dataset.replyId;
    document.getElementById('replyingToUsername')?.remove();
    channelContainer.classList.remove('text-channel-container-replying');
    replyContainer.style.display = '';
}

function createUsernameRef(id, username, theme) {
    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('username');
    usernameSpan.dataset.userId = id;
    usernameSpan.style = '--user-theme: ' + theme + ';';
    usernameSpan.innerText = username;

    usernameSpan.addEventListener('click', async () => {
        try {
            const user = await api.fetchUser({ id });
            openUserModal(user);
        }
        catch (err) {
            console.log(err);
        }
    });

    return usernameSpan;
}
