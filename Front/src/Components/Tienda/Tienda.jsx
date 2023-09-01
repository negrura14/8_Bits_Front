import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../Card/Card';
import './Tienda.css';
import Pagination from './Paginacion';


function Tienda() {
  const [ cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredGames, setFilteredGames] = useState([]);
  const itemsPerPage = 15;
  useEffect(() => {
    return async () => {
      try {
        const {data}  = await axios("http://localhost:3001/pokemonsapi/pokemons");
        setCards(data)
        } catch (error) {
            console.error("No se pudo obtener la información de los pokemons:", error);
        }
    };
  }, [] );

  useEffect(() => {
    setFilteredGames(cards);
    setCurrentPage(1); // Restablecer la página a 1 al cambiar los Pokémon filtrados.
}, [cards]);


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

  return (
    <>
      <div className='botones'>
        <span className='items'>items </span>
        <button className='xBoton'>Sort By: <span className='xSpan'> Rating </span> </button>
        <button className='xBoton'>Sort By: <span className='xSpan'> Gender </span> </button>
        <button className='xBoton'>Sort By: <span className='xSpan'> Position </span> </button>
        <button className='xBoton'>Show: <span className='xSpan'> 15 per page</span> </button>
      </div>
      <div className='cardFLex'>
                {getCurrentItems().map((game) => {
                    return <Card key={game.id}
                    id= {game.id} 
                    nombre= {game.nombre}
                    tipo={game.types} 
                    imagen= {game.imagen}
                    types= {game.types}
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