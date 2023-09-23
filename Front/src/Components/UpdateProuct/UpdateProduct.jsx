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
    console.log("resultado del submit: ", selectedGame);
    axios.post()
  }



  return (
    <>
      <div className='fontUpdate'>HAS INGRASADO AL UPDATEPRODUCTS</div>
      <input
        type="text"
        value={searchInput}
        onChange={onSearchInputChange}
        placeholder="Buscar juegos..."
      />
      {/* <ul>
        {filteredGames.map((game, index) => (
          <li key={index} onClick={() => onSelectGame(game)}>
            {game.name}
          </li>
        ))}
      </ul>
      <select name="" id="">
      {filteredGames.map((game, index) => (
              <option key={index} onClick={() => onSelectGame(game)}>
                {game.name}
              </option>
            ))}
      </select> */}
      <select
        className='fontUpdate'
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
          <h2>Editar Juego: {selectedGame.name}</h2>
          <form onSubmit={(event) => sumbitHandler(event)}>
            <input
              type="text"
              value={selectedGame.name}
              onChange={(e) => setSelectedGame({ ...selectedGame, name: e.target.value })}
              placeholder="Nombre del juego"
            />
            <input
              type="text"
              value={selectedGame.description}
              onChange={(e) => setSelectedGame({ ...selectedGame, description: e.target.value })}
              placeholder="Descripción del juego"
            />
            <button type="sumbit">Guardar Cambios</button>
          </form>
        </div>
      )}
    
    </>
  )
}
