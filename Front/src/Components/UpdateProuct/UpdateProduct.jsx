import React, { useEffect, useState } from 'react'
import './UpdateProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import { getGame, getGenres, getSupportedPlatforms } from '../../Redux/gameActions';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import UploadWidget from "../../Helpers/UploadWidget";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const UpdateProduct = () => {
  const [searchInput, setSearchInput ] = useState('');
  const [selectedGame, setSelectedGame] = useState(null); // Estado para el juego seleccionado
  const { game } = useSelector(state => state.game);
  const { genre } = useSelector(state => state.genre);
  const { supportedPlatform } = useSelector(state => state.supportedPlatform);
  const dispatch = useDispatch();
  // console.log("ESTO ME ESTA TRAYENDO GAME DENTRO DEL COMPONENTE UP: ", game[8]);
  console.log(game,"game");
  //--------------------sweet alert---------------------------//
  const MySwal = withReactContent(Swal);

  const Toast = MySwal.mixin({  
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  const swalWithBootstrapButtons = MySwal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  //--------------------sweet alert---------------------------//

  useEffect(() => {
    dispatch(getGame());
    dispatch(getGenres());
    dispatch(getSupportedPlatforms());
  }, [dispatch]);

  const [selectedImage, setSelectedImage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  function onImageUpload(imageUrl) {
    setSelectedGame({ ...selectedGame, image: imageUrl })
    setSelectedImage(imageUrl);
  }

  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setSelectedGame(null); // Al cambiar la búsqueda, deselecciona cualquier juego seleccionado
    // console.log("ESTO ME ESTA TRAYENDO GAME DENTRO DEL COMPONENTE UP: ", searchInput);
  }

  const filteredGames = game.filter(game => {
    return game.name.toLowerCase().includes(searchInput.toLowerCase());
  });
  
  const sumbitHandler = (e) => {
    e.preventDefault();
    axios.put(`/games/${selectedGame.id}`, selectedGame)
    setSelectedGame(null);
    setSearchInput('');
    dispatch(getGame());
    Toast.fire({
      icon: "success",
      iconColor: "white",
      title: <strong>Changes were successfully made!</strong>,
      color: "#fff",
      background: "#333",
    });
    

  }

  const deletedPlatform = (element, platGenre) => {
    if(element === 'platfom') {
      const filtDeleted = selectedGame.SupportedPlatforms.filter((g) => g.name !== platGenre.name)
      setSelectedGame({ ...selectedGame, SupportedPlatforms: filtDeleted })
    }else 
    if(element === 'genre') {
      const filtDeleted = selectedGame.Genres.filter((g) => g.name !== platGenre.name)
      setSelectedGame({ ...selectedGame, Genres: filtDeleted })
    }
    // console.log("ESTO LLEGA CUANDO ESTOY TRATANDO DE ELIMINAR: ", element);
  }

  const addSelectGenrePlat = (element, platGenre) => {
    if(element === 'genre') {
      const selectedGenre = genre.find(g => g.name === platGenre);
      if (!selectedGame.Genres.some((genre) => genre.name === selectedGenre.name)) {
        setSelectedGame((prevSelectedGame) => ({
          ...prevSelectedGame,
          Genres: [...prevSelectedGame.Genres, selectedGenre],
        }));
      }
    }else
    if(element === 'platform') {
      const selectedPlatf = supportedPlatform.find(p => p.name === platGenre);
      if (!selectedGame.SupportedPlatforms.some((platf) => platf.name === selectedPlatf.name)) {
        setSelectedGame((prevSelectedGame) => ({
          ...prevSelectedGame,
          SupportedPlatforms: [...prevSelectedGame.SupportedPlatforms, selectedPlatf],
        }));
      }
    }
  }

  const changeHandler = () => {

    if(selectedGame.disable === false) {
      swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: `You are going to disable ${selectedGame.name}`,
          icon: 'warning',
          background: "#1d1d1d",
          showCancelButton: true,
          confirmButtonText: "Yes, I'm sure",
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Success!',
              `Game ${selectedGame.name} disabled!`,
              'success'
            )
  
            setSelectedGame({ ...selectedGame, disable: true }) 
    
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Game not disabled!',
              'error'
            )
          }
        })

  } else {
      swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: `You are going to enable ${selectedGame.name}`,
          icon: 'warning',
          background: "#1d1d1d",
          showCancelButton: true,
          confirmButtonText: "Yes, I'm sure",
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Success!',
              `Game ${selectedGame.name} enabled!`,
              'success'
            )
          
            setSelectedGame({ ...selectedGame, disable: false })
    
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Game still disabled!',
              'error'
            )
          }
        })

  }

    // if(selectedGame.disable === false){
    //   setSelectedGame({ ...selectedGame, disable: true })
    // }else{
    //   setSelectedGame({ ...selectedGame, disable: false })
    // }
  }



  return (
    <div className='login-box'>
      <div className=" mb-3">
        <h2 className='text-center text-white'>Update Products</h2>
      </div>

      <label className="form-label">Search Game</label>
      <input
        type="text"
        value={searchInput}
        onChange={onSearchInputChange}
        placeholder="Buscar juegos..."
        className='form-control bg-transparent text-white mb-3'
      />
      
      <select
        className='form-select bg-transparent text-white-50'
        value={selectedGame ? selectedGame.name : ''}
        onChange={(e) => {
          const selectedGameName = e.target.value;
          const selectedGame = filteredGames.find(game => game.name === selectedGameName);
          setSelectedGame(selectedGame);
        }}
        size="4"
      >
        <option className='bg-transparent' value="">Selecciona un juego</option>
        {filteredGames.map((game, index) => (
          <option className='bg-transparent' key={index} value={game.name}>
            {game.name}
          </option>
        ))}
      </select>

      {selectedGame && (
        <div>
          <h2 className='my-3'>Editar Juego:</h2>
          <div className='row d-flex justify-content-center mb-3'>
          
              <img src={selectedGame.image} className="col-8"/>

            </div>
          <form onSubmit={(event) => sumbitHandler(event)} className='disposition'>

          <div className='col-12 upload'>

            <UploadWidget
              onImageUpload={onImageUpload}
              setIsUploadingImage={setIsUploadingImage}
              selectedImage={selectedGame.image}
              setSelectedImage={setSelectedImage}
              isUploadingImage={isUploadingImage}
            />
          </div>

            <label className="form-label">Name</label>
            <input
              className='form-control bg-transparent text-white mb-3'
              type="text"
              value={selectedGame.name}
              onChange={(e) => setSelectedGame({ ...selectedGame, name: e.target.value })}
              placeholder="Nombre del juego"
            />

            <label className="form-label">Description</label>
            <input
              className='form-control bg-transparent text-white mb-3'
              type="text"
              value={selectedGame.description}
              onChange={(e) => setSelectedGame({ ...selectedGame, description: e.target.value })}
              placeholder="Descripción del juego"
            />
            <div className='row'>

            <div className='col'>

            <label className="form-label">Stock</label>
            <input
              type="number"
              name="stock"
              value={selectedGame.stock}
              onChange={(e) => setSelectedGame({ ...selectedGame, stock: Number(e.target.value) })}
              min="0"
              max="100"
              className="form-control bg-transparent text-white mb-3"
            /> 
            </div>

            <div className='col'>

            <label className="form-label">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={selectedGame.price}
              onChange={(e) => setSelectedGame({ ...selectedGame, price: e.target.value })}
              min="0"
              max="100"
              className="form-control bg-transparent text-white mb-3"
            />
</div>

            </div>



            <div className='row d-flex justify-content-between mb-3'>

    {/* ------------BLOQUE DONDE SE SELECCIONA O ELIMINA UN PLATAFORMAS-------------- */}
              <div className="col-5 mb-3">
                <label className="form-label mb-3" >Platforms</label>
                <div>
                  <select
                    className="form-select bg-transparent text-white-50 mb-3"
                    value=""
                    onChange={(e) => addSelectGenrePlat('platform', e.target.value)}
                  >
                    <option value="">Select Platform</option>
                    {supportedPlatform.map((platf) => (
                      <option className='colorSelect' key={platf.id} value={platf.name}>
                        {platf.name}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedGame.SupportedPlatforms.map((platform) => (
                  <div className=" deletedElement mb-1 " >
                    <span className="">{platform.name}</span>
                    <a
                      className="remove-button"
                      type="button"
                      onClick={(e) => deletedPlatform('platfom', platform)}
                    >
                      X
                    </a>
                  </div>
                ))}
              </div>
    {/* ------------FIN DE BLOQUE DONDE SE SELECCIONA O ELIMINA UN COMPONENTES-------------- */}

    {/* ------------BLOQUE DONDE SE SELECCIONA O ELIMINA UN GENERO-------------- */}
        
              <div className="col-5 mb-3">
              <label className="form-label mb-3">Genres</label>
                <div>
                  <select
                    className="form-select bg-transparent text-white-50 mb-3"
                    value={selectedGame.Genres.name}
                    onChange={(e) => addSelectGenrePlat('genre', e.target.value)}
                  >
                    <option value="">Select Genre</option>
                    {genre.map((genre) => (
                      <option className='colorSelect' key={genre.id} value={genre.name}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedGame.Genres.map((genre) => (
                  <div className=" deletedElement mb-1 " >
                    <span className="">{genre.name}</span>
                    <a
                      className="remove-button"
                      type="button"
                      onClick={(e) => deletedPlatform('genre', genre)}
                    >
                      X
                    </a>
                  </div>
                ))}
              </div>
    {/* ------------ FIN DE BLOQUE DONDE SE SELECCIONA O ELIMINA UN GENERO-------------- */}
            </div>

            <div className="mb-3">
            <Form className='disabledGame'>
          <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Disable Game"
              checked={selectedGame.disable}
              onChange={changeHandler}
          />
        </Form>
            </div>
           
            <button className='checkBoxs' type="sumbit">Guardar Cambios</button>
            
          </form>
        </div>
      )}
    
    </div>
  )
}
