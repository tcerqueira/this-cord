const changePasswordDiv = document.getElementById('change-password');
changePasswordDiv.style.display == "none";
const passwordMatch = document.getElementById('password-match');
var colorPicker;
let themeColor;



//################### Check Password Fields #######################
document.getElementById('confNewPassword').onkeyup = checkPasswords =>{
    const newPassword = document.getElementById('newPassword').value;
    const confNewPassword = document.getElementById('confNewPassword').value;

    if (confNewPassword === newPassword)
    {
        passwordMatch.innerText = 'Password match';
        passwordMatch.style.fontSize = "0.9rem";
    }
    else
    {
        passwordMatch.innerText = 'Password doesnt match';
        passwordMatch.style.fontSize = "0.9rem";
    }
}


document.getElementById('newPassword').onkeyup = validateSize =>{
    const newPassword = document.getElementById('newPassword').value;
    const passwordValidation = document.getElementById('passwordValidation');

    switch (true)
    {
        case (newPassword.length <= 4):
            passwordValidation.innerText = 'password to weak';
            passwordValidation.style.color = "var(--color-red)";
            passwordValidation.style.fontSize = "0.9rem";
            break;
        
        case (newPassword.length > 4 && newPassword.length <=6):
            passwordValidation.innerText = 'medium password';
            passwordValidation.style.color = "var(--color-yellow)";
            break;
        
        default:
            passwordValidation.innerText = 'strong password';
            passwordValidation.style.color = "var(--color-green)";
    }
}


getProfile().then(userInfo => {
    getUserInfo(userInfo);
    startupColor();
    defaultColor();
});


//######################## Button clicks ##############################
document.getElementById("editUserButton").onclick = usernameDisable =>{
    if(document.getElementById('myaccount-username').disabled == false)
    {
        document.getElementById('myaccount-username').disabled = true;
        document.getElementById('text-input-container-color-username').classList.remove("inputEnable");
    }
    else
    {
        document.getElementById('myaccount-username').disabled = false;
        document.getElementById('text-input-container-color-username').classList.add("inputEnable");
    }
}


document.getElementById("editEmailButton").onclick = emailDisable =>{
    if(document.getElementById('myaccount-email').disabled == false)
    {
        document.getElementById('myaccount-email').disabled = true;
        document.getElementById('text-input-container-color-email').classList.remove("inputEnable");
        // document.getElementById('text-input-container-color-email').style.border = "transparent";
    }
    else
    {
        document.getElementById('myaccount-email').disabled = false;
        document.getElementById('text-input-container-color-email').classList.add("inputEnable");
    }
}


document.getElementById("changePasswordButton").onclick = passwordButtonClick;

document.getElementById("delete-account").onclick = confirmDelete;

document.getElementById('submitChangesButtonAccount').onclick = confirmUpdateAccount;

document.getElementById('submitChangesButtonUser').onclick = confirmUpdateUser;

document.getElementById('submitNewPassword').onclick = submitPassword;


function submitPassword()
{
    const newPasswordValue = document.getElementById('newPassword').value;
    const confNewPasswordValue = document.getElementById('confNewPassword').value;
    
    document.querySelectorAll('.user-password-input').forEach(input=>{
        input.classList.remove('invalid-input');
    });

    if ((confNewPasswordValue === newPasswordValue) && newPasswordValue != null)
    {
        confirmUpdatePassword();
        document.querySelectorAll('.new-user-password-input').forEach(input=>{
            input.classList.remove('invalid-input');

        });
    }
    else
    {
        document.getElementById('confNewPassword').value = '';
        document.querySelectorAll('.new-user-password-input').forEach(input=>{
            input.classList.add('invalid-input');

        });
    }
}


document.getElementById('usersettings-img-input').onchange = () => {
    const userAvatarSettings = document.getElementById('usersettings-img-input').files[0];
    document.getElementById('img-user-settings').src = userAvatarSettings ? URL.createObjectURL(userAvatarSettings) : `${api.imgUrl}/user_default.gif`;
}


//##################### Chose Theme ##########################
document.getElementById('dark-theme').onchange = () => {
    if (document.getElementById('dark-theme').checked)
    document.cookie = "theme=" + 'dark';
    location.reload();
}
 

document.getElementById('light-theme').onchange = () => {
    if (document.getElementById('light-theme').checked)
    document.cookie = "theme=" + 'light';
    location.reload();
}

document.getElementById('purple-theme').onchange = () => {
    if (document.getElementById('purple-theme').checked)
    document.cookie = "theme=" + 'purple';
    location.reload();
}

document.getElementById('christmas-theme').onchange = () => {
    if (document.getElementById('christmas-theme').checked)
    document.cookie = "theme=" + 'christmas';
    location.reload();
}

document.getElementById('green-theme').onchange = () => {
    if (document.getElementById('green-theme').checked)
    document.cookie = "theme=" + 'green';
    location.reload();
}

document.getElementById('ugly-theme').onchange = () => {
    if (document.getElementById('ugly-theme').checked)
    document.cookie = "theme=" + 'ugly';
    location.reload();
}


if (getCookie( "theme") == "light")
    document.getElementById('light-theme').checked = true;

if (getCookie( "theme") == "purple")
    document.getElementById('purple-theme').checked = true;

if (getCookie( "theme") == "dark")
    document.getElementById('dark-theme').checked = true;
    
if (getCookie( "theme") == "christmas")
    document.getElementById('christmas-theme').checked = true;

if (getCookie( "theme") == "green")
    document.getElementById('green-theme').checked = true;

if (getCookie( "theme") == "ugly")
    document.getElementById('ugly-theme').checked = true;

