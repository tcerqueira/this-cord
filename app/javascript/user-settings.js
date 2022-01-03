const userInfo ={
    id: 1, 
    username: 'ze', 
    email: 'ze@mail.com', 
    phoneNumber: '88888',
    color : '#0000fd'
};
const usernameInput = document.getElementById('myaccount-username');
const emailInput = document.getElementById('myaccount-email');
const phoneNumberInput = document.getElementById('myaccount-phoneNumber');
const changePasswordDiv = document.getElementById('change-password');
var colorPicker;
const defaultColorUser = userInfo.color;

window.addEventListener("load", startup, false);
window.addEventListener("load", defaultColor, false);
// getProfile().then(userInfo => {
//     getUserInfo(userInfo)
// });
getUserInfo(userInfo);

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
    
function passwordButtonClick()
{    
    if(changePasswordDiv.style.display == "none")
        {
            changePasswordDiv.style.display = "flex";
        }
    else
    {
        changePasswordDiv.style.display = "none";
    }
}

document.getElementById("delete-account").onclick = confirmDelete;



function getUserInfo(userInfo)
{
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

async function getProfile()
{
    try {
        response = await fetchProfile('ef84b2a7-7fb2-dfb7-5ae8-fae79f706a0b');
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
            response = await deleteUser('ef84b2a7-7fb2-dfb7-5ae8-fae79f706a0b');
            console.log(response);
            return response;
        }
        catch(err)
        {
            console.log(err);
        }
    }  
}

async function confirmUpdate()
{
    if(confirm('Do you want to update your data?')==true)
    {
        try {
            
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
  colorPicker.value = defaultColorUser;
  colorPicker.addEventListener("input", updateFirst, false);
  colorPicker.addEventListener("change", updateAll, false);
  colorPicker.select();
  }

function defaultColor(event)
{
  var userColor = document.querySelector("#user-bar-color");
  var userColorIcon = document.querySelector("#user-icon");
  if (userColor) {
    userColor.style.backgroundColor = defaultColorUser;
    userColorIcon.style.backgroundColor = defaultColorUser;
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
