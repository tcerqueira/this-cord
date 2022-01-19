<div class="messages-container">
    <!-- Empty element to reference to go back to bottom messages -->
    <div id="back-to-bottom"></div>
    <ol id="messages-list">
        <!-- <li id="message_2" class="message">
            <a href="#message_123">
                <div class="reply-preview"><span class="username">@tanso</span>: hello bro</div>
            </a>
            <h3 class="message-author">
                <div class="author-avatar">
                    lou
                </div>
                <span>
                    <span class="username">lou</span>
                    <span class="message-date">Agora</span>
                </span>
            </h3>
            Hello mockmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            <div class="message-options">
                <a href="#"><img src="../public/reply-svgrepo-com.svg" alt="reply-icon"></a>
                <a href="#"><img src="../public/trash-svgrepo-com.svg" alt="remove-icon"></a>
            </div>
        </li> -->
        <!-- FETCHED CLIENT-SIDE -->
    </ol>
</div>
<div id="reply-container" class="reply-container">
    <span>Replying to <span id="replyingToUsername" class="username"></span></span>
    <img id="cancel-reply-icon" src="../public/cancel-svgrepo-com.svg" alt="cancel-icon">
</div>
<form id="sendMessageForm" class="input-container" autocomplete="off">
    <div class="text-input-container message-box">
        <span>></span>
        <input type="text" name="message" id="message-input">
        <button id="sendMessageButton" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path></svg>
        </button>
    </div>
</form>