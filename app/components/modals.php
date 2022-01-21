<div class="modal-pane">
    <div id="user-modal" class="modal-container user-modal">
        <header>
            <div id="theme-user-modal" class="theme-user-panel"></div>
            <div class="username-container">
                <span id="username-user-modal">User</span>
                <button id="add-remove-friend-btn" class="button bg-green">Add</button>
            </div>
        </header>
        <hr>
        <main>
            <h3>About me</h3>
            <p id="about-user-modal"></p>
            <h3>Note</h3>
            <p id="note-user-modal"></p>
            <form id="sendMessageModalForm" class="text-input-container user-text-input">
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
            <img id="guildImagePreview" src="" alt="guild-img-preview">
            <form id="guildImageForm">
                <!-- <label for="guild-img-input">Image</label> -->
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
            <div id="createGuildMessage" class="error-message"></div>
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
                <input class="button bg-blue" type="submit" value="Create">
            </form>
        </main>
    </div>
    <div id="guild-invite-modal" class="modal-container guild-invite-modal">
        <h1>Invite list <button id="copyInviteButton" class="button">Copy invite link</button></h1>

        <ul id="toInviteList">

        </ul>
        <li id="toInviteItemTemplate" class="to-invite-item" style="display: none;">
            <span>username</span>
            <img src="../public/cancel-nofill-svgrepo-com.svg" alt="remove-invite-icon">
        </li>
        <header>
            <form id="searchGuildInviteForm" class="search-input-container modal-search" autocomplete="off">
                <input type="text" id="inviteModalInput" placeholder="Search">
                <img src="../public/search-svgrepo-com.svg" alt="search-icon">
            </form>
        </header>
        <main>
            <ul id="searchModalList">

            </ul>
            <li id="searchItemTemplate" class="search-modal-item rounded-container" style="display: none;">
                <div class="icon-card icon-size-xsmall"></div>
                <span>
                    username
                    <span id="shortIdSpan"> #123456</span>
                </span>
                <div class="invite-to-guild-icon bg-green">
                    <img src="../public/add-plus-svgrepo-com.svg" alt="add-to-invite-list-icon">
                </div>
            </li>
            <hr>
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
</div>