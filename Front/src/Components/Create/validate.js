
const validate = (input,names) => {
    let errors = {};

    //name
    let nameValidation = names.find((game) => game === input.name);
    if (nameValidation) {
        errors.name = "There is already a game with the same name, please choose another one!";
    }

    //description
    if (input.description.length > 200) {
        errors.description = "Description too long";
    }

    //image
    let regexImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    if (!regexImage.test(input.image)){
        errors.image = "Please enter a valid url";
    }

    return errors;


}

export default validate;