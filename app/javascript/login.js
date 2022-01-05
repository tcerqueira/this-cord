async function login()
{
    try {
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        response = await api.signIn({username, password});
        window.location.replace("home.php");
    }
    catch(err)
    {
        console.log(err);
        const errorMessage = document.getElementById('login-error-message');
        errorMessage.innerText = err.error;
        document.getElementById('password-input').value = '';
    }
};

document.getElementById('login-form').addEventListener('submit', evt => {
    evt.preventDefault();

    login();
})
