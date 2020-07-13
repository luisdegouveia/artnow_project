'use strict';

class Validator {
    constructor() {
        //mensajes predeterminados.
        this.invalidEmailError = 'Introduce un email válido';
        this.emailExistsError = 'Este email ya se encuentra registrado';
        this.passwordError = 'Introduce una contraseña de 6 o más carácteres';
        this.repeatPasswordError = 'Los campos no coinciden';

        //objeto con los errores que van a ser mostrados al usuario. 
        this.errors = {
            invalidEmailError: this.invalidEmailError,
            passwordError: this.passwordError,
            repeatPasswordError: this.repeatPasswordError
        }
    }

    //validar el email. 
    validateValidEmail = (email) => {
        //si el email es válido tengo que quitar el error. 
        if (this.emailIsValid(email)) {
            delete this.errors.invalidEmailError;
        //si el email no es válido ponemos el error de nuevo.
        } else {
            this.errors.invalidEmailError = this.invalidEmailError;
        }
    }

    //validar si el email no está tomado.
    //funcion auxiliar de validate email. 
    emailIsValid = (email) => {
        //RegEx es un objeto especial, contiene las reglas especiales que debe cumplir el email.
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        //metodo test, prueba si la cadena cumple las reglas, devuelve true o false. 
        const isValid = emailRegEx.test(email);

        return isValid;
    }

    //validar si el email es unico 
    validateUniqueEmail = (newEmail) => {
        const usersDB = db.getAllUsers();

        let emailUnique = true;

        if(usersDB.length > 0) {
            usersDB.forEach( (userObj) => {
                //si el email ya esta tomado, cambia el valor de la variable a false.
                if (userObj.email === newEmail) {
                    emailUnique = false;
                }
            } )

            if (emailUnique) {
                //quitar el mensaje de error.
                delete this.errors.emailExistsError;
            } else {
                //si el email no es unico, mostrar el error de nuevo el error. 
                this.errors.emailExistsError = this.emailExistsError;
            }

        }
    }

    //validar longitud del password. 
    validatePassword = (password) => {
        if (password.length > 5) {
            //quita el mensaje de error
            delete this.errors.passwordError;
        } else {
            //si la contraseña no es mayor a 5, muestra el error de nuevo.
            this.errors.passwordError = this.passwordError;
        }
    }

    //validar si password y repeat-password coinciden. 
    validatePasswordRepeat = (password, passwordRepeat) => {
        if (password === passwordRepeat) {
            //si las contraseñas coinciden se quita el mensaje de error.
            delete this.errors.repeatPasswordError;
        } else {
            //si no coincide ponemos el error de nuevo
            this.errors.repeatPasswordError = this.repeatPasswordError;
        }
    }

    //obtener el objeto con errores para mostrarlos al usuario en la pagina sign up.
    getErrors = () => {
        return this.errors;
    }

    //reiniciar los errores mostrados, para el proximo sign up. 
    resetValidator = () => {
        this.errors = {
            invalidEmailError: this.invalidEmailError,
            passwordError: this.passwordError,
            repeatPasswordError: this.repeatPasswordError
        }
    }

}

const validator = new Validator();