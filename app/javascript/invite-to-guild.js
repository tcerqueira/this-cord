const currentGuildId = document.getElementById('currentGuildId').dataset.guildId;
const currentInviteKey = document.getElementById('currentInviteKey').dataset.inviteKey;

render();
async function render() {
    try {
        await api.joinGuild({
            guildId: currentGuildId,
            inviteKey: currentInviteKey
        });
        document.querySelector('.display-success').style.display = 'flex';
    }
    catch (err) {
        console.log(err);
        document.querySelector('.display-failure').style.display = 'flex';
    }
}