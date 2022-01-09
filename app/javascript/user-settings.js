// const userInfo ={
//     id: 1, 
//     username: 'ze', 
//     email: 'ze@mail.com', 
//     phoneNumber: '88888',
//     color : '#0000fd'
// };
const usernameInput = document.getElementById('myaccount-username');
const emailInput = document.getElementById('myaccount-email');
const phoneNumberInput = document.getElementById('myaccount-phoneNumber');
const changePasswordDiv = document.getElementById('change-password');
changePasswordDiv.style.display == "none";
const oldPasswordObj = document.getElementById('oldPassword');
const newPasswordObj = document.getElementById('newPassword');
const confNewPasswordObj = document.getElementById('confNewPassword');
const passwordValidation = document.getElementById('passwordValidation');
const passwordMatch = document.getElementById('password-match');
var colorPicker;
let defaultColorUser;


//################### Check Password Fields #######################
confNewPasswordObj.onkeyup = checkPasswords =>{
    const newPassword = document.getElementById('newPassword').value;
    const confNewPassword = document.getElementById('confNewPassword').value;
    
    if (confNewPassword === newPassword)
    {
        passwordMatch.innerText = 'Password match';
        passwordMatch.style.fontSize = "0.9rem";
        console.log('fff');
    }
    else
    {
        passwordMatch.innerText = 'Password doesnt match';
        passwordMatch.style.fontSize = "0.9rem";
    }
}
newPasswordObj.onkeyup = validateSize =>{
    const newPassword = document.getElementById('newPassword').value;
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

window.addEventListener("load", startup, false);
window.addEventListener("load", defaultColor, false);

getProfile().then(userInfo => {
    getUserInfo(userInfo)
    });

// console.log('userinfo'+userInfo());

// getUserInfo(userInfo);

//######################## Button clicks ##############################
document.getElementById("editUserButton").onclick = usernameDisable =>{
    usernameInput.disabled = false;
}
document.getElementById("editEmailButton").onclick = emailDisable =>{
    emailInput.disabled = false;
}
document.getElementById("phoneNumberButton").onclick = phoneDisabe =>{
    phoneNumberInput.disabled = false;
}
document.getElementById("changePasswordButton").onclick = passwordButtonClick;

document.getElementById("delete-account").onclick = confirmDelete;

document.getElementById('submitChangesButtonAccount').onclick = confirmUpdateAccount;

document.getElementById('submitNewPassword').onclick = submitPassword;

function submitPassword()
{
    const newPasswor = document.getElementById('newPassword').value;
    const confNewPasswor = document.getElementById('confNewPassword').value;
    console.log('gdjdhf')
    if (confNewPasswor === newPasswor)
    {
        confirmUpdatePassword();
    }
    else
    {
        confNewPasswordObj.innerText = '';
    }
}



function getUserInfo(userInfo)
{
    document.getElementById('about-me').value = userInfo.userDescription;
    defaultColorUser = userInfo.theme_color;
    console.log(defaultColorUser);
    const userProfileInput = document.getElementById('userprofile-username');
    userProfileInput.innerText = userInfo.username;
    
    usernameInput.value = userInfo.username;
    usernameInput.disabled = true;
    
    emailInput.value = userInfo.email;
    emailInput.disabled = true;
    
    const phoneNumberButton = document.getElementById('phoneNumberButton');
    
    if(userInfo.phoneNumber == null){
        phoneNumberButton.innerText = 'Add';
        phoneNumberInput.disabled = true;
    }
    else{
        phoneNumberButton.innerText = 'Edit';
        phoneNumberInput.value = userInfo.phoneNumber;
        phoneNumberInput.disabled = true;
    }

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
        console.log(response);
        return response;
    }
    catch(err)
    {
        console.log(err);
    }
}


async function confirmDelete()
{
    if(confirm('Do you realy want to delete all your data?')==true)
    {
        try {
            response = await api.deleteUser('');
            console.log(response);
            return response;
        }
        catch(err)
        {
            console.log(err);
        }
    }  
}


async function confirmUpdateAccount()
{
    if(confirm('Do you want to update your data?')==true)
    {
        try {
            const username = document.getElementById('myaccount-username').value;
            const email = document.getElementById('myaccount-email').value;
            response = await api.updateUser({username, email, themeColor, userDescription});
            console.log(response)
            return response;
            
        }
        catch(err)
        {
            console.log(err);
        }
    }  
}

async function confirmUpdatePassword()
{
    if(confirm('Do you want to update your password?')==true)
    {
        try {
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('confNewPassword').value;
            response = await api.changePassword({oldPassword, newPassword});
            console.log(response)
            return response;
            
        }
        catch(err)
        {
            console.log(err);
        }
    }  
}

// ################################# Functions colorPicker ####################################
function startup() 
{
  colorPicker = document.querySelector("#user-color");
  colorPicker.value = '#000000';
  console.log(defaultColorUser);
  colorPicker.addEventListener("input", updateFirst, false);
  colorPicker.addEventListener("change", updateAll, false);
  colorPicker.select();
  }

function defaultColor(event)
{
  var userColor = document.querySelector("#user-bar-color");
  var userColorIcon = document.querySelector("#user-icon");
  if (userColor) {
    userColor.style.backgroundColor = '#000000';
    userColorIcon.style.backgroundColor = '#000000';
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
  }
}

function updateAll(event)
{
  var userColor = document.querySelector("#user-bar-color");
  var userColorIcon = document.querySelector("#user-icon");
  userColor.style.backgroundColor = event.target.value;
  userColorIcon.style.backgroundColor = event.target.value;
}
