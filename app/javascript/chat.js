const messages = [
    { id: '19', author: {id: '1', username: 'lou'}, content: "Hellommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", sentAt: '25/12/2021 at 18h30m', reply: { author: {id: '4', username: 'rezi'}, content: 'Hello oh maninho'}},
    { id: '18', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '17', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '16', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '15', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '14', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '13', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '12', author: {id: '2', username: 'titi'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '11', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '10', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '8', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '7', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '6', author: {id: '3', username: 'pa99'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '5', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '4', author: {id: '1', username: 'lou'}, content: "replied", sentAt: '25/12/2021 at 18h30m', reply: { author: {id: '4', username: 'rezi'}, content: 'Hello oh maninhommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'} },
    { id: '3', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '2', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '1', author: {id: '1', username: 'lou'}, content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null }
];

// renderChat(messages);

function renderChat(messages)
{
    let lastMessage = undefined;
    let lastMessageItem = undefined;
    messages.forEach(message => {
        const messageItem = renderMessage(message);

        if(message.reply !== null)
        {
            renderMessageAuthor(messageItem, message);
            renderReply(messageItem, message.reply);
        }
        else if(lastMessage && lastMessage.author.id !== message.author.id)
        {
            renderMessageAuthor(lastMessageItem, lastMessage);
        }
        
        lastMessage = message;
        lastMessageItem = messageItem;
    });

    if(messages.length !==0)
        renderMessageAuthor(lastMessageItem, lastMessage);


    let replyTo = null;
    const replyIcons = document.querySelectorAll('.reply-message-icon');
    replyIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const replyingMessage = messages.find(m => m.id === icon.id.split('_')[1]);
            renderReplying(replyingMessage);
        })
    });

    const cancelReplyingIcon = document.getElementById('cancel-reply-icon');
    cancelReplyingIcon.addEventListener('click', evt => {
        removeReplying();
    })
}

function renderSendMessage(channelId)
{
    document.getElementById('sendMessageForm').onsubmit = async evt => {
        evt.preventDefault();
        try {
            const content = document.getElementById('message-input').value;
            if(!content)
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
    };
}

// ############################################################### FUNCTIONS #####################################################################
// ###############################################################################################################################################

function renderMessage(message)
{
    const listItem = document.createElement('li');
    const messagesList = document.getElementById('messages-list');
    listItem.id = 'message_' + message.id;
    listItem.classList.add('message');
    // add logic to check if its replying to active user
    if(message.author.username === 'pa99')
        listItem.classList.add('message-replying-to-me');

    listItem.innerText = message.content;
    renderMessageOptions(listItem, true);
    messagesList.append(listItem);

    return listItem;
}

function renderMessageOptions(listItem, deletable)
{
    const div = document.createElement('div');
    div.classList.add('message-options');
    const replyIcon = document.createElement('img');
    replyIcon.classList.add('reply-message-icon');
    replyIcon.id = 'reply_' + listItem.id.split('_')[1];
    replyIcon.src = "../public/reply-svgrepo-com.svg";
    replyIcon.alt = 'reply-icon';
    div.append(replyIcon);
    if(deletable)
    {
        const removeIcon = document.createElement('img');
        removeIcon.src = "../public/trash-svgrepo-com.svg";
        removeIcon.alt = 'remove-icon';
        div.append(removeIcon);
    }
    listItem.append(div);
}

function renderMessageAuthor(messageItem, message)
{
    const h3 = document.createElement('h3');
    h3.classList.add('message-author');

    const authorAvatar = document.createElement('div');
    authorAvatar.classList.add('author-avatar');
    authorAvatar.classList.add('icon-size-small');
    authorAvatar.classList.add('icon-card');
    // TODO: theme color
    authorAvatar.style = '--icon-bg-color: ' + '#7289da' + ';';
    authorAvatar.innerText = message.author.username;
    h3.append(authorAvatar);

    const authorSpan = document.createElement('span');
    const dateSpan = document.createElement('span');
    const usernameSpan = createUsernameRef(message.author.id, message.author.username, '#00ff00');
    dateSpan.classList.add('message-date');
    dateSpan.innerText = message.sentAt;
    authorSpan.append(usernameSpan);
    authorSpan.append(dateSpan);
    h3.append(authorSpan);

    messageItem.insertBefore(h3, messageItem.childNodes[0]);
}

function renderReply(messageItem, reply)
{
    const anchor = document.createElement('a');
    // anchor.href = '#message_' + message.id;
    anchor.href = '#';
    const div = document.createElement('div');
    anchor.append(div);
    div.classList.add('reply-preview');
    div.innerText = ': ' + reply.content;

    const span = createUsernameRef(reply.author.id, '@' + reply.author.username, '#ff0000');
    div.insertBefore(span, div.childNodes[0]);

    messageItem.insertBefore(anchor, messageItem.childNodes[0]);
}

function renderReplying(replyTo)
{
    const replyContainer = document.getElementById('reply-container');
    const channelContainer = document.querySelector('.text-channel-container');
    replyContainer.dataset.replyId = replyTo.id;
    document.getElementById('replyingToUsername')?.remove();
    const replyingTo = createUsernameRef(replyTo.author.id, replyTo.author.username, "#0000ff");
    replyingTo.id = 'replyingToUsername';
    document.querySelector('#reply-container > span').append(replyingTo);
    
    if(replyContainer.style.display !== 'flex')
    {
        channelContainer.classList.toggle('text-channel-container-replying');
        replyContainer.style.display = 'flex';
    }
}

function removeReplying()
{
    const replyContainer = document.getElementById('reply-container');
    const channelContainer = document.querySelector('.text-channel-container');
    delete replyContainer.dataset.replyId;
    document.getElementById('replyingToUsername').remove();
    channelContainer.classList.toggle('text-channel-container-replying');
    replyContainer.style.display = '';
}

function createUsernameRef(id, username, theme)
{
    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('username');
    usernameSpan.dataset.userId = id;
    usernameSpan.style = '--user-theme: ' + theme + ';';
    usernameSpan.innerText = username;

    return usernameSpan;
}
