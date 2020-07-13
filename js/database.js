'use strict';

class Database {
    // recuperar los datos de los usuarios - el array
    getAllUsers = () => {
        // recuperar el string
        const usersStr = localStorage.getItem("users");
        // convertir el string a un array con metodo JSON.parse
        const usersArr = JSON.parse( usersStr );

        //si todavia no hay usuarios devuelve un array vacio.
        if (usersArr === null ){
            return [];
        } else {
            return usersArr;
        }
    }

    saveNewUser = (newUser) => {
        // recuperar el string de los usuarios del localstorage. 
        const usersArr = this.getAllUsers();

        // actualizar el array de usuarios.
        usersArr.push(newUser);

        // convertir el array a un string.
        const usersStr = JSON.stringify(usersArr);

        // almacenarlo den nuevo en el localstorage. 
        localStorage.setItem("users", usersStr);
    }
}

const db = new Database();