
export const validateLogin = (userData,users) => {

    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



    const errors = {};
    console.log(userData.email)
    
    let emailValidation = users.find((user) => user.email === userData.email);

    if(emailValidation){
        errors.email = "There is already a email with the same name, please choose another one!";
    } else if (!regexEmail.test(userData.email)) {
        errors.email = "Please enter a correct email";
    }


    if(!userData.email) errors.email = 'Email is required'; 

    if (!regexPassword.test(userData.password)) {
        errors.password = "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long.";
      }
    
    if(!userData.email) errors.password = 'Password is required'; 
    console.log(errors)
    
    return errors;
}