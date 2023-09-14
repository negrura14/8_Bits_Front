// import React, { useEffect, useState } from 'react';
// import CardT from '../Card/CardT';
// import './Tienda.css';
// import Pagination from './Paginacion';
// import { useDispatch, useSelector } from 'react-redux';
// import { getGame, getGenders, filterGamesAction } from '../../Redux/gameActions';

// function Tienda() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15;
//   const [filtDB, setFiltDB] = useState([]);

//   const dispatch = useDispatch();
//   const [aux, setAux] = useState(false);
//   const { game } = useSelector((state) => state.game);
//   const { genre } = useSelector((state) => state.gender);

//   useEffect(() => {
//     dispatch(getGame());
//     dispatch(getGenders());
//   }, [dispatch]);

//   useEffect(() => {
//     // Filtrar los juegos basados en filtDB y almacenarlos en filteredGames.
//     const filteredGames = game.filter((gameItem) => {
//       // Lógica de filtrado aquí en función de filtDB.
//       // Puedes modificar esta lógica según tus necesidades.
//       return true;
//     });

//     // Establecer el estado de filteredGames y currentPage.
//     setFilteredGames(filteredGames);
//     setCurrentPage(1);
//   }, [game, filtDB]);

//   const [filteredGames, setFilteredGames] = useState([]);

//   let url = '';
//   const handleOfChange = (event) => {
//     const filter = event.target.value;
    
//     console.log(filtDB.length + 'filtDBasd');
//     console.log(filtDB + 'filtDB');
//     if(filtDB.length > 0) {
//       setFiltDB(filtDB + '&' + filter); 
//       console.log(filtDB);
//       dispatch(filterGamesAction(filtDB));
//       setAux(!aux);
//     } else {
//       setFiltDB(filter)
//       console.log(filtDB)
//       dispatch(filterGamesAction(filtDB));
//       setAux(!aux);
//     }
//     // console.log(filtDB + 'posta');
//     // dispatch(filterGamesAction(filtDB));
//     // setAux(!aux);
//     // Lógica para actualizar filtDB en función de los filtros seleccionados.
//     // Asegúrate de actualizar filtDB de manera adecuada.
//   };

//   const getCurrentItems = () => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     return filteredGames.slice(indexOfFirstItem, indexOfLastItem);
//   };

//   const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const initial = ((currentPage * itemsPerPage) - itemsPerPage) + 1;
//   const ending = (currentPage * itemsPerPage) < filteredGames.length ? (currentPage * itemsPerPage) : filteredGames.length;


//   return (
//     <>
//       <div className='botones'>
//         <span className='items'>items {initial}-{ending}</span>
//         <select className='xBoton'onChange={handleOfChange}> 
//           <option value='' hidden> Sort By: Rating </option>
//           <option value="tres">Tres Estrellas</option>
//           <option value="cuatro">Cuatro Estrellas</option>
//           <option value="cinco">Cinco Estrellas</option>
//         </select>
//         <select className='xBoton'onChange={handleOfChange}>
//           <option value='' hidden> Sort By: Gender</option>
//           <option value="allRating">Todos los Tipos</option>
//           {genre && genre.map(type => (
//               <option key={type.id} value={'genre='+type.name}> 
//                   {type.name}
//               </option>
//           ))}
//         </select>
//         <select className='xBoton'onChange={handleOfChange}> 
//           <option value='' hidden> Sort By: Price </option>
//           <option value="price=Asc">Ascendente</option>
//           <option value="price=Desc">Descendente</option>
//         </select>
//         <button className='xBoton'onClick={(e) => handleOfChange(e, 'todo')}>Show: <span className='xSpan'> 15 per page</span> </button>
//       </div>
//       <div className='cardFLex'>
//                 {getCurrentItems().map((game) => {
//                     return <CardT 
//                     key={game.id}
//                     game={game}
//                     />
//                 })}
//             </div>
//             <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onNextPage={nextPage}
//                 onPrevPage={prevPage}
//             />
//     </>
//   )
// }

// export default Tienda


import React, { useEffect, useState } from 'react';
import CardT from '../../Components/Card/CardT';
import './Tienda.css';
import Pagination from './Paginacion';
import { useDispatch, useSelector } from 'react-redux';
import { getGame, getGenders, filterGamesAction } from '../../Redux/gameActions';
import LoadingPage from '../../Components/Loading/Loading';


const itemsPerPage = 12;

function Tienda() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtDB, setFiltDB] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const dispatch = useDispatch();
  const { game } = useSelector((state) => state.game);
  const { genre } = useSelector((state) => state.gender);

  // console.log("ESTO SE CARGA A LA VARIABLE FILTDB: ", game[3]);

  useEffect(() => {
    dispatch(getGame());
    dispatch(getGenders());
  }, [dispatch]);

  useEffect(() => {
    // Filtrar los juegos basados en filtDB y almacenarlos en filteredGames.
    const filteredGames = game.filter((gameItem) => {
      // Lógica de filtrado aquí en función de filtDB.
      // Puedes modificar esta lógica según tus necesidades.
      return true;
      
    });

    // Establecer el estado de filteredGames y currentPage.
    setFilteredGames(filteredGames);
    setCurrentPage(1);
  }, [game, filtDB]);

//** +++++++++++++++++++++++++++++++++++++++ SEPARACIÓN DE CODIGO ++++++++++++++++++++++++++++++++++++++++ */

  // const updateFiltersAndFetch = (newFilters) => {
  //   setFiltDB(newFilters);
  //   dispatch(filterGamesAction(filtDB.join('')));
  // };


//** +++++++++++++++++++++++++++++++++++++++ SEPARACIÓN DE CODIGO ++++++++++++++++++++++++++++++++++++++++ */
  
  //funcionalidad para traer todas las plataformas que tenemos hasta el momento
  const uniquePlatforms = game.reduce((platformsSet, game) => {
    game.supportedPlatforms.forEach((platform) => {
      platformsSet.add(platform);
    });
    return platformsSet;
  }, new Set());

  const allPlatforms = Array.from(uniquePlatforms);

  //console.log(allPlatforms);

  //funcionalidad para mostrar únicamente los géneros que tienen los juegos
  
  const uniqueGenres = game.reduce((genresSet,game) => {
    game.genre.forEach((genre) => {
      genresSet.add(genre);
    });
    return genresSet;
  }, new Set());

  const allGenres = Array.from(uniqueGenres);
  
  
//** +++++++++++++++++++++++++++++++++++++++ SEPARACIÓN DE CODIGO ++++++++++++++++++++++++++++++++++++++++ */



  const handleOfChange = (e, buttonFiler) => {
    if(buttonFiler !== 'todo'){
      let newFilters = [];
      const indiceAReemplazar = filtDB.findIndex((str) => str.includes(buttonFiler));
      if(filtDB.length === 0){
        newFilters = [`${buttonFiler}=${e.target.value}`];
        // setFiltDB([...filtDB, `${buttonFiler}=${e.target.value}`])
      }
      else if(indiceAReemplazar !== -1){
        const newFiltDB = [...filtDB];
        if(indiceAReemplazar === 0){
          newFiltDB[indiceAReemplazar] = `${buttonFiler}=${e.target.value}`;
        }
        else{
          newFiltDB[indiceAReemplazar] = `&${buttonFiler}=${e.target.value}`;
        }
        newFilters = newFiltDB;
        
        // setFiltDB(newFiltDB);
      }
      else {
        newFilters = [...filtDB, `&${buttonFiler}=${e.target.value}`];
      }
      setFiltDB((prevFiltDB) => newFilters);
      dispatch(filterGamesAction(newFilters.join('')));
    }
    else {
      dispatch(getGame());
      setFiltDB([]); // seteo el estado donde almacenaba los estring para la url
      
    }
  }



//** +++++++++++++++++++++++++++++++++++++++ SEPARACIÓN DE CODIGO ++++++++++++++++++++++++++++++++++++++++ */
 

  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const initial = ((currentPage * itemsPerPage) - itemsPerPage) + 1;
  const ending = (currentPage * itemsPerPage) < filteredGames.length ? (currentPage * itemsPerPage) : filteredGames.length;


  return (
    <div className='container'>
      <div className='botones'>
        <span className='items'>items {initial}-{ending}</span>
        <select className='xBoton'onChange={(e) => handleOfChange(e, 'supportedPlatforms')}> 
          <option value='' hidden> Sort By: Platforms </option>
          {/* <option value="Nintendo"> Nintendo Switch </option>
          <option value="Wii"> Wii U </option>
          <option value="PlayStation"> PlayStation 4 </option>
          <option value="PC"> PC </option> */}
          {allPlatforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
        </select>
        <select className='xBoton'onChange={(e) => handleOfChange(e, 'genre')}>
          <option value='' hidden> Sort By: Gender</option>
          {genre && allGenres.map(type => (
              <option key={type} value={type}> 
                  {type}
              </option>
          ))}
        </select>
        <select className='xBoton'onChange={(e) => handleOfChange(e, 'price')}> 
          <option value='' hidden> Sort By: Price </option>
          <option value="Asc">Ascendente</option>
          <option value="Desc">Descendente</option>
        </select>
        <button className='xBoton'onClick={(e) => handleOfChange(e, 'todo')}>Show: <span className='xSpan'> All games</span> </button>
      </div>
      <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={nextPage}
                onPrevPage={prevPage}
            />
      <div className=' cardFLex row'>
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
    </div>
  )
}

export default Tienda