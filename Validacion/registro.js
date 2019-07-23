const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email:"";
    data.password = !isEmpty(data.password) ? data.password:"";
    data.password2 = !isEmpty(data.password2) ? data.password2:"";

    if(Validator.isEmpty(data.email)){
        errors.email = "Email requerido";
    }else if(!Validator.isEmail(data.email)){
        errors.email = "Email invalido";
    }

    if(Validator.isEmpty(data.password)){
       errors.password = "Password requerido";
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirmar password es requerido";
    }

    //if(!Validator.isLength(data.password), { min:6,max:30 }){
      //  errors.password = "El password debe ser mayor a 6 caracteres y menor a 30";
    //}

    if(!Validator.equals(data.password,data.password2)){
        errors.password2 = "Passsword no coinciden";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};