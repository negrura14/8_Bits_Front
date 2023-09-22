
const validateAbout = (input,users) => {
    let errors = {};

    const regexPhone = /^[0-9]+$/;


    //nickname
    let nickNameValidation = users.find((user) => user.nickName === input.nickName)
    if(input.nickName && nickNameValidation){
        errors.nickName = "There is already a nickname with the same name, please choose another one!"
    }

    //description
    if(input.description && input.description.length > 200){
        errors.description = "Description too long";
    }

    //phone
    if(input.phone && !regexPhone.test(input.phone)){
        errors.phone = "Invalid characters. Please use only numbers"
    }

    return errors;
}

export default validateAbout;