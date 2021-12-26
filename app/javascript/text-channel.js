const messagesList = document.getElementById('messages-list');

const messages = [
    { id: '19', author: 'lou', content: "Hellommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", sentAt: '25/12/2021 at 18h30m', replyTo: { author: 'maninho', content: 'Hello oh maninho'}},
    { id: '18', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '17', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '16', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '15', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '14', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '13', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '12', author: 'tansi', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '11', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '10', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '8', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '7', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '6', author: 'burro', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '5', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '4', author: 'lou', content: "replied", sentAt: '25/12/2021 at 18h30m', reply: { author: 'maninho', content: 'Hello oh maninho'} },
    { id: '3', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '2', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null },
    { id: '1', author: 'lou', content: "Hello", sentAt: '25/12/2021 at 18h30m', reply: null }
];

let lastMessage = undefined;
let lastMessageItem = undefined;
messages.forEach(message => {
    const messageItem = renderMessage(message);

    if(message.reply !== null)
    {
        renderMessageAuthor(messageItem, message);
        renderReply(messageItem, message.reply);
    }
    else if(lastMessage && lastMessage.author != message.author)
    {
        renderMessageAuthor(lastMessageItem, lastMessage);
    }
    
    lastMessage = message;
    lastMessageItem = messageItem;
});

if(messages.length !==0)
    renderMessageAuthor(lastMessageItem, lastMessage);

const replyIcons = document.querySelectorAll('.reply-message-icon');
replyIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        console.log('Reply icon clicked');
        // implement replies
    })
});

function renderMessage(message)
{
    const listItem = document.createElement('li');
    listItem.id = 'message-' + message.id;
    listItem.classList.add('message');
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
    authorAvatar.innerText = message.author;
    h3.append(authorAvatar);

    const authorSpan = document.createElement('span');
    const usernameSpan = document.createElement('span');
    const dateSpan = document.createElement('span');
    usernameSpan.classList.add('username');
    usernameSpan.innerText = message.author;
    dateSpan.classList.add('message-date');
    dateSpan.innerText = message.sentAt;
    authorSpan.append(usernameSpan);
    authorSpan.append(dateSpan);
    h3.append(authorSpan);

    messageItem.insertBefore(h3, messageItem.childNodes[0]);
}

function renderReply(messageItem, reply)
{

}
