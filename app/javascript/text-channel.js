const messagesList = document.getElementById("messages-list");
console.log(messagesList);

const messages = [
    { id: 1, content: "Hellommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"},
    { id: 1, content: "Hello"}
];

messages.forEach(message => {
    renderMessage(message);
});

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
    listItem.innerText = message.content;
    renderMessageOptions(listItem, false);
    messagesList.append(listItem);
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
    listItem.append(div);
}
