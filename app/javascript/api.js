class API
{
    constructor(apiRoot)
    {
        this.apiRoot = apiRoot;
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
    // #################################################### GUILD ########################################################
    // ###################################################################################################################

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

    fetchGuildMembers({id})
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

    updateGuild({guildname, initials, openInviteKey, themeColor})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
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

    changeMemberRole({guildId, memberId, guildRole})
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

    createTextChannel({guildId, textChannelName})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                guild_id: guildId,
                channel_name: textChannelName
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
            xhr.open('GET', this.apiRoot+'/r/text-channel/delete.php', true);
        
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

    updateTextChannel({channel_id})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                channel_id,
                channelname
            }
            
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.apiRoot+'/r/text-channel/delete.php', true);
        
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

    sendMessage({channelId, authorId, replyTo, content})
    {
        return new Promise((resolve, reject) => {
            
            const body = {
                channel_id: channelId,
                author_id: authorId,
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
}

const api = new API('../../api');

// (async function test()
// {
//     try {
//         const { id } = await api.signIn({
//             username: 'titi',
//             password: 'titi'
//         });
//         console.log(id);
//         const user = await api.fetchUser({id});
//         console.log(user);
//     }
//     catch (err) {
//         console.log(err);
//     }
//     finally {
//         await api.signOut();
//     }
// })();