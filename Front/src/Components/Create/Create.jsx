import "./Create.css";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import validate from "./validate";

export default function Create() {
  //const dispatch = useDispatch();
  // acá tendríamos que traer a todos los videojuegos para luego validar si estamos cargando uno con el mismo nombre

  //arrays de prueba
  const names = [
    "GTA",
    "Mario",
    "Need for Speed",
    "Call of Duty",
    "Battlefield",
  ];

  const initialPlatforms = ["PC", "PS3", "PS2", "XBOX"];
  const initialGenres = [
    "Action",
    "Adventure",
    "RPG",
    "Puzzle",
    "First-Person Shooter",
  ];

  const [termsAccepted, setTermsAccepted] = useState(false);

  // Estados locales para manejar los input y los errores:

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    releaseDate: "",
    supportedPlatforms: [],
    genre: [],
    price: "",
    stock: "",
    review: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    description: "",
    releaseDate: "",
    supportedPlatforms: [],
    genre: [],
    price: "",
    stock: "",
    review: "",
  });

  //local states to manage the platforms and genres

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  function handleAddPlatform() {
    if (selectedPlatform && !selectedPlatforms.includes(selectedPlatform)) {
      setSelectedPlatforms([...selectedPlatforms, selectedPlatform]);
      setInput({
        ...input,
        supportedPlatforms: [...input.supportedPlatforms, selectedPlatform], // Agregar a la propiedad supportedPlatforms
      });
      setSelectedPlatform("");
    }
  }

  function handleRemovePlatform(platform) {
    const updatedPlatforms = selectedPlatforms.filter((p) => p !== platform);
    setSelectedPlatforms(updatedPlatforms);
    setInput({
      ...input,
      supportedPlatforms: updatedPlatforms, // Actualizar la propiedad supportedPlatforms
    });
  }

  function handleAddGenre() {
    if (selectedGenre && !selectedGenres.includes(selectedGenre)) {
      setSelectedGenres([...selectedGenres, selectedGenre]);
      setInput({
        ...input,
        genre: [...input.genre, selectedGenre], // Agregar a la propiedad genre
      });
      setSelectedGenre("");
    }
  }

  function handleRemoveGenre(genre) {
    const updatedGenres = selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(updatedGenres);
    setInput({
      ...input,
      genre: updatedGenres, // Actualizar la propiedad genre
    });
  }

  //end platforms and genres functions

  function handleChange(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        names
      )
    );
  }

  function sumbitHandler(e) {
    e.preventDefault();

    const requiredFields = [
      "name",
      "image",
      "description",
      "releaseDate",
      "supportedPlatforms",
      "genre",
      "price",
      "stock",
      "review",
    ];

    // Verifica si todos los campos requeridos tienen un valor
    const allFieldsComplete = requiredFields.every((field) => {
      if (Array.isArray(input[field])) {
        // Verifica los arreglos
        return input[field].length > 0;
      }
      // Verifica que los demás campos no estén vacios
      return input[field].trim() !== "";
    });

    // Verifica si el estado de errores está vacío
    const noErrors = Object.values(errors).every((error) => error === "");

    if (!allFieldsComplete) {
      alert("You have to complete all fields!!");
    } else if (!noErrors) {
      alert("There is some error in the fields!!");
    } else {
      //aqui va el dispatch al back
    }
  }

  return (
    <div>
      <div className="login-box">
        <h2>Create Game</h2>

        <form onSubmit={(event) => sumbitHandler(event)}>
          <div className="user-box">
            <input
              placeholder="Enter Name"
              type="text"
              name="name"
              value={input.name}
              onChange={(event) => handleChange(event)}
              // className={errors.name ? 'error' : ''}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
            <label>Name</label>
          </div>

          <div className="user-box">
            <input
              placeholder="Enter Description"
              type="text"
              name="description"
              value={input.description}
              onChange={(event) => handleChange(event)}
              // className={errors.description ? 'error' : ''}
            />
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}

            <label>Description</label>
          </div>

          <div className="user-box">
            <input
              placeholder="Enter Price"
              type="number"
              name="price"
              value={input.price}
              onChange={(event) => handleChange(event)}
              // className={errors.price ? 'error' : ''}
            />

            <label>Price</label>
          </div>

          <div className="user-box">
            <input
              placeholder="Enter Date"
              type="date"
              name="releaseDate"
              value={input.releaseDate}
              onChange={(event) => handleChange(event)}
              // className={errors.releaseDate ? 'error' : ''}
            />

            <label>Release Date</label>
          </div>

          
          <div className="select-box">
          
          <label className="select-user">Supported Platforms</label>
          <div className="select-div">
          <select
              value={selectedPlatform}
              onChange={(event) => setSelectedPlatform(event.target.value)}
            >
              <option value="">Select Platform</option>
              {initialPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddPlatform}>
              Add
            </button>
          </div>
           
            <div  className="removes" >
              {selectedPlatforms.map((platform) => (
                <div className="remove-div" key={platform}>
                  <span>{platform}</span>
                  <a
                  className="remove-button"
                    type="button"
                    onClick={() => handleRemovePlatform(platform)}
                  >
                    X
                  </a>
                </div>
              ))}
            </div>

          </div>

          <div className="select-box">
          <label className="select-user"> Genre</label>
          <div className="select-div">
          <select
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
            >
              <option value="">Select Genre</option>
              {initialGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddGenre}>
              Add
            </button>
          </div>
            
            
            <div className="removes">
              {selectedGenres.map((genre) => (
                <div className="remove-div" key={genre}>
                  <span>{genre}</span>
                  <a
                  className="remove-button"
                    type="button"
                    onClick={() => handleRemoveGenre(genre)}
                  >
                    X
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="user-box">
            <input
              placeholder="0/100"
              type="number"
              name="review"
              value={input.review}
              onChange={(event) => handleChange(event)}
              min="0"
              max="100"
              // className={errors.name ? 'error' : ''}
            />

            <label>Review</label>
          </div>

          <div className="user-box">
            <input
              placeholder="Stock"
              type="number"
              name="stock"
              value={input.stock}
              onChange={(event) => handleChange(event)}
              min="0"
              max="100"
              // className={errors.name ? 'error' : ''}
            />

            <label>Stock</label>
          </div>

          <div className="user-box">
            <input
              placeholder="Url link jpg or png"
              type="text"
              name="image"
              value={input.image}
              onChange={(event) => handleChange(event)}
              // className={errors.name ? 'error' : ''}
            />
            {errors.image && <p className="error-message">{errors.image}</p>}
            <label>Upload files</label> {/*en desarrollo */}
          </div>

          <div className="term-box">
            <label className="select-user">Terms and conditions</label>
            <label class="checkbox-container">
            <input
            className="custom-checkbox"
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
            />
            <span class="checkmark"></span>
            </label>
            
          </div>

          <div>
            <button type="sumbit" disabled={!termsAccepted}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
              UPLOAD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
