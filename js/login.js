'use strict';

class Login{
    constructor() {
        this.emailInput = document.querySelector("#email");
        this.passwordInput = document.querySelector("#password");

        this.loginButton = document.querySelector("#login-button");
        this.messageContainer = document.querySelector(".message-container");
    }

    // gestionar el envio de los datos (evento "submit")
    submit = (event) => {
        event.preventDefault();

        const usersDB = db.getAllUsers();

        //intentar encontrar el usuario. 
        const user = usersDB.find((userObj) => {
            console.log(userObj);

            return this.validateUser(userObj)
        
     })

     console.log(user);

     this.showMessage(user);
    }

    validateUser = (userObj) => {
        const email = this.emailInput.value; 
        const password = this.passwordInput.value;

        console.log(email);
        console.log(password);
        console.log(userObj.email === email && userObj.password === password);

        return userObj.email === email && userObj.password === password;
    }

    // para mostrar el mensaje de error o exito. 
    showMessage = (user) => {

        this.messageContainer.innerHTML = "";

        const message = document.createElement('p');

        if (user) {
            // se enseña el mensaje de exito
            message.innerHTML = `Hola, ${user.email}`;
            message.classList.add("correct-message");
        } else {
            //se enseña mensaje de error
        message.innerHTML = 'El email y/o password son incorrectos';
        }

        this.messageContainer.appendChild(message);
    }

}

const login = new Login();

login.loginButton.addEventListener("click", login.submit);