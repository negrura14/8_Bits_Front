import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import CardT from '../Card/CardT';
import './Tienda.css';
import Pagination from './Paginacion';
import { useDispatch, useSelector } from 'react-redux'
import { getGame, getGenders, filterGamesAction } from '../../Redux/gameActions'

function Tienda() {
  const [ cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredGames, setFilteredGames] = useState([]);
  const itemsPerPage = 15;
  const [filtDB, setFiltDB ] = useState([])
  const dispatch = useDispatch()
  const {game} = useSelector(state=>state.game)
  const {genre} = useSelector((state) => state.gender);
  const url = [...filtDB];
console.log("ESTO ES LO QUE MUESTRA GENDER:", [...filtDB]);

  useEffect(()=>{
      dispatch(getGame())
      dispatch(getGenders())
      dispatch(filterGamesAction(url))
      setCards(game);
      setFilteredGames(cards);
      setCurrentPage(1); // Restablecer la página a 1 al cambiar los Pokémon filtrados.
  },[game, cards, url])
  

 

  const handleOfChange = (e, buttonFiler) => {
    if(buttonFiler !== 'todo'){
      const indiceAReemplazar = filtDB.findIndex((str) => str.includes(buttonFiler));
      if(filtDB.length === 0){
        setFiltDB([...filtDB, `${buttonFiler}=${e.target.value}`])
      }
      else if(indiceAReemplazar !== -1){
        const newFiltDB = [...filtDB];
        if(indiceAReemplazar === 0){
          newFiltDB[indiceAReemplazar] = `${buttonFiler}=${e.target.value}`;
        }
        else{
          newFiltDB[indiceAReemplazar] = `&${buttonFiler}=${e.target.value}`;
        }
        setFiltDB(newFiltDB);
      }
      else {
        setFiltDB([...filtDB, `&${buttonFiler}=${e.target.value}`]);
      }
    }
    else {
      setCards(game);
      console.log("esto pasa cuando presiono el boton: ", cards);
    }
  }



  // Función para obtener los elementos correspondientes a la página actual.
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);


  // Función para cambiar a la siguiente página.
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Función para cambiar a la página anterior.
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const initial = ((currentPage * itemsPerPage)-itemsPerPage) + 1;
  const ending = (currentPage * itemsPerPage) < cards.length ? (currentPage * itemsPerPage) : cards.length;
  return (
    <>
      <div className='botones'>
        <span className='items'>items {initial}-{ending}</span>
        <select className='xBoton'onChange={(e) => handleOfChange(e, 'rating')}> 
          <option value='' hidden> Sort By: Rating </option>
          <option value="tres">Tres Estrellas</option>
          <option value="cuatro">Cuatro Estrellas</option>
          <option value="cinco">Cinco Estrellas</option>
        </select>
        <select className='xBoton'onChange={(e) => handleOfChange(e, 'gender')}>
          <option value='' hidden> Sort By: Gender</option>
          <option value="allRating">Todos los Tipos</option>
          {genre && genre.map(type => (
              <option key={type.id} value={type.name}> 
                  {type.name}
              </option>
          ))}
        </select>
        <select className='xBoton'onChange={(e) => handleOfChange(e, 'price')}> 
          <option value='' hidden> Sort By: Price </option>
          <option value="Asc">Ascendente</option>
          <option value="Desc">Descendente</option>
        </select>
        <button className='xBoton'onClick={(e) => handleOfChange(e, 'todo')}>Show: <span className='xSpan'> 15 per page</span> </button>
      </div>
      <div className='cardFLex'>
                {getCurrentItems().map((game) => {
                    return <CardT 
                    key={game.id}
                    game={game}
                    />
                })}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={nextPage}
                onPrevPage={prevPage}
            />
    </>
  )
}

export default Tienda