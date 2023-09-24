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
    <div className='cajaEdit'>
      <div className='fontUpdate'>HAS INGRASADO AL UPDATEPRODUCTS</div>
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
              placeholder="Stock"
              id="typeNumber"
              type="number"
              name="stock"
              value={selectedGame.stock}
              onChange={(e) => setSelectedGame({ ...selectedGame, stock: e.target.value })}
              min="0"
              max="100"
              className="space"
            />
            <div className='imageTam'>
              <img src={selectedGame.image}/>
            </div>
            <div className="removes mb-3">
              {selectedGame.SupportedPlatforms.map((platform) => (
                <div className=" remove-div mb-1 " >
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
            <button className='checkBoxs' type="sumbit">Guardar Cambios</button>
          </form>
        </div>
      )}
    
    </div>
  )
}
