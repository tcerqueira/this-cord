async function login()
{
    try {
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        response = await signIn(username, password);
        window.location.replace("home.php");
        console.log(response);
    }
    catch(err)
    {
        console.log(err);
        document.getElementById('password-input').value = '';
    }
};

document.getElementById('login-form').addEventListener('submit', evt => {
    evt.preventDefault();

    login();
})
