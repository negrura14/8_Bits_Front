import React, { useEffect, useState } from 'react'
import './UpdateProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import { getGame } from '../../Redux/gameActions';
import axios from 'axios';

export const UpdateProduct = () => {
  const [searchInput, setSearchInput ] = useState('');
  const [selectedGame, setSelectedGame] = useState(null); // Estado para el juego seleccionado
  const { game } = useSelector(state => state.game);
  const dispatch = useDispatch();
  // console.log("ESTO ME ESTA TRAYENDO GAME DENTRO DEL COMPONENTE UP: ", searchInput);

  useEffect(() => {
    dispatch(getGame());
  }, [dispatch]);

  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setSelectedGame(null); // Al cambiar la búsqueda, deselecciona cualquier juego seleccionado
    console.log("ESTO ME ESTA TRAYENDO GAME DENTRO DEL COMPONENTE UP: ", searchInput);
  }

  const filteredGames = game.filter(game => {
    return game.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  const onSelectGame = (game) => {
    setSelectedGame(game);
  }
  
  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log("resultado del submit: ", selectedGame.id, selectedGame);
    // axios.put("/games/putGame", selectedGame)
    axios.put(`/games/${selectedGame.id}`, selectedGame)
  }



  return (
    <div className='cajaEdit login-box'>
      <h2 className='mb-3' >Update Products</h2>
      <div className='d-flex row justify-content-center mb-3'>
      <div className='col-10 mb-4'>

      <input
        type="text"
        value={searchInput}
        onChange={onSearchInputChange}
        placeholder="Buscar juegos..."
        className="form-control bg-transparent text-white "
      />
      </div>
      <div className='col-10 bg-transparent'>

      <select
        className="form-select bg-transparent text-white-50"
        value={selectedGame ? selectedGame.name : ''}
        onChange={(e) => {
          const selectedGameName = e.target.value;
          const selectedGame = filteredGames.find(game => game.name === selectedGameName);
          setSelectedGame(selectedGame);
        }}
        multiple
      >
        <option className='bg-transparent' value="">Selecciona un juego</option>
        {filteredGames.map((game, index) => (
          <option className='bg-transparent' key={index} value={game.name}>
            {game.name}
          </option>
        ))}
      </select>
      </div>
      </div>

      
      

      {selectedGame && (
        <div>
          <h2 className='mb-3' >Editar Juego:</h2>
          <form onSubmit={(event) => sumbitHandler(event)} className=''>
          <div className='row d-flex justify-content-center'>

          <div className='col-10 mb-3 mx-2'>

            <input
              className="form-control bg-transparent text-white"
              type="text"
              value={selectedGame.name}
              onChange={(e) => setSelectedGame({ ...selectedGame, name: e.target.value })}
              placeholder="Nombre del juego"
            />
          </div>

          <div className='col-10 mb-3 mx-2'>
            <input
              className="form-control bg-transparent text-white"
              type="text"
              value={selectedGame.description}
              onChange={(e) => setSelectedGame({ ...selectedGame, description: e.target.value })}
              placeholder="Descripción del juego"
            />

          </div>

          <div className='col-10 mb-3 mx-2'>

            <input
              placeholder="Stock"
              id="typeNumber"
              type="number"
              name="stock"
              value={selectedGame.stock}
              onChange={(e) => setSelectedGame({ ...selectedGame, stock: e.target.value })}
              min="0"
              max="100"
              className="form-control bg-transparent text-white"
            />
          </div>
          <div className='col-10'> 
          <div className='row d-flex justify-content-center '>

            <div className='imageTam col-6'>
              <img src={selectedGame.image}/>
            </div>
            <div className="p-5 mb-3 col-6">
            <div className='removes'>
            {selectedGame.SupportedPlatforms.map((platform) => (
                <div className='remove-div mb-1' >
                  <span className="remove-span">{platform.name}</span>
                  <a
                    className="remove-button"
                    type="button"
                    // onClick={(e) => setSelectedGame({ ...selectedGame, stock: e.target.value })}
                  >
                    X
                  </a>
                </div>
              ))}
            </div>
            <div className="checkBoxs">
              <input
                type="checkbox"
                checked= {true}
                onChange={(e) => setSelectedGame({ ...selectedGame, description: e.target.value })}
                className=""
              />
            </div>
              
            </div>
          </div>
            <div>

            <button className='checkBoxs' type="sumbit">Guardar Cambios</button>
            </div>
          </div>
          </div>
          </form>
        </div>
      )}
    
    </div>
  )
}
