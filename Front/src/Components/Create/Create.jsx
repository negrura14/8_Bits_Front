import "./Create.css";

import { useState,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";

export default function Create() {

    //const dispatch = useDispatch();
    // acá tendríamos que traer a todos los videojuegos para luego validar si estamos cargando uno con el mismo nombre


    // Estados locales para manejar los input y los errores:

    const [input,setInput] = useState({
        name: "",
        image: "",
        description: "",
        releaseDate: "",
        supportedPlatforms: [],
        genre: [],
        price: "",
        stock: "",
    });

    const [errors,setErrors] = useState({
        name: "",
        image: "",
        description: "",
        releaseDate: "",
        supportedPlatforms: [],
        genre: [],
        price: "",
        stock: "",
    });

    return(
        <div>
            <h1>Create Game</h1>

            <form>

                <label>Name</label>
                <input 
                    placeholder="Enter Title"
                    type="text"
                    name="name"
                    value={input.name}
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
                    name="releaseDate"
                    value={input.releaseDate}
                    // onChange={(event) => handleChange(event)}
                    // className={errors.name ? 'error' : ''}                    
                />

                <label>Platforms</label>
                <input 
                    placeholder="Enter Supported Platforms"
                    type="text"
                    name="supportedPlatforms"
                    value={input.supportedPlatforms}
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

                <label>Stock</label>
                <input 
                    placeholder="Enter Genre"
                    type="number"
                    name="stock"
                    value={input.stock}
                    // onChange={(event) => handleChange(event)}
                    // className={errors.name ? 'error' : ''}                    
                />

                 <label>Upload files</label> {/*en desarrollo */}
                <input 
                    placeholder="Enter Title"
                    type="text"
                    name="image"
                    value={input.image}
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
