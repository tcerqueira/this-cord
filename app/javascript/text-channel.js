const messagesList = document.getElementById("messages-list");

const messages = [
    { id: 1, author: 'lou', content: "Hellommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'tansi', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'burro', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"},
    { id: 1, author: 'lou', content: "Hello"}
];

let lastMessage = undefined;
let lastMessageItem = undefined;
messages.forEach(message => {
    if(lastMessage && lastMessage.author != message.author)
    {
        renderMessageAuthor(lastMessageItem, lastMessage.author);
    }
    const messageItem = renderMessage(message);
    lastMessage = message;
    lastMessageItem = messageItem;
});

renderMessageAuthor(lastMessageItem, lastMessage.author);

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
    listItem.classList.add('message');
    listItem.innerText = message.content + ' - ' + message.author;
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

function renderMessageAuthor(messageItem, author)
{
    console.log(author);
    const authorAvatar = document.createElement('div');
    authorAvatar.classList.add('author-avatar');
    authorAvatar.innerText = author;
    messageItem.append(authorAvatar);
}
