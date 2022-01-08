async function login()
{
    document.querySelectorAll('.login-container .text-input-container').forEach(input => {
        input.classList.remove('invalid-input');
    })

    try {
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        document.getElementById('login-button').disabled = true;
        response = await api.signIn({username, password});
        window.location.replace("home.php");
    }
    catch(err)
    {
        console.log(err);
        document.getElementById('login-error-message').innerText = err.error;
        document.getElementById('password-input').value = '';
        document.querySelectorAll('.login-container .text-input-container').forEach(input => {
            input.classList.add('invalid-input');
        })
    }
    finally
    {
        document.getElementById('login-button').disabled = false;
    }
};

document.getElementById('login-form').addEventListener('submit', evt => {
    evt.preventDefault();

    login();
})
