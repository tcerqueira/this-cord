async function login()
{
    try {
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        response = await signIn(username, password);
        console.log(response);
    }
    catch(err)
    {
        console.log(err);
    }
};

document.getElementById('login-form').addEventListener('submit', evt => {
    evt.preventDefault();
    
    login();
    document.getElementById('password-input').value = '';
})
