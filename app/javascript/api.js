class API
{
    constructor(apiRoot, filesRoot)
    {
        this.apiRoot = apiRoot;
        this.filesRoot = filesRoot;
    }

    get imgUrl() {
        return this.filesRoot;
    }

    // ##################################################### AUTH ########################################################
    // ###################################################################################################################

    signIn({username, password})
    {
        return new Promise((resolve, reject) => {
            const credentials = {
                username,
                password
            }
        
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/auth/signin.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(credentials));
        });
    }

    signUp({username, email, password})
    {
        return new Promise((resolve, reject) => {
            const form = {
                username,
                email,
                password
            }
        
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/auth/signup.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(form));
        });
    }

    signOut()
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/auth/signout.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    fetchProfile()
    {
        return new Promise((resolve, reject) => {
        
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/auth/profile.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    changePassword({oldPassword, newPassword})
    {
        return new Promise((resolve, reject) => {
        
            const body = {
                old_password: oldPassword,
                new_password: newPassword
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/auth/change-password.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    // ##################################################### USER ########################################################
    // ###################################################################################################################

    fetchUser({id})
    {
        return new Promise((resolve, reject) => {
        
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/user/?id='+id, true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    updateUser({username, email, themeColor, userDescription})
    {        
         return new Promise((resolve, reject) => {
            const body = {username, email, theme_color: themeColor, user_description: userDescription};
            
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/user/update.php', true);
            
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }
    
    searchUser({ username })
    {
        return new Promise((resolve, reject) => {
        
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/user/?username='+username, true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    fetchFriend({ id })
    {
        return new Promise((resolve, reject) => {
        
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/user/friends/?id='+id, true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    fetchFriends()
    {
        return new Promise((resolve, reject) => {
        
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/user/friends', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    requestFriend({ id })
    {
        return new Promise((resolve, reject) => {
        
            const body = {
                friend_id: id
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/user/friends/request.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    removeFriend({ id })
    {
        return new Promise((resolve, reject) => {
        
            const body = {
                friend_id: id
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/user/friends/remove.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    deleteUser({password})
    {
        return new Promise((resolve, reject) => {
            const body = {password};

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/user/delete.php', true);
            
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }
    
    acceptFriendRequest({ id })
    {
        return new Promise((resolve, reject) => {
        
            const body = {
                friend_id: id
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/user/friends/accept.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    updateUserAvatar({ avatar })
    {
        return new Promise((resolve, reject) => {

            const body = new FormData();
            body.append('user_avatar', avatar)

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/user/update-avatar.php', true);
            
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(body);
        });
    }

    // #################################################### GUILD ########################################################
    // ###################################################################################################################

    fetchGuild({ id })
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/guild/?id='+id, true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    fetchMyGuilds()
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/guild/my.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    fetchGuildMembers({ id })
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/guild/members/?id='+id, true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    fetchGuildInvites()
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/guild/invite/list.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    generateOpenInvite({ guildId })
    {
        return new Promise((resolve, reject) => {


            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/guild/invite/generate.php?guild_id='+guildId, true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    createGuild({guildname, initials, openInviteKey, themeColor})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                guildname,
                initials,
                open_invite_key: openInviteKey,
                theme_color: themeColor
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/create.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    updateGuild({guildId, guildname, initials, openInviteKey, themeColor})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                guild_id:guildId,
                guildname,
                initials,
                open_invite_key: openInviteKey,
                theme_color: themeColor
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/update.php', true);

            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }
    
    inviteToGuild({ guildId, userId })
    {
        return new Promise((resolve, reject) => {

            const body = {
                guild_id: guildId,
                added_user_id: userId
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/invite/', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    acceptGuildInvite({ id })
    {
        return new Promise((resolve, reject) => {

            const body = {
                guild_id: id,
                answer: true
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/invite/answer.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }
    
    declineGuildInvite({ id })
    {
        return new Promise((resolve, reject) => {

            const body = {
                guild_id: id,
                answer: false
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/invite/answer.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    transferAdmin({guildId, newAdmin, password})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                guild_id: guildId,
                new_admin: newAdmin,
                password
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/transfer-admin.php', true);

            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    joinGuild({ guildId, inviteKey })
    {
        return new Promise((resolve, reject) => {

            const body = {
                guild_id: guildId,
                open_invite_key: inviteKey
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/invite/open.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    updateMemberRole({guildId, memberId, guildRole})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                guild_id: guildId,
                member_id: memberId,
                guild_role: guildRole
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/members/role.php', true);

            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    leaveGuild({guildId})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                guild_id: guildId
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/leave.php', true);

            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    kickMember({guildId, memberId})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                guild_id: guildId,
                member_id: memberId
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/members/kick.php', true);

            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    updateGuildAvatar({ guildId, avatar })
    {
        return new Promise((resolve, reject) => {

            const body = new FormData();
            body.append('guild_id', guildId);
            body.append('guild_avatar', avatar)

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/update-avatar.php', true);
            
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(body);
        });
    }

    deleteGuild({guildId, password})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                guild_id: guildId,
                password
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/guild/delete.php', true);

            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    // ################################################# TEXT CHANNEL ####################################################
    // ###################################################################################################################

    fetchTextChannel({id})
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/text-channel/?channel_id='+id, true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    fetchAllChannels({guildId})
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/text-channel/?guild_id='+guildId, true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    createTextChannel({ guildId, channelName })
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                guild_id: guildId,
                channelname: channelName
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/text-channel/create.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    deleteTextChannel({channel_id})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                channel_id
            }
            
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/text-channel/delete.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    updateTextChannel({channel_id, channelname})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                channel_id,
                channelname
            }
            
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/text-channel/update.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    // ################################################### MESSAGE #######################################################
    // ###################################################################################################################

    fetchMessages({ channelId, since, until })
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+`/r/message/?channel_id=${channelId}&since=${since?since:''}&until=${until?until:''}`, true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send();
        });
    }

    sendMessage({channelId, replyTo, content})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                channel_id: channelId,
                reply_to: replyTo,
                content
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/message/send.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }

    deleteMessage({ messageId })
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                message_id: messageId
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.apiRoot+'/r/message/delete.php', true);
        
            xhr.onload = () => {
                switch(xhr.status)
                {
                    case 200:
                        resolve(JSON.parse(xhr.response));
                        break;
                    default:
                        // TODO: handle more gracefully errors
                        reject(JSON.parse(xhr.response));
                }
            };
            xhr.send(JSON.stringify(body));
        });
    }
}

const api = new API('../../api', '../../api/public');
