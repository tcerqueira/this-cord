//id para o delete password
//update de coisas separadas
const changePasswordDiv = document.getElementById('change-password');
changePasswordDiv.style.display == "none";
const passwordMatch = document.getElementById('password-match');
var colorPicker;
let defaultColorUser;
// let defaultColorUser = '#ffffff';
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
            passwordValidation.style.color = "red";
            passwordValidation.style.fontSize = "0.9rem";
            break;
        
        case (newPassword.length > 4 && newPassword.length <=6):
            passwordValidation.innerText = 'medium password';
            passwordValidation.style.color = "yellow";
            break;
        
        default:
            passwordValidation.innerText = 'strong password';
            passwordValidation.style.color = "green";
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
        document.getElementById('text-input-container-color-username').style.background = "transparent";
        document.getElementById('text-input-container-color-username').style.border = "transparent";
    }
    else
    {
        document.getElementById('myaccount-username').disabled = false;
        document.getElementById('text-input-container-color-username').style.background = "#202225";
        document.getElementById('text-input-container-color-username').style.border = "1px solid #202225";
    }
    
}

document.getElementById("editEmailButton").onclick = emailDisable =>{
    if(document.getElementById('myaccount-email').disabled == false)
    {
        document.getElementById('myaccount-email').disabled = true;
        document.getElementById('text-input-container-color-email').style.background = "transparent";
        document.getElementById('text-input-container-color-email').style.border = "transparent";
    }
    else
    {
        document.getElementById('myaccount-email').disabled = false;
        document.getElementById('text-input-container-color-email').style.background = "#202225";
        document.getElementById('text-input-container-color-email').style.border = "1px solid #202225";
    }
    
}
// document.getElementById("phoneNumberButton").onclick = phoneDisable =>{
//     phoneNumberInput.disabled = false;
// }
document.getElementById("changePasswordButton").onclick = passwordButtonClick;

document.getElementById("delete-account").onclick = confirmDelete;

document.getElementById('submitChangesButtonAccount').onclick = confirmUpdateAccount;

document.getElementById('submitChangesButtonUser').onclick = confirmUpdateUser;

document.getElementById('submitNewPassword').onclick = submitPassword;

function submitPassword()
{
    const newPasswordValue = document.getElementById('newPassword').value;
    const confNewPasswordValue = document.getElementById('confNewPassword').value;
    const oldPasswordValue = document.getElementById('oldPassword').value;
    
    document.querySelectorAll('.user-password-input').forEach(input=>{
        input.classList.remove('invalid-input');
    });

    if ((confNewPasswordValue === newPasswordValue) && newPasswordValue != null)
    {
        confirmUpdatePassword();
        console.log('dddd');
        document.querySelectorAll('.new-user-password-input').forEach(input=>{
            input.classList.remove('invalid-input');

        });
    }
    else
    {
        document.getElementById('confNewPassword').value = '';
        console.log('erro');
        document.querySelectorAll('.new-user-password-input').forEach(input=>{
            input.classList.add('invalid-input');

        });
    }
}



function getUserInfo(userInfo)
{
    const usernameInput = document.getElementById('myaccount-username');
    const emailInput = document.getElementById('myaccount-email');
    
    if (userInfo.userDescription == undefined)
    { 
        document.getElementById('about-me').value = '';
    }
    else
    {
        document.getElementById('about-me').value = userInfo.userDescription;
    }
    themeColor = userInfo.theme_color;
    console.log('color user'+ defaultColorUser);
    const userProfileInput = document.getElementById('userprofile-username');
    userProfileInput.innerText = userInfo.username;
    
    usernameInput.value = userInfo.username;
    usernameInput.disabled = true;
    
    emailInput.value = userInfo.email;
    emailInput.disabled = true;
    
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
        response = await api.fetchProfile();
        return response;
    }
    catch(err)
    {
        console.log(err);
    }
}


function confirmDelete()
{
    document.getElementById('confirm-password-delete-container').style.display = 'flex';
    const password = document.getElementById('confirm-password-delete').value;
    document.getElementById('confirm-delete').onclick = () =>{
        
        openModal('confirmation-modal');  
        renderConfirmationModal('Do you want to remove permanentely your account?', async () =>{
            try {
                response = await api.deleteUser({password});
                console.log(response);
                document.getElementById('confirm-password-delete-container').style.display = 'none';
                closeModal();
                return response;
            }
            catch(err)
            {
                console.log(err);
                closeModal();
                document.getElementById('confirm-password-delete').value = ' ';
            }
            
        });
    }  
}


function confirmUpdateAccount()
{
    openModal('confirmation-modal');
    renderConfirmationModal('Do you want to submit changes?', async () =>{
        try {
            document.getElementById('submitChangesButtonAccount').disabled = true;
            const username = document.getElementById('myaccount-username').value;
            const email = document.getElementById('myaccount-email').value;
            const userDescription = document.getElementById('about-me').value;
            response = await api.updateUser({username, email, themeColor, userDescription});
            closeModal();
            console.log(response);

            return response;
            
        }
        catch(err)
        {
            console.log(err);
        }
        document.getElementById('submitChangesButtonAccount').disabled = false;
        closeModal();
    } );  
}

function confirmUpdatePassword()
{
    openModal('confirmation-modal');
    renderConfirmationModal('Do you want to submit new password?', async () =>{
        try {
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('confNewPassword').value;
            response = await api.changePassword({oldPassword, newPassword});
            document.getElementById('oldPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confNewPassword').value = '';
            closeModal();
            return response;
            
        }
        catch(err)
        {
            console.log(err);
            document.getElementById('oldPassword').value = '';
            document.querySelectorAll('.user-password-input').forEach(input=>{
                input.classList.add('invalid-input');
            });
            closeModal();
        }
    });  
}

function confirmUpdateUser()
{
    openModal('confirmation-modal');
    renderConfirmationModal('Do you want to submit changes?', async () =>{
        try {
            const username = document.getElementById('myaccount-username').value;
            const email = document.getElementById('myaccount-email').value;
            const userDescription = document.getElementById('about-me').value;
            response = await api.updateUser({username, email, themeColor, userDescription});
            console.log(response)
            return response;
            
        }
        catch(err)
        {
            console.log(err);
        }
        closeModal();
    });  
}

// ################################# Functions colorPicker ####################################
function startupColor() 
{
  colorPicker = document.querySelector("#user-color");
  console.log('default picker'+defaultColorUser);
  colorPicker.value = themeColor;
  colorPicker.addEventListener("input", updateFirst, false);
  colorPicker.addEventListener("change", updateFirst, false);
  colorPicker.select();
  }

function defaultColor(event)
{
  var userColor = document.querySelector("#user-bar-color");
  var userColorIcon = document.querySelector("#user-icon");
  if (userColor) {
    userColor.style.backgroundColor = themeColor;
    userColorIcon.style.backgroundColor = themeColor;
  }
}

function updateFirst(event) 
{
  var userColor = document.querySelector("#user-bar-color");
  var userColorIcon = document.querySelector("#user-icon");
  
  if (userColor) 
  {
    userColor.style.backgroundColor = event.target.value;
    userColorIcon.style.backgroundColor = event.target.value;
    themeColor = event.target.value;
  }
}


