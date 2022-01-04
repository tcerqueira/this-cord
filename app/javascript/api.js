const apiRoot = '../../api';

// ##################################################### AUTH ########################################################
// ###################################################################################################################

function signIn(username, password)
{
    return new Promise((resolve, reject) => {
        const credentials = {
            username,
            password
        }
    
        let xhr = new XMLHttpRequest();
        xhr.open('POST', apiRoot+'/auth/signin.php', true);
    
        xhr.onload = () => {
            switch(xhr.status)
            {
                case 200:
                    resolve(JSON.parse(xhr.response));
                    break;
                default:
                    // TODO: handle more gracefully errors
                    reject(JSON.parse(xhr.response));
            }
        };
        xhr.send(JSON.stringify(credentials));
    });
}

function signUp(username, email, password)
{
    return new Promise((resolve, reject) => {
        const form = {
            username,
            email,
            password
        }
    
        let xhr = new XMLHttpRequest();
        xhr.open('POST', apiRoot+'/auth/signup.php', true);
    
        xhr.onload = () => {
            switch(xhr.status)
            {
                case 200:
                    resolve(JSON.parse(xhr.response));
                    break;
                default:
                    // TODO: handle more gracefully errors
                    reject(JSON.parse(xhr.response));
            }
        };
        xhr.send(JSON.stringify(form));
    });
}