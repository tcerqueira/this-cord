render();

async function render()
{
    try {
        const myGuilds = await api.fetchMyGuilds();
        renderNav(myGuilds);
    }
    catch (err) {
        console.log(err);
    }
}

function renderUsersList(users, options) {
    
}