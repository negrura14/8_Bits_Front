
const validateUser = (input,users) => {
    let errors = {};

    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regexNameLastname = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    //name
    if(input.name && !regexNameLastname.test(input.name)){
        errors.name="Invalid characters. Please use only letters";
    }
    
    //lastname
    if(input.lastname && !regexNameLastname.test(input.lastname)){
        errors.lastname="Invalid characters. Please use only letters";
    }

    //email
    let emailValidation = users.find((user) => user.email === input.email);
    if(input.email && emailValidation){
        errors.email = "There is already a email with the same name, please choose another one!";
    } else if (input.email === ""){
        errors.email = "";
    }else if (!regexEmail.test(input.email)) {
        errors.email = "Please enter a correct email";
    } 

    //password
    if (input.password && !regexPassword.test(input.password)) {
        errors.password = "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long.";
      }

    //password confirmation
    if (input.confirmPassword && input.password !== input.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      }

    return errors;
}

export default validateUser;