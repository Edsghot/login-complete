import toast from 'react-hot-toast'


/**validando el login de la pagina username*/

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors;
}
/**Validando passowrd */
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);

    return errors;
}
/**Validando reset password */
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);
    if (values.password !== values.confirmPassword) {
        errors.exist = toast.error("password not match...!")
    }
    return errors;
}

/** validando el formulario de registro*/

export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::

/** validate password */
function passwordVerify(errors = {}, values) {
    const specialChars = /[`!@#$%^&*()_+[\]{};':"|,.<>/?~]/;

    if (!values.password) {
        errors.password = toast.error('contraseña Requerida...!')
    } else if (values.password.includes(" ")) {
        errors.password = toast.error('contraseña invalida...!')
    } else if (values.password.length < 4) {
        errors.password = toast.error('la contraseña debe tener mas de 4 caracteres')
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error('La contraseña debe contener caracteres');
    }

    return errors;
}

/** validate username */
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Requerido...!')
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Username invalido...!')
    }

    return error;
}

function emailVerify(error = {}, values) {
    if(!values.email){
        error.email = toast.error('Email Requerido...!')
    }else if(values.email.includes(" ")){
        error.email = toast.error('Email incorrecto...!')
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error('Direccion de email invalida...!')
    }
    return error;
}