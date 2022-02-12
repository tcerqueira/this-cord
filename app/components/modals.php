<div class="modal-pane">
    <div id="user-modal" class="modal-container user-modal">
        <header>
            <div id="theme-user-modal" class="theme-user-panel"></div>
            <div class="username-container">
                <div>
                    <div class="status-wrapper status-size-xbig">
                        <div class="icon-card icon-size-xbig">
                            <img src="https://c.tenor.com/gQV5VzHLWQIAAAAM/among-us-sus.gif" alt="">
                        </div>
                    </div>
                    <div class="user-info one-liner">
                        <span id="username-user-modal">User</span>
                        <span id="shortIdUserModal">#123</span>
                    </div>
                </div>
                <button id="add-remove-friend-btn" class="button bg-green">Add</button>
            </div>
        </header>
        <hr>
        <main>
            <h3>About me</h3>
            <p id="about-user-modal"></p>
            <form id="userNoteForm" autocomplete="off">
                <label for="note-user-modal">Note</label>
                <input id="note-user-modal" type="text" placeholder="Enter note">
                <a id="unfocusTag" href="#" aria-hidden="true"></a>
            </form>
            <form id="sendMessageModalForm" class="text-input-container user-text-input" autocomplete="off">
                <input type="text" id="direct-message-input" placeholder="Message directly">
            </form>
        </main>
    </div>
    <div id="create-guild-modal" class="modal-container create-guild-modal">
        <header class="top-header-modal">
            <div id="createGuildBanner" class="background-banner"></div>
            <h1>Create your guild</h1>
        </header>
        <main class="create-guild-main">
            <div id="iconCardPreview" class="icon-card icon-size-xbig">
                <img id="guildImagePreview" src="" alt="" accept="image/*">
            </div>
            <form id="guildImageForm">
                <label for="guild-img-input">Avatar</label>
                <input type="file" name="guild_img" id="guild-img-input">
            </form>
            <form id="createGuildForm" autocomplete="off">
                <div class="naming-container">
                    <div class="guildname-container">
                        <label for="guildnameInput">Guild name</label>
                        <div class="text-input-container">
                            <input type="text" name="guildname" id="guildnameInput" placeholder="Ex: gamers forever">
                        </div>
                    </div>
                    <div class="initials-container">
                        <label for="initialsInput">Initials</label>
                        <div class="text-input-container">
                            <input type="text" name="initials" id="initialsInput" placeholder="Ex: GFV">
                        </div>
                    </div>
                </div>
                <label for="inviteKeyInput">Open invite key (optional)</label>
                <div class="text-input-container">
                    <input type="text" name="open_invite_key" id="inviteKeyInput" placeholder="Ex: every1_welcome">
                </div>
                <label for="guildThemePicker">Pick a theme color</label>
                <input type="color" name="theme_color" id="guildThemePicker" value="#7289da">
            </form>
            <div id="createGuildError" class="error-message one-liner"></div>
            <button id="createGuildSubmitBtn" class="button bg-blue">Create</button>
        </main>
    </div>
    <div id="create-textchannel-modal" class="modal-container create-textchannel-modal">
        <header>
            <h1>Create Text Channel</h1>
        </header>
        <main>
            <form id="createChannelForm" autocomplete="off">
                <label for="channelNameInput">Channel name</label>
                <div class="text-input-container">
                    <input type="text" name="channelname" id="channelNameInput" placeholder="Channel name">
                </div>
                <div id="createChannelError" class="error-message one-liner"></div>
                <input class="button bg-blue" type="submit" value="Create">
            </form>
        </main>
    </div>
    <div id="guild-invite-modal" class="modal-container guild-invite-modal">
        <h1>Invite list <button id="copyInviteButton" class="button">Copy invite link</button></h1>

        <ul id="toInviteList">

        </ul>
        <template id="toInviteItemTemplate">
            <li class="to-invite-item">
                <span>username</span>
                <img src="../public/cancel-nofill-svgrepo-com.svg" alt="remove-invite-icon">
            </li>
        </template>
        <header>
            <form id="searchGuildInviteForm" class="search-input-container modal-search" autocomplete="off">
                <input type="text" id="inviteModalInput" placeholder="Search">
                <img src="../public/search-svgrepo-com.svg" alt="search-icon">
            </form>
        </header>
        <main>
            <ul id="searchModalList">

            </ul>
            <template id="searchItemTemplate">
                <li class="search-modal-item rounded-container">
                    <div class="icon-card icon-size-xsmall">
                        <img src="" alt="">
                    </div>
                    <span>
                        username
                        <span id="shortIdSpan"> #123456</span>
                    </span>
                    <div class="invite-to-guild-icon bg-green">
                        <img src="../public/add-plus-svgrepo-com.svg" alt="add-to-invite-list-icon">
                    </div>
                </li>
            </template>
            <hr>
            <div id="guildInviteError" class="error-message one-liner"></div>
            <button id="inviteModalBtn" class="button bg-green">Invite</button>
        </main>
    </div>
    <div id="confirmation-modal" class="modal-container confirmation-modal">
        <header>
            <h1 id="confirmation-message">Confirmation</h1>
        </header>
        <main>
            <!-- <p id="confirmation-message"></p> -->
            <div class="confirm-btn-container">
                <button id="confirm-btn-modal" class="button bg-green">Confirm</button>
                <button id="cancel-btn-modal" class="button bg-light-grey">Cancel</button>
            </div>
        </main>
    </div>
    <div id="error-modal" class="modal-container error-modal">
        <header>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>
            <h1>Error</h1>
        </header>
        <main>
            <p id="errorModalMessage">Error message here</p>
            <button id="errorModalBtn" class="button">OK</button>
        </main>
    </div>
</div>