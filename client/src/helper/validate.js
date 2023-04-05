import toast from 'react-hot-toast'


/**validando el login de la pagina username*/

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    return errors;
}
/**Validando passowrd */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/** validate password */
function passwordVerify(errors = {},values){
    const specialChars = /[`!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error('contraseña Requerida...!')
    }else if(values.password.includes(" ")){
        errors.password = toast.error('contraseña invalida...!')
    }else if(values.password.length < 4){
        errors.password = toast.error('la contraseña debe tener mas de 4 caracteres')
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error('La contraseña debe contener caracteres');
    }

    return errors;
}

/** validate username */
function usernameVerify(error = {},values){
    if(!values.username){
        error.username = toast.error('Username Requerido...!')
    }else if(values.username.includes(" ")){
        error.username = toast.error('Username invalido...!')
    }

    return error;
}