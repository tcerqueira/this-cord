const currentTextChannelId = document.getElementById('currentChannelId').dataset.channelId;

render();
async function render() {
    try {
        const [ myGuilds, messages, friendsList, guildInvites, user ] = await Promise.all([
            api.fetchMyGuilds(),
            api.fetchMessages({ channelId: currentTextChannelId }),
            api.fetchFriends(),
            api.fetchGuildInvites(),
            api.fetchUser({ id: currentProfileId })
        ]);
        
        renderNav(myGuilds);
        renderDmNav(friendsList.filter(f => f.invite_status === '1'));
        renderGuildInvites(guildInvites);
        renderSendMessage(currentTextChannelId);
        renderChat(messages);
        renderUserbar(user);

        document.querySelector('.page-header').innerText = `Direct messages`;

        // schedule the first invocation:
        setTimeout(fetchMessagesPeriodically, 1000);

    } catch (err) {
        console.log(err);
        openErrorModal(err.error, () => {
            // window.location.href = 'login.php';
            closeModal();
        });
    }
}
