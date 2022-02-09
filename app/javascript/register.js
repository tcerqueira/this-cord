async function register()
{
    document.getElementById('register-button').disabled = true;
    const container = document.querySelector('.register-container');
    const errorMsg = document.getElementById('register-error-message');
    console.log('register');
    try {
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
    
        const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        let match = form.email.match(emailRegEx);
        if(!match) {
            document.getElementById('email-input').classList.add('invalid-input');
            errorMsg.innerText = 'Invalid email.';
            return;
        }
    
        const usernameRegEx = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        match = form.username.match(usernameRegEx);
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

        const { id } = await api.signUp(form);
        window.location.replace('login.php');
    }
    catch (err) {
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
