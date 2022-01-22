async function register()
{
    const container = document.querySelector('.register-container');
    const errorMsg = document.getElementById('register-error-message');
    console.log(container);
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
    
    // confirm passwords are identical
    confPassword = document.getElementById('conf-password-input').value;
    if(confPassword !== form.password) {
        errorMsg.innerText = 'Passwords don\'t match.';
        document.getElementById('password-input').parentNode.classList.add('invalid-input');
        document.getElementById('conf-password-input').parentNode.classList.add('invalid-input');
        return;
    }

    try {
        document.getElementById('register-button').disabled = true;
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
