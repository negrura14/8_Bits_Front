import React, { useEffect, useState } from 'react'
import './UpdateProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import { getGame, getGenres } from '../../Redux/gameActions';
import axios from 'axios';
import Form from 'react-bootstrap/Form';


export const UpdateProduct = () => {
  const [searchInput, setSearchInput ] = useState('');
  const [selectedGame, setSelectedGame] = useState(null); // Estado para el juego seleccionado
  const { game } = useSelector(state => state.game);
  const { genre } = useSelector(state => state.genre);
  const dispatch = useDispatch();
  // console.log("ESTO ME ESTA TRAYENDO GAME DENTRO DEL COMPONENTE UP: ", genre);

  useEffect(() => {
    dispatch(getGame());
    dispatch(getGenres());
  }, [dispatch]);

  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setSelectedGame(null); // Al cambiar la búsqueda, deselecciona cualquier juego seleccionado
    // console.log("ESTO ME ESTA TRAYENDO GAME DENTRO DEL COMPONENTE UP: ", searchInput);
  }

  const filteredGames = game.filter(game => {
    return game.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  // const onSelectGame = (game) => {
  //   setSelectedGame(game);
  // }
  
  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log("resultado del submit: ", selectedGame);
    axios.put(`/games/${selectedGame.id}`, selectedGame)
    alert("LOS CAMBIOS SE REALIZARON CON EXITO")
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
      const selectedPlatf = platform.find(p => p.name === platGenre);
      if (!selectedGame.SupportedPlatforms.some((platf) => platf.name === selectedPlatf.name)) {
        setSelectedGame((prevSelectedGame) => ({
          ...prevSelectedGame,
          Genres: [...prevSelectedGame.SupportedPlatforms, selectedPlatf],
        }));
      }
    }
  }



  return (
    <div className='cajaEdit'>
      <div className="title mb-3">
        <h2 className='fontUpdate'>HAS INGRASADO A UPDATE PRODUCTS</h2>
        <Form className='disabledGame'>
          <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Disable Game"
              checked={false}
              onChange={(e) => setSelectedGame({ ...selectedGame, description: e.target.value })}
          />
        </Form>
      </div>
      <input
        type="text"
        value={searchInput}
        onChange={onSearchInputChange}
        placeholder="Buscar juegos..."
        className='space'
      />
      
      <select
        className='fontUpdate space'
        value={selectedGame ? selectedGame.name : ''}
        onChange={(e) => {
          const selectedGameName = e.target.value;
          const selectedGame = filteredGames.find(game => game.name === selectedGameName);
          setSelectedGame(selectedGame);
        }}
        multiple
      >
        <option value="">Selecciona un juego</option>
        {filteredGames.map((game, index) => (
          <option key={index} value={game.name}>
            {game.name}
          </option>
        ))}
      </select>

      {selectedGame && (
        <div>
          <h2 className='space'>Editar Juego: {selectedGame.name}</h2>
          <form onSubmit={(event) => sumbitHandler(event)} className='disposition'>
            <input
              className='space'
              type="text"
              value={selectedGame.name}
              onChange={(e) => setSelectedGame({ ...selectedGame, name: e.target.value })}
              placeholder="Nombre del juego"
            />
            <input
              className='space '
              type="text"
              value={selectedGame.description}
              onChange={(e) => setSelectedGame({ ...selectedGame, description: e.target.value })}
              placeholder="Descripción del juego"
            />
            <input
              type="number"
              name="stock"
              value={selectedGame.stock}
              onChange={(e) => setSelectedGame({ ...selectedGame, stock: e.target.value })}
              min="0"
              max="100"
              className="space"
            />
            <input
              type="number"
              name="price"
              value={selectedGame.price}
              onChange={(e) => setSelectedGame({ ...selectedGame, price: e.target.value })}
              min="0"
              max="100"
              className="space"
            />
            <div className='platGenre'>

    {/* ------------BLOQUE DONDE SE SELECCIONA O ELIMINA UN PLATAFORMAS-------------- */}
              <div className="dimension mb-3">
                <h4>Agrega o elimina una plataforma</h4>
                <div>
                  <select
                    className=""
                    value=""
                    onChange={(e) => addSelectGenrePlat('platfom', e.target.value)}
                  >
                    <option value="">Select Platform</option>
                    {genre.map((genre) => (
                      <option className='colorSelect' key={genre.id} value={genre.name}>
                        {genre.name}
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
        
              <div className="dimension mb-3">
              <h4>Agrega o elimina un genero</h4>
                <div>
                  <select
                    className=""
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
            <div className='imageTam'>
              <img src={selectedGame.image}/>
            </div>
            <button className='checkBoxs' type="sumbit">Guardar Cambios</button>
          </form>
        </div>
      )}
    
    </div>
  )
}
