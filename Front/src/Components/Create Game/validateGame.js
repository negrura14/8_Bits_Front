
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

    let regexNumbers = /^[0-9]*$/;

    //price
    if(!regexNumbers.test(input.price)){
        errors.price = "Only numbers admitted"
    } else if (input.price > 100 || input.price < 0){
        errors.price = "The value has to be between 0 and 100"
    }

    //stock
    if(!regexNumbers.test(input.stock)){
        errors.stock = "Only numbers admitted"
    } else if (input.stock > 100 || input.stock < 0){
        errors.stock = "The value has to be between 0 and 100"
    }

    //review
    if(!regexNumbers.test(input.review)){
        errors.review = "Only numbers admitted"
    } else if (input.review > 100 || input.review < 0){
        errors.review = "The value has to be between 0 and 100"
    }

    return errors;

}

export default validateGame;