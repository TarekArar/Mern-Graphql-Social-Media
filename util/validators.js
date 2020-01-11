module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    errors = {}
    if (username.trim() === '') {
        errors.username = "username must not be empty";
    }
    if (email.trim() === '') {
        errors.email = "email must not be empty";
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address';
        }
    }
    if (password.length < 6) errors.password = 'Password must at least have 6 characters';
    else if (password != confirmPassword) errors.password = "Password didn't match";

    return {
        errors, 
        valid : Object.keys(errors).length < 1 
    }
}

module.exports.validateLoginInput = (username, password) => {
    errors = {}
    if (username.trim() === '') {
        errors.username = "Username must not be empty";
    }
    if (password === '') {
        errors.password = "Password must not be empty";
    }
    return {
        errors, 
        valid : Object.keys(errors).length < 1 
    }
}