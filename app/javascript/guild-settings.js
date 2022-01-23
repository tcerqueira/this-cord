var colorPicker;
// let defaultColorUser = '#ffffff';
let themeColor;

render();
async function render()
{
    try
    {
        
    }
    catch
    {

    }
} 


document.getElementById('guild-name-input').disabled = true;
document.getElementById('guild-init-input').disabled = true;

document.getElementById('roles').onchange = ()=>{
console.log(document.getElementById('roles').value);
};

getGuild().then(guildInfo => {
    //getGuildInfo(guildInfo);
    console.log(guildInfo)
    console.log('gd')
    startupColor();
    defaultColor();
    });

startupColor();
defaultColor();

//######################## Button clicks ##############################
document.getElementById("editGuildNameButton").onclick = usernameDisable =>{
    console.log('dff')
    if(document.getElementById('guild-name-input').disabled == false)
    {
        document.getElementById('guild-name-input').disabled = true;
        document.getElementById('text-input-container-color-guild-name').style.background = "transparent";
        document.getElementById('text-input-container-color-guild-name').style.border = "transparent";
    }
    else
    {
        document.getElementById('guild-name-input').disabled = false;
        document.getElementById('text-input-container-color-guild-name').style.background = "#202225";
        // document.getElementById('text-input-container-color-guild-name').style.border = "1px solid #202225";
    }
    
}

document.getElementById("editGuildInitialsButton").onclick = () =>{
    if(document.getElementById('guild-init-input').disabled == false)
    {
        document.getElementById('guild-init-input').disabled = true;
        document.getElementById('text-input-container-color-guild-init').style.background = "transparent";
        document.getElementById('text-input-container-color-guild-init').style.border = "transparent";
    }
    else
    {
        document.getElementById('guild-init-input').disabled = false;
        document.getElementById('text-input-container-color-guild-init').style.background = "#202225";
        // document.getElementById('text-input-container-color-guild-init').style.border = "1px solid #202225";
    }
    
}
// document.getElementById("phoneNumberButton").onclick = phoneDisable =>{
//     phoneNumberInput.disabled = false;
// }
// document.getElementById("changePasswordButton").onclick = passwordButtonClick;

// document.getElementById("delete-account").onclick = confirmDelete;

// document.getElementById('submitChangesButtonAccount').onclick = confirmUpdateAccount;

document.getElementById('guild-save-changes').onclick = confirmUpdateGuild;

 document.getElementById('create-text-channel-button').onclick = ()=>{
     if (document.getElementById('create-text-channel-div').style.display == 'flex')
     {
        document.getElementById('create-text-channel-div').style.display = 'none';
     }
     else
     {
        document.getElementById('create-text-channel-div').style.display = 'flex';
     }
 };

 document.getElementById('confirm-add-text-channel').onclick = addTextChannel;



function getGuildInfo(guildInfo)
{
    const guildName = document.getElementById('guild-name-input');
    const guildInit = document.getElementById('guild-init-input');
    
   
    //themeColor = guildInfo.theme_color;
    // console.log('color user'+ defaultColorUser);
    // const userProfileInput = document.getElementById('userprofile-username');
    // userProfileInput.innerText = userInfo.username;
    
    guildName.value = guildInfo.guildname;
    usernameInput.disabled = true;
    
    guildInit.value = guildInfo.initials;
    guildInit.disabled = true;
    
    // const phoneNumberButton = document.getElementById('phoneNumberButton');
    
    // if(userInfo.phoneNumber == null){
    //     phoneNumberButton.innerText = 'Add';
    //     phoneNumberInput.disabled = true;
    // }
    // else{
    //     phoneNumberButton.innerText = 'Edit';
    //     phoneNumberInput.value = userInfo.phoneNumber;
    //     phoneNumberInput.disabled = true;
    // }

}




function renderTextChannels(textChannels)
{

}


async function getMembers()
{
    try {
        const response = await api.fetchGuildMembers({id});
        return response;
    }
    catch(err)
    {
        console.log(err);
    }
}


async function getTextChannels()
{
    try {
        const response = await api.fetchAllChannels({id});
        return response;
    }
    catch(err)
    {
        console.log(err);
    }
}

function confirmDeleteTextChannel()
{
    openModal('confirmation-modal');
    renderConfirmationModal('Do you want to delete text-channel?', async () =>{
        try {
            const guildname = document.getElementById('guild-name-input').value;
            const initials = document.getElementById('guild-init-input').value;
            
            const response = await api.updateGuild({guildname, initials, openInviteKey, themeColor});
            console.log(response);

            return response;
            
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            closeModal();
        }
        
    } );  
}

function confirmUpdateTextChannel()
{
    openModal('confirmation-modal');
    renderConfirmationModal('Do you want to save changes?', async () =>{
        try {
            const guildname = document.getElementById('guild-name-input').value;
            const initials = document.getElementById('guild-init-input').value;
            
            const response = await api.updateTextChannel({channel_id, channelname});
            console.log(response);

            return response;
            
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            closeModal();
        }
        
    } );  
}


function addTextChannel()
{
    openModal('confirmation-modal');
    renderConfirmationModal('Do you want to submit changes?', async () =>{
        try {
            const textChannelName = document.getElementById('add-text-channel-name').value;

            const response = await api.createTextChannel({guildId, textChannelName});
            console.log(response);

            return response;
            
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            closeModal();
            document.getElementById('create-text-channel-div').style.display = 'none';
        }
        
    } );  
}

function confirmUpdateGuild()
{
    openModal('confirmation-modal');
    renderConfirmationModal('Do you want to submit changes?', async () =>{
        try {
            const guildname = document.getElementById('guild-name-input').value;
            const initials = document.getElementById('guild-init-input').value;
            
            const response = await api.updateGuild({guildname, initials, openInviteKey, themeColor});
            console.log(response);

            return response;
            
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            closeModal();
        }
        
    } );  
}


async function getGuild()
{
    try {
        const response = await api.fetchGuild({});
        console.log(response)
        return response;
    }
    catch(err)
    {
        console.log(err);
    }
}


async function changeRole()
{
    try {
        const response = await api.changeMemberRole({guildId, memberId, guildRole});
        return response;
    }
    catch(err)
    {
        console.log(err);
    }
}

function kickMember()
{
    openModal('confirmation-modal');
    renderConfirmationModal('Do you want to kick?', async () =>{
        try {
                        
            const response = await api.kickMember({guildId, memberId});
            console.log(response);

            return response;
            
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            closeModal();
        }
        
    } );  
}

// // ################################# Functions colorPicker ####################################
function startupColor() 
{
  colorPicker = document.querySelector("#guild-color");
  console.log('default picker'+defaultColorUser);
  colorPicker.value = themeColor;
  colorPicker.addEventListener("input", updateFirst, false);
  colorPicker.addEventListener("change", updateFirst, false);
  colorPicker.select();
  }

function defaultColor(event)
{
  var guildColor = document.querySelector("#guild-icon");
  if (guildColor) {
    guildColor.style.backgroundColor = themeColor;
    
  }
}

function updateFirst(event) 
{
    var guildColor = document.querySelector("#guild-icon");
  
  if (guildColor) 
  {
    guildColor.style.backgroundColor = event.target.value;
    themeColor = event.target.value;
  }
}


