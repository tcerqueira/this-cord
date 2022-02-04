const currentGuildId = document.getElementById('currentGuildId').dataset.guildId;
var colorPicker;
let themeColor;



render();


async function render()
{
    try
    {
        //TODO check member permissions
        const [currentGuild, textChannels, members] = await Promise.all([
            api.fetchGuild({id: currentGuildId}),
            api.fetchAllChannels({ guildId: currentGuildId }),
            api.fetchGuildMembers({ id: currentGuildId })
        ]);
        renderTextChannels(textChannels);
        renderMembers(members);
        renderGuildInfo(currentGuild);
        startupColor();
        defaultColor();
    }
    catch(err)
    {
        console.log(err)
    }
} 


function createChannelItem(channel)
{
    const textChannelItem = document.getElementById('channelItemTemplate').cloneNode(true);
    textChannelItem.style = '';
    textChannelItem.removeAttribute('id');
    textChannelItem.removeAttribute('aria-hidden');
    textChannelItem.querySelector("input").value = channel.channelname;
    textChannelItem.querySelector("input").disabled = true;
    textChannelItem.querySelector("button[name=deleteButton]").onclick = ()=>{
        openConfirmationModal('Do you want to delete text-channel?', async () =>{
        try 
        {        
            const response = await api.deleteTextChannel({channel_id: channel.id});
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            closeModal();
        } 
        });  
    }
    
    textChannelItem.querySelector("button[name=editButton]").onclick = ()=>{
        if(textChannelItem.querySelector("input").disabled == false)
        {
            textChannelItem.querySelector("input").disabled = true;
            textChannelItem.querySelector("div[name=divColor]").style.background = "transparent";
            // textChannelItem.querySelector("div[name=divColor]").style.border = "transparent";
        }
        else
        {
            textChannelItem.querySelector("input").disabled = false;
            textChannelItem.querySelector("div[name=divColor]").style.background = "#202225";
            // document.getElementById('text-input-container-color-guild-name').style.border = "1px solid #202225";
        }
        
        }
    return textChannelItem;
}

function renderTextChannels(textChannels)
{
    const list = document.getElementById('textChannelsList');
    textChannels.forEach(textChannel => {
        list.append(createChannelItem(textChannel));
        
    });    
}

function renderMembers(members)
{
    const list = document.getElementById('membersList');
    members.forEach(member => {
        list.append(createMemberItem(member));
    });    
}

function createMemberItem(member)
{
    const memberItem = document.getElementById('memberItemTemplate').cloneNode(true);
    memberItem.style = '';
    memberItem.removeAttribute('id');
    memberItem.removeAttribute('aria-hidden');
    memberItem.querySelector("span").innerText = member.username;
    switch (member.guild_role)
    {
        case '0':
        {
            memberItem.querySelector("select").value = "role-user";
            break;
        }
        case '1':
        {
            memberItem.querySelector("select").value = "role-moderator";
            break;
        }
        case '2':
        {
            memberItem.querySelector("select").value = "role-admin";
            break;
        }
    }
    // memberItem.querySelectorAll('select').onchange = ()=>{
    //     console.log(document.getElementById('roles').value);
    // }

    memberItem.querySelector("button[name=kickButton]").onclick = ()=>{
        openConfirmationModal('Do you want to kick this member?', async () =>{
        try 
        {        
            const response = await api.kickMember({guildId: currentGuildId, memberId:member.id});
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            closeModal();
        } 
        });  
    }
    return memberItem;
}

function renderGuildInfo(guild)
{
    document.getElementById('guild-name-input').value = guild.guildname;
    document.getElementById('guild-init-input').value = guild.initials;
    themeColor = guild.theme_color;
    console.log(guild.theme_color)
}

document.getElementById('guild-name-input').disabled = true;
document.getElementById('guild-init-input').disabled = true;

// document.getElementById('roles').onchange = ()=>{
// console.log(document.getElementById('roles').value);
// }

//######################## Button clicks ##############################
document.getElementById("editGuildNameButton").onclick = ()=>{
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

document.getElementById('guild-save-changes').onclick = confirmUpdateGuild;

 document.getElementById('create-text-channel-button').onclick = ()=>{
     console.log('dddd')
     if (document.getElementById('create-text-channel-div').style.display == 'flex')
     {
        document.getElementById('create-text-channel-div').style.display = 'none';
     }
     else
     {
        document.getElementById('create-text-channel-div').style.display = 'flex';
     }
 }

 document.getElementById('confirm-add-text-channel').onclick = addTextChannel;


function confirmUpdateTextChannel()
{
    openConfirmationModal('Do you want to save changes?', async () =>{
        try {
            const guildname = document.getElementById('guild-name-input').value;
            
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
    openConfirmationModal('Do you want to submit changes?', async () =>{
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
    openConfirmationModal('Do you want to submit changes?', async () =>{
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



// // ################################# Functions colorPicker ####################################
function startupColor() 
{
  colorPicker = document.querySelector("#guild-color");
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

