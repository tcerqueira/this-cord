const userInfo ={
    id: 1, 
    username: 'ze', 
    email: 'ze@mail.com', 
    phoneNumber: '88888'
};

getUserInfo(userInfo);

function getUserInfo(userInfo)
{
    const usernameSpan = document.getElementById('myaccount-username');
    usernameSpan.innerText = userInfo.username;
    const emailSpan = document.getElementById('myaccount-email');
    emailSpan.innerText = userInfo.email;
    const phoneNumberSpan = document.getElementById('myaccount-phoneNumber');
    const phoneNumberButton = document.getElementById('phoneNumberButton');
    
    if(userInfo.phoneNumber == null){
        phoneNumberButton.innerText = 'Add';
    }
    else{
        phoneNumberButton.innerText = 'Edit';
        phoneNumberSpan.innerText = userInfo.phoneNumber;
    }

}