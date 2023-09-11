import "./CreateGame.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import validateGame from "./validateGame";
import { getGame, getGenders } from "../../Redux/gameActions";

import UploadWidget from "../../Helpers/UploadWidget";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function CreateGame() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { game } = useSelector((state) => state.game);
  const { genre } = useSelector((state) => state.gender);

  //constante para sweet alert
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    dispatch(getGame());
    dispatch(getGenders());
  }, [dispatch]);

  //funcionalidad para traer todas las plataformas que tenemos hasta el momento
  const uniquePlatforms = game.reduce((platformsSet, game) => {
    game.supportedPlatforms.forEach((platform) => {
      platformsSet.add(platform);
    });
    return platformsSet;
  }, new Set());

  const allPlatforms = Array.from(uniquePlatforms);

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
        genre: [...input.genre, selectedGenre],
      });

      setSelectedGenre("");
    }
  }

  function handleRemoveGenre(genre) {
    const updatedGenres = selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(updatedGenres);
    setInput({
      ...input,
      genre: updatedGenres, // Une los géneros con saltos de línea
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
      validateGame(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        game
      )
    );
  }

  //cloudinary

  const [selectedImage, setSelectedImage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  function onImageUpload(imageUrl) {
    setInput({
      ...input,
      image: imageUrl,
    });
    setSelectedImage(imageUrl);
  }

  //---------//

  function formatFields() {
    const releaseDateParts = input.releaseDate.split("-");
    const month = new Date(
      releaseDateParts[0] +
        "/" +
        releaseDateParts[1] +
        "/" +
        releaseDateParts[2]
    ).toLocaleString("en-US", { month: "short" });
    const formattedDate = `${month} ${releaseDateParts[2]}, ${releaseDateParts[0]}`;

    // Formatear el campo de revisión
    const formattedReview = `Metacritic Score - ${input.review}/100`;

    const updatedInput = {
      ...input,
      releaseDate: formattedDate,
      review: formattedReview,
    };

    return updatedInput;
  }

  function sumbitHandler(e) {
    e.preventDefault();

    //validación de errores y de que no falten campos por completar
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

    //fin de validación de errores y campos por completar

    if (!allFieldsComplete) {
      //alert("You have to complete all fields!!");
      MySwal.fire({
        title: <strong>WARNING</strong>,
        html: <i>You have to complete all fields</i>,
        icon: 'warning', // Puedes cambiar el icono si lo deseas
      });
    } else if (!noErrors) {
      //alert("There is some error in the fields!!");
      MySwal.fire({
        title: <strong>ERROR</strong>,
        html: <i>There is some error in the fields, please try again</i>,
        icon: 'error', // Puedes cambiar el icono si lo deseas
      });
    } else {
      axios
        .post("/games/postGame", formatFields())
        .then((res) => res, alert("Game created successfully!"))
        .catch((err) => alert(err));

      setInput({
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

      navigate("/home");
    }
  }

  return (
    <>
      <div className="text-primary px-4 m-5 login-box">
        <h2 className="text-center text-white">Create Game</h2>

        <form onSubmit={(event) => sumbitHandler(event)}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              placeholder="Enter Name"
              type="text"
              name="name"
              value={input.name}
              onChange={(event) => handleChange(event)}
              className="form-control bg-transparent text-white"
              // className={errors.name ? 'error' : ''}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className=" mb-3">
            <label className="form-label">Description</label>
            <textarea
              placeholder="Enter Description"
              type="text"
              name="description"
              value={input.description}
              onChange={(event) => handleChange(event)}
              className="form-control bg-transparent text-white"
              // className={errors.description ? 'error' : ''}
            />
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </div>

          <div className="row">
            <div className="mb-3 col-md-6  col-sm-12">
              <label className="form-label">Price</label>
              <input
                placeholder="Enter Price"
                type="number"
                name="price"
                value={input.price}
                onChange={(event) => handleChange(event)}
                className="form-control bg-transparent text-white"
                // className={errors.price ? 'error' : ''}
              />
            </div>
            <div className="mb-3 col-md-6  col-sm-12">
              <label className="form-label">Release Date</label>
              <input
                placeholder="Enter Date"
                type="date"
                name="releaseDate"
                value={input.releaseDate}
                onChange={(event) => handleChange(event)}
                className="form-control bg-transparent text-white"
                // className={errors.releaseDate ? 'error' : ''}
              />
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6  col-sm-12">
              <label className="form-label">Supported Platforms</label>
              <div className=" bg-transparent row">
                <div className="col">
                  <select
                    className="form-select bg-transparent text-white-50"
                    value={selectedPlatform}
                    onChange={(event) =>
                      setSelectedPlatform(event.target.value)
                    }
                  >
                    <option value="">Select Platform</option>
                    {allPlatforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <button type="button" onClick={handleAddPlatform}>
                    Add
                  </button>
                </div>
              </div>

              <div className="removes mb-3">
                {selectedPlatforms.map((platform) => (
                  <div className=" remove-div mb-1 " key={platform}>
                    <span className="remove-span">{platform}</span>
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
            <div className="col-md-6  col-sm-12">
              <label className="form-label"> Genre</label>
              <div className=" bg-transparent row">
                <div className="col ">
                  <select
                    className="form-select bg-transparent text-white-50"
                    value={selectedGenre}
                    onChange={(event) => setSelectedGenre(event.target.value)}
                  >
                    <option value="">Select Genre</option>
                    {genre?.map((genre) => (
                      <option key={genre.id} value={genre.name}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <button type="button" onClick={handleAddGenre}>
                    Add
                  </button>
                </div>
              </div>

              <div className="removes">
                {selectedGenres.map((genre) => (
                  <div className="remove-div mb-1" key={genre}>
                    <span className="remove-span">{genre}</span>
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
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Review</label>
              <input
                placeholder="0/100"
                type="number"
                name="review"
                value={input.review}
                onChange={(event) => handleChange(event)}
                min="0"
                max="100"
                className="form-control bg-transparent text-white"
                // className={errors.name ? 'error' : ''}
              />
            </div>
            <div className="col quantity">
              <label className="form-label">Stock</label>
              <input
                placeholder="Stock"
                id="typeNumber"
                type="number"
                name="stock"
                value={input.stock}
                onChange={(event) => handleChange(event)}
                min="0"
                max="100"
                className="form-control bg-transparent text-white"
                // className={errors.name ? 'error' : ''}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload files</label>{" "}
            {/*en desarrollo */}
            <UploadWidget
              onImageUpload={onImageUpload}
              setIsUploadingImage={setIsUploadingImage}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              isUploadingImage={isUploadingImage}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              className="form-check-input bg-transparent"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Terms and conditions
            </label>
          </div>

          <button type="sumbit" disabled={!termsAccepted}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            UPLOAD
          </button>
        </form>
      </div>
    </>
  );
}
