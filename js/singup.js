 'use strict';

class Singup {
    constructor () {
        this.nameInput = document.querySelector('#name');
        this.emailInput = document.querySelector('#email');
        this.passwordInput = document.querySelector('#password');
        this.repeatPasswordInput = document.querySelector('#repeat-password');

        this.buttonInput = document.querySelector('#singup-button');
        this.errorsWrapper = document.querySelector('.message-container');
    }


    // gestionar cambios del input 'email'
    handleEmailInput = (event) => {
        const email = event.target.value;

        // validar el texto del input email
        validator.validateValidEmail(email);

        const errors = validator.getErrors();

        //si el email es valido 
        if (!errors.invalidEmailError) {
            //comprobar si el email es unico
            validator.validateUniqueEmail(email);
        } 

        this.setErrorMessages();
    }

    // gestionar cambios del input 'password'
    handlePasswordInput = (event) => {
        const password = event.target.value;
        const passwordRepeat = this.repeatPasswordInput.value;

        // validar el texto del input password
        validator.validatePassword(password);
        validator.validatePasswordRepeat(password, passwordRepeat);

        this.setErrorMessages();
    }

    // gestionar cambios del input 'repeat-password'
    handleRepeatPasswordInput = (event) => {
        const passwordRepeat = event.target.value;
        const password = this.passwordInput.value;

        // validar el texto del input password
        validator.validatePassword(password);
        validator.validatePasswordRepeat(password, passwordRepeat);

        this.setErrorMessages();
    }

    // gestionar el envio de los datos (submit)
    saveData = (event) => {
        // cuando el evento ocurre, lo cancelamos y que no recargue la pagina. 
        event.preventDefault();

        // recoger valores de cada input
        const name = this.nameInput.value;
        const email = this.emailInput.value; 
        const password = this.passwordInput.value;
        const repeatPassword = this.repeatPasswordInput.value; 

        const newUser = new User(name, email, password);

        //guardar el usuario en la base de datos
        db.saveNewUser( newUser );

        // vacriar el formulario
        this.nameInput.value = "";
        this.emailInput.value = ""; 
        this.passwordInput.value = "";
        this.repeatPasswordInput.value = ""; 

        this.showSuccessMessage();
        this.removeMessages();
    }

    // registrar funcion para cada input/campo
    addListeners = () => {
        // escucha para los cambios de texto
        this.emailInput.addEventListener("input", this.handleEmailInput);
        this.passwordInput.addEventListener("input", this.handlePasswordInput);
        this.repeatPasswordInput.addEventListener("input", this.handleRepeatPasswordInput);

        this.buttonInput.addEventListener("click", this.saveData);
    }

    showSuccessMessage = () => {
        // vacia los errores para que no se sumen
        this.errorsWrapper.innerHTML = "";
    
        const errorsObj = validator.getErrors();
        // convertir el objeto a un array de strings
        const errorsStringsArr = Object.values(errorsObj);
    
        if (errorsStringsArr.length > 1) {
          return;
        }
    
        const successMessageP = document.createElement('p');
        successMessageP.innerHTML = "Your account has been created successfully, welcome!";
    
        this.errorsWrapper.appendChild(successMessageP);
    
    }

    removeMessages = () => {
        setTimeout( () => {
          this.errorsWrapper.innerHTML = "";
        }, 2000)
    }

    setErrorMessages = () => {
        //vacia los errores para que no se acumulen. 
        this.errorsWrapper.innerHTML = "";

        const errorsObj = validator.getErrors();

        // convertir el objeto de los errores a un array de strings.
        const errorsStringsArr = Object.values(errorsObj);

        errorsStringsArr.forEach( (errorStr) => {
            const errorMessageP = document.createElement('p');
            errorMessageP.innerHTML = errorStr;

            this.errorsWrapper.appendChild(errorMessageP);
        })
    }

}

// crear una nueva instancia del sign up
const singup = new Singup();

window.addEventListener("load", singup.addListeners );