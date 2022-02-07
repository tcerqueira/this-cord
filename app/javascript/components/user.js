const currentProfileId = document.getElementById('currentUserId').dataset.id;
let currentProfile;
async function getProfile() {
    if(currentProfile)
        return currentProfile;
    try {
        currentProfile = await api.fetchProfile();
    }
    catch (err) {
        console.log(err);
    }
    return currentProfile;
}

let currentFriendsList;
async function getFriendsList()
{
    if(currentFriendsList)
        return currentFriendsList;
    try {
        currentFriendsList = await api.fetchFriends();
    }
    catch (err) {
        console.log(err);
    }
    return currentFriendsList;
}