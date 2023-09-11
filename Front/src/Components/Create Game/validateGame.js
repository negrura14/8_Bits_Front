
const validateGame = (input,names) => {
    let errors = {};

    //name
    let nameValidation = names.find((game) => game.name.toLowerCase() === input.name.toLowerCase());
    if (nameValidation) {
        errors.name = "There is already a game with the same name, please choose another one!";
    }

    //description
    if (input.description.length > 200) {
        errors.description = "Description too long";
    }

    return errors;

}

export default validateGame;