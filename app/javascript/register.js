async function register()
{
    document.getElementById('register-button').disabled = true;
    const container = document.querySelector('.register-container');
    const errorMsg = document.getElementById('register-error-message');
    // clear all red borders
    container.querySelectorAll('.text-input-container').forEach(input => {
        input.classList.remove('invalid-input');
    })

    const form = {
        email: document.getElementById('email-input').value,
        username: document.getElementById('username-input').value,
        password: document.getElementById('password-input').value
    }
    // red borders for all inputs
    var foundErrors = false;
    container.querySelectorAll('.text-input-container').forEach(input => {
        if(!input.children[0].value) {
            input.classList.add('invalid-input');
            foundErrors = true;
        }
    })
    if(foundErrors) {
        errorMsg.innerText = 'Complete all fields.';
        return;
    }

    const usernameRegEx = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,16}[a-zA-Z0-9]$/;
    const match = form.username.match(usernameRegEx);
    if(!match) {
        document.getElementById('username-input').classList.add('invalid-input');
        errorMsg.innerText = 'Invalid username.';
        return;
    }
    
    // confirm passwords are identical
    confPassword = document.getElementById('conf-password-input').value;
    if(confPassword !== form.password) {
        errorMsg.innerText = 'Passwords don\'t match.';
        document.getElementById('password-input').parentNode.classList.add('invalid-input');
        document.getElementById('conf-password-input').parentNode.classList.add('invalid-input');
        return;
    }

    try {
        const { id } = await api.signUp(form);
        window.location.replace('login.php');
    }
    catch(err) {
        console.log(err);
        errorMsg.innerText = err.error;
    }
    finally {
        document.getElementById('register-button').disabled = false;
    }
};

document.getElementById('register-form').addEventListener('submit', evt => {
    evt.preventDefault();
    register();
})