function getUserInfo(userInfo)
{
    const usernameInput = document.getElementById('myaccount-username');
    const emailInput = document.getElementById('myaccount-email');
    
    if (userInfo.user_description == undefined)
    { 
        document.getElementById('about-me').value = '';
    }
    else
    {
        document.getElementById('about-me').value = userInfo.user_description;
    }
    themeColor = userInfo.theme_color;
    const userProfileInput = document.getElementById('userprofile-username');
    userProfileInput.innerText = userInfo.username;
    
    usernameInput.value = userInfo.username;
    usernameInput.disabled = true;
    
    emailInput.value = userInfo.email;
    emailInput.disabled = true;

    document.getElementById('img-user-settings').src = `${api.imgUrl}/${userInfo.img_name}`;

}


function passwordButtonClick()
{    
    if(changePasswordDiv.style.display == "flex")
    {
        changePasswordDiv.style.display = "none";
    }
    else
    {
        changePasswordDiv.style.display = "flex";
    }
}


async function getProfile()
{
    try {
        const response = await api.fetchProfile();
        return response;
    }
    catch(err)
    {
        console.log(err);
        openErrorModal(err.error, ()=>{
            closeModal()
        });
    }
}


function confirmDelete()
{
    document.getElementById('confirm-password-delete-container').style.display = 'flex';
    
    document.getElementById('confirm-delete').onclick = () =>{
        const password = document.getElementById('confirm-password-delete').value; 
        openConfirmationModal('Do you want to remove permanentely your account?', async () =>{
            try {
                const response = await api.deleteUser({password});
                document.getElementById('confirm-password-delete-container').style.display = 'none';
                closeModal();
            }
            catch(err)
            {
                console.log(err);
                openErrorModal(err.error, ()=>{
                    closeModal()
                });
                document.getElementById('confirm-password-delete').value = '';
            }
        });
    }  
}


function confirmUpdateAccount()
{
    openConfirmationModal('Do you want to submit changes?', async () =>{
        try {
            document.getElementById('text-input-container-color-email').classList.remove('invalid-input');
            document.getElementById('text-input-container-color-username').classList.remove('invalid-input');
            document.getElementById('UserSettingsError').innerText = '';
            document.getElementById('submitChangesButtonAccount').disabled = true;
            const username = document.getElementById('myaccount-username').value;
            const email = document.getElementById('myaccount-email').value;
            let userDescription = document.getElementById('about-me').value;
            const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            
            let match = email.match(emailRegEx);
            if(!match) {
                document.getElementById('text-input-container-color-email').classList.add('invalid-input');
                document.getElementById('UserSettingsError').innerText = 'Invalid email.';
                return;
            }
    
            const usernameRegEx = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
            match = username.match(usernameRegEx);
            if(!match) {
                document.getElementById('text-input-container-color-username').classList.add('invalid-input');
                document.getElementById('UserSettingsError').innerText = 'Invalid username.';
                return;
            }
           
            await api.updateUser({username, email, themeColor, userDescription});

            if(document.getElementById('usersettings-img-input').files[0])
            {
                await api.updateUserAvatar({
                avatar: document.getElementById('usersettings-img-input').files[0]
                });
            }
            closeModal();
        }
        catch(err)
        {
            console.log(err);
            openErrorModal(err.error, () => {
                closeModal();
            });
        }
        finally
        {
            document.getElementById('submitChangesButtonAccount').disabled = false;
        }
        
    } );  
}


function confirmUpdatePassword()
{
    openConfirmationModal('Do you want to submit new password?', async () =>{
        try {
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('confNewPassword').value;
            response = await api.changePassword({oldPassword, newPassword});
            document.getElementById('oldPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confNewPassword').value = '';
            closeModal();          
        }
        catch(err)
        {
            console.log(err);
            openErrorModal(err.error, ()=>{
                closeModal()
            });
            document.getElementById('oldPassword').value = '';
            document.querySelectorAll('.user-password-input').forEach(input=>{
                input.classList.add('invalid-input');
            });
        }
        finally
        {
            changePasswordDiv.style.display == "none";
        }
    });  
}


function confirmUpdateUser()
{
    openConfirmationModal('Do you want to submit changes?', async () =>{
        try {
            const username = document.getElementById('myaccount-username').value;
            const email = document.getElementById('myaccount-email').value;
            let userDescription = document.getElementById('about-me').value;
    
            response = await api.updateUser({username, email, themeColor, userDescription});
            
            if(document.getElementById('usersettings-img-input').files[0])
            {
                await api.updateUserAvatar({
                avatar: document.getElementById('usersettings-img-input').files[0]
                });
            }
            closeModal();
        }
        catch(err)
        {
            console.log(err);
            openErrorModal(err.error, ()=>{
                closeModal()
            });
        }
    });  
}


// ################################# Functions colorPicker ####################################
function startupColor() 
{
  colorPicker = document.querySelector("#user-color");
  colorPicker.value = themeColor;
  colorPicker.addEventListener("input", updateFirst, false);
  colorPicker.addEventListener("change", updateFirst, false);
  colorPicker.select();
  }

function defaultColor(event)
{
  var userColor = document.querySelector("#user-bar-color");
  var userColorIcon = document.querySelector("#img-user-settings");
  if (userColor) {
    userColor.style.backgroundColor = themeColor;
    userColorIcon.style.backgroundColor = themeColor;
  }
}

function updateFirst(event) 
{
  var userColor = document.querySelector("#user-bar-color");
  var userColorIcon = document.querySelector("#img-user-settings");
  
  if (userColor) 
  {
    userColor.style.backgroundColor = event.target.value;
    userColorIcon.style.backgroundColor = event.target.value;
    themeColor = event.target.value;
  }
}

//######################### read cookie ##########################
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }