const currentGuildId = document.getElementById('currentGuildId').dataset.guildId;
const currentUserId = document.getElementById('currentUserId').dataset.id;
var colorPicker;
let themeColor;
let currentUserRole;


render();


async function render()
{
    try
    {
        //TODO check member permissions
        const [currentGuild, textChannels, members, {open_invite_key: openInviteKey}] = await Promise.all([
            api.fetchGuild({id: currentGuildId}),
            api.fetchAllChannels({ guildId: currentGuildId }),
            api.fetchGuildMembers({ id: currentGuildId }),
            api.generateOpenInvite({guildId: currentGuildId})
        ]);
        renderTextChannels(textChannels);
        renderMembers(members);
        checkPermissions();
        renderInviteMembers(members);
        renderGuildInfo(currentGuild);
        startupColor();
        defaultColor();
        
        document.getElementById('guild-save-changes').onclick = ()=>{
        openConfirmationModal('Do you want to submit changes?', async () =>{
            
            const guildname = document.getElementById('guild-name-input').value;
            const initials = document.getElementById('guild-init-input').value;

            if(!guildname || !initials) {
                document.getElementById('GuildSettingsError').innerText = 'Invalid input.';
                return;
            }
            if(guildname.length > 24) {
                document.getElementById('GuildSettingsError').innerText = 'Guild name too long';
                return;
            }
            if(initials.length > 3) {
                document.getElementById('GuildSettingsError').innerText = 'Guild initials too long';
                return;
            }

            try 
            {   
                const guildname = document.getElementById('guild-name-input').value;
                const initials = document.getElementById('guild-init-input').value;
                    
                const response = await api.updateGuild({guildId: currentGuildId, guildname, initials, openInviteKey, themeColor});
                    
                await api.updateGuildAvatar({
                    guildId: currentGuildId,
                    avatar: document.getElementById('guildsettings-img-input').files[0]
                    });
                    
                }
                catch(err)
                {
                    openErrorModal(err.error, ()=>{
                        closeModal()
                    });
                }
                finally
                {
                    closeModal();
                }
                
            } );  
        
        };
        document.getElementById("esc-guild-settings").onclick = ()=>{
            if(textChannels[0])
                window.location.href = `text-channel.php?id=${textChannels[0].id}`;
            else
                window.location.href = `text-channel.php?id=${currentGuildId}`;
        }
    }
    catch(err)
    {
        openErrorModal(err.error, ()=>{
            closeModal()
        });
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
            location.reload();
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
            openConfirmationModal("Do you want to update the text-channel?", async()=>{
                try
                {
                    const channelname = textChannelItem.querySelector("input").value;
                    const response = await api.updateTextChannel({channel_id: channel.id, channelname})
                }
                catch(err)
                {
                    console.log(err)
                }
                finally
                {
                    closeModal();
                }
            })
        }
        else
        {
            textChannelItem.querySelector("input").disabled = false;
            textChannelItem.querySelector("div[name=divColor]").style.background = "#202225";
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
    const selectorAdmin = document.getElementById ('transferAdmin'); 
    members.forEach(member => {
        if(member.invite_status == '1')
        {
            list.append(createMemberItem(member));

            const opt = document.createElement('option');
            opt.value = member.member_id;
            opt.innerText = member.username;
            selectorAdmin.appendChild(opt);
            

            if(member.member_id==currentUserId)
            {
                currentUserRole = member.guild_role;
            }
        }
        if (member.guild_role == '2')
            selectorAdmin.value = member.member_id;
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
            const opt = document.createElement('option');
            opt.value = "role-admin";
            opt.innerText = "Admin";
            memberItem.querySelector("select").appendChild(opt);

            memberItem.querySelector("select").value = "role-admin";
            memberItem.querySelector("button[name=kickButton]").disabled = true;
            memberItem.querySelector("select").disabled = true;
            
            break;
        }
    }

    let newRole;
    if(member.member_id==currentUserId)
        memberItem.querySelector("button[name=kickButton]").disabled = true;
        
    memberItem.querySelector("button[name=kickButton]").onclick = ()=>{
        openConfirmationModal('Do you want to kick this member?', async () =>{
        try 
        {        
            const response = await api.kickMember({guildId: currentGuildId, memberId: member.member_id});
            location.reload();
        }
        catch(err)
        {
            openErrorModal(err.error, ()=>{
                closeModal()
            });
        }
        finally
        {
            closeModal();
        } 
        });  
    }

    const selectRole = memberItem.querySelector("select");
    selectRole.onchange = ()=>{
        switch (selectRole.value)
        {
            case 'role-user':
            {
                newRole = '0';
                break;
            }
            case 'role-moderator':
            {
                newRole = '1';
                break;
            }
        }
        openConfirmationModal('Do you want to change Role?', async () =>{
            try
            {
                const response = await api.updateMemberRole({guildId: currentGuildId, memberId: member.member_id, guildRole: newRole});
                location.reload();
            }
            catch(err)
            {
                openErrorModal(err.error, ()=>{
                    closeModal()
                });
            }
            finally
            {
                closeModal();
            }
        });
    }

    return memberItem;
}


function renderInviteMembers(members)
{
    const list = document.getElementById('invitesList');
    members.forEach(member => {
        if(member.invite_status == '0')
        {
            list.append(createInviteMemberItem(member));
        }
    });    
}


function createInviteMemberItem(member)
{
    const inviteMemberItem = document.getElementById('inviteMemberItemTemplate').cloneNode(true);
    inviteMemberItem.style = '';
    inviteMemberItem.removeAttribute('id');
    inviteMemberItem.removeAttribute('aria-hidden');
    inviteMemberItem.querySelector("span").innerText = member.username;
    
    inviteMemberItem.querySelector("button[name=cancelInviteButton]").onclick = ()=>{
        openConfirmationModal("Do you want to cancel invite?", async () =>{
            try
            {
                const response = await api.kickMember({guildId: currentGuildId, memberId: member.member_id});
                location.reload();
            }
            catch(err)
            {
                openErrorModal(err.error, ()=>{
                    closeModal()
                });
            }
            finally
            {
                closeModal();
            }
        });
    }
    return inviteMemberItem;
}


function renderGuildInfo(guild)
{
    document.getElementById('guild-name-input').value = guild.guildname;
    document.getElementById('guild-init-input').value = guild.initials;
    themeColor = guild.theme_color;
    const avatarSettings = guild.img_name;
    document.getElementById('img-guild-settings').src = `${api.imgUrl}/${avatarSettings}`;
    
}

document.getElementById('guild-name-input').disabled = true;
document.getElementById('guild-init-input').disabled = true;

//############################# Check Permissions ###########################
function checkPermissions()
{
    switch (currentUserRole)
    {
        case '2':
        {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button =>{
                button.style.display = 'inline-block';
            });
            break;
        }
        case '1':
        {
            const buttons = document.querySelectorAll('.moderator');
            buttons.forEach(button =>{
                button.style.display = 'inline-block';
            });
            const selects = document.querySelectorAll('select');
            selects.forEach(select =>{
                select.disabled = true;
            });
            document.querySelector("button[name=LeaveGuild]").style.display = 'flex'; 
            break;
        }
        case '0':
        {
            const buttons = document.querySelectorAll('.buttonSettings');
            buttons.forEach(button =>{
                button.style.display = 'none';
            } );
            const selects = document.querySelectorAll('select');
            selects.forEach(select =>{
                select.disabled = true;
            } );
            document.querySelector("button[name=LeaveGuild]").style.display = 'flex';
            break;
        }

    }
}

//######################## Transfer Admin #############################

document.getElementById ('transferAdmin').onchange = ()=>{
    document.getElementById("confirmPasswordGuild").style.display = 'flex';
    
}

document.getElementById("confirmPasswordGuildButton").onclick  = async ()=>{
    
    openConfirmationModal("Do you want to transfer admin?", async ()=>{
        try
        {
            const password = document.getElementById("passwordGuild").value;
            const newAdmin = document.getElementById ('transferAdmin').value;
            const response = await api.transferAdmin({guildId: currentGuildId, newAdmin, password });
            location.reload();
        }
        catch (err)
        {
            openErrorModal(err.error, ()=>{
                closeModal()
            });
        }
        finally
        {
            closeModal();
            document.getElementById("confirmPasswordGuild").style.display = 'none';   
        }

    });
}

//######################## Leave Guild ################################

document.querySelector("button[name=LeaveGuild]").onclick = () =>{
    openConfirmationModal("Do you want to leave this guild?", async ()=>{
        try
        {
            await api.leaveGuild({guildId:currentGuildId});
            window.location.href = "home.php";
        }
        catch(err)
        {
            openErrorModal(err.error, ()=>{
                closeModal()
            });
        }
        finally
        {
            closeModal();
        }
    });
}

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
        document.getElementById('text-input-container-color-guild-name').style.background = "var(--color-dark-grey)";

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
        document.getElementById('text-input-container-color-guild-init').style.background = "var(--color-dark-grey)";
    }  
}


document.getElementById('guildsettings-img-input').onchange = () => {
    const avatarSettings = document.getElementById('guildsettings-img-input').files[0];
    document.getElementById('img-guild-settings').src = avatarSettings ? URL.createObjectURL(avatarSettings) : '#';
}

document.getElementById('create-text-channel-button').onclick = ()=>{
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
            const channelname = document.getElementById('guild-name-input').value;
            const response = await api.updateTextChannel({channel_id, channelname});            
            location.reload(); 
        }
        catch(err)
        {
            openErrorModal(err.error, ()=>{
                closeModal()
            });
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
            const response = await api.createTextChannel({guildId: currentGuildId, channelName: textChannelName});
            location.reload();
            
        }
        catch(err)
        {
            openErrorModal(err.error, ()=>{
                closeModal()
            });
        }
        finally
        {
            closeModal();
            document.getElementById('create-text-channel-div').style.display = 'none';
        }
        
    });  
}


// ################################# Functions colorPicker ####################################
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
  var guildColor = document.querySelector("#img-guild-settings");
  if (guildColor) {
    guildColor.style.backgroundColor = themeColor;
    
  }
}

function updateFirst(event) 
{
    var guildColor = document.querySelector("#img-guild-settings");
  
  if (guildColor) 
  {
    guildColor.style.backgroundColor = event.target.value;
    themeColor = event.target.value;
  }
}

