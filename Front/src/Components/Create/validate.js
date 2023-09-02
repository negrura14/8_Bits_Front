
const validate = (input,names) => {
    let errors = {};

    //name
    let nameValidation = names.find((game) => game === input.name);
    if (nameValidation) {
        errors.name = "There is already a game with the same name, please choose another one!";
    }

    //description
    if (input.description.length > 150) {
        errors.description = "Description too long";
    }

    return errors;


}

export default validate;