import "./Create.css";

import { useState,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";

function Create() {

    const dispatch = useDispatch();
    // acá tendríamos que traer a todos los videojuegos para luego validar si estamos cargando uno con el mismo nombre


    // Estados locales para manejar los input y los errores:

    const [input,setInput] = useState({
        title: "",
        description: "",
        price: "",
        weight: "",
        date: "",
        genre: [],
        image: ""
    });

    const [errors,setErrors] = useState({
        title: "",
        description: "",
        price: "",
        weight: "",
        date: "",
        genre: [],
        image: ""
    });

    return(
        <div>
            <h1>Create Game</h1>

            <form>

                <label>Title</label>
                <input 
                    placeholder="Enter Title"
                    type="text"
                    name="title"
                    value={input.title}
                    // onChange={(event) => handleChange(event)}
                    // className={errors.name ? 'error' : ''}                    
                />

                <label>Description</label>
                <input 
                    placeholder="Enter Description"
                    type="text"
                    name="description"
                    value={input.description}
                    // onChange={(event) => handleChange(event)}
                    // className={errors.name ? 'error' : ''}                    
                />

                <label>Price</label>
                <input 
                    placeholder="Enter Price"
                    type="number"
                    name="price"
                    value={input.price}
                    // onChange={(event) => handleChange(event)}
                    // className={errors.name ? 'error' : ''}                    
                />

                <label>Weight</label>
                <input 
                    placeholder="Enter Weight"
                    type="number"
                    name="weight"
                    value={input.weight}
                    // onChange={(event) => handleChange(event)}
                    // className={errors.name ? 'error' : ''}                    
                />

                <label>Date</label>
                <input 
                    placeholder="Enter Date"
                    type="text"
                    name="date"
                    value={input.date}
                    // onChange={(event) => handleChange(event)}
                    // className={errors.name ? 'error' : ''}                    
                />

                <label>Genre</label>
                <input 
                    placeholder="Enter Genre"
                    type="text"
                    name="genre"
                    value={input.genre}
                    // onChange={(event) => handleChange(event)}
                    // className={errors.name ? 'error' : ''}                    
                />

                 <label>Upload files</label> {/*en desarrollo */}
                <input 
                    placeholder="Enter Title"
                    type="text"
                    name="title"
                    value={input.title}
                    // onChange={(event) => handleChange(event)}
                    // className={errors.name ? 'error' : ''}                    
                />

                <label>Terms and conditions</label>
                <input 
                    type="checkbox"                  
                />

                <div>
                    <button type="sumbit">UPLOAD</button>
                </div>
                
            </form>

        </div>
    );

}

export default Create;