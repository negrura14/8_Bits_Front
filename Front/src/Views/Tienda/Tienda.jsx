import React, { useEffect, useState } from "react";
import CardT from "../../Components/Card/CardT";
import "./Tienda.css";
import Pagination from "./Paginacion";
import { useDispatch, useSelector } from "react-redux";
import { getGame, getGenres, filterGamesAction } from "../../Redux/gameActions";
import LoadingPage from "../../Components/Loading/Loading";
import notSearch from "../../Img/Store/notSearch.png"

const itemsPerPage = 12;

function Tienda() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtDB, setFiltDB] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const dispatch = useDispatch();
  const { game, auxGames } = useSelector((state) => state.game);
  const { genre } = useSelector((state) => state.genre);
  const [filterSwitch, setFilterSwitch] = useState(false)

    // const searchParams = new URLSearchParams(location.search);

  // Obtiene el valor del parámetro 'platform' (puede ser 'sports', 'adventure', etc.)
  // let homeGenreFilter = searchParams.get('Genres');
  // console.log(homeGenreFilter)



  const [selectedFilters, setSelectedFilters] = useState({
    plat: "Sort By: Platforms",
    gen: "Sort By: Genre",
    pric: "Sort By: Price",
  });

  // console.log("ESTO SE CARGA A LA VARIABLE FILTDB: ", game[3]);


  if(filterSwitch === true) {
    useEffect(() => {
      setFilterSwitch(true);
      dispatch(getGame());
      dispatch(getGenres());
    }, [dispatch, setFilterSwitch]);
  } else {
    useEffect(() => {
      if(filterSwitch === false && game.length > 0) {
      const searchParams = new URLSearchParams(location.search);

        // Obtiene el valor del parámetro 'platform' (puede ser 'sports', 'adventure', etc.)
      let homeGenreFilter = searchParams.get('Genres');
      dispatch(getGenres());  
      setSelectedFilters({
        ...selectedFilters,
        gen: homeGenreFilter,
      });
      homeGenreFilter = false;
      // setFilterSwitch(true);
      } else {
      dispatch(getGenres());
      dispatch(getGame());
      setFilterSwitch(true);
      };    
    }, [dispatch]);
  }



  useEffect(() => {
    // Filtrar los juegos basados en filtDB y almacenarlos en filteredGames.
    const filteredGames = game.filter((gameItem) => {
      // Lógica de filtrado aquí en función de filtDB.
      // Puedes modificar esta lógica según tus necesidades.
      return gameItem.disable !== true;
    });

    // Establecer el estado de filteredGames y currentPage.
    setFilteredGames(filteredGames);
    setCurrentPage(1);
  }, [game, filtDB]);

  // console.log(game, "games");
  // console.log(auxGames, "auxGames");
  //** +++++++++++++++++++++++++++++++++++++++ SEPARACIÓN DE CODIGO ++++++++++++++++++++++++++++++++++++++++ */

  // const updateFiltersAndFetch = (newFilters) => {
  //   setFiltDB(newFilters);
  //   dispatch(filterGamesAction(filtDB.join('')));
  // };

  //** +++++++++++++++++++++++++++++++++++++++ SEPARACIÓN DE CODIGO ++++++++++++++++++++++++++++++++++++++++ */

  //funcionalidad para traer todas las plataformas que tenemos hasta el momento
  const uniquePlatforms = auxGames.reduce((platformsSet, game) => {
    if (game && game.SupportedPlatforms) {
      game.SupportedPlatforms.forEach((platform) => {
        platformsSet.add(platform.name);
      });
    }
    return platformsSet;
  }, new Set());

  const allPlatforms = Array.from(uniquePlatforms);

  //funcionalidad para mostrar únicamente los géneros que tienen los juegos

  const uniqueGenres = auxGames.reduce((genresSet, game) => {
    if (game && game.Genres) {
      game.Genres.forEach((genre) => {
        genresSet.add(genre.name);
      });
    }
    return genresSet;
  }, new Set());

  const allGenres = Array.from(uniqueGenres);

  //** +++++++++++++++++++++++++++++++++++++++ SEPARACIÓN DE CODIGO ++++++++++++++++++++++++++++++++++++++++ */

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleOfChange = (e, buttonFiler) => {
    let genre = '';
    

 

    if (buttonFiler !== "todo") {
      genre =  e.target.value;
      let newFilters = [];
      const indiceAReemplazar = filtDB.findIndex((str) =>
        str.includes(buttonFiler)
      );
      if (filtDB.length === 0) {
        newFilters = [`${buttonFiler}=${genre}`];
        // setFiltDB([...filtDB, `${buttonFiler}=${e.target.value}`])
      } else if (indiceAReemplazar !== -1) {
        const newFiltDB = [...filtDB];
        if (indiceAReemplazar === 0) {
          newFiltDB[indiceAReemplazar] = `${buttonFiler}=${genre}`;
        } else {
          newFiltDB[indiceAReemplazar] = `&${buttonFiler}=${genre}`;
        }
        newFilters = newFiltDB;

        // setFiltDB(newFiltDB);
      } else {
        newFilters = [...filtDB, `&${buttonFiler}=${genre}`];
      }
      // homeGenreFilter = false;
      setFiltDB((prevFiltDB) => newFilters);
      dispatch(filterGamesAction(newFilters.join("")));
    } else {
      // homeGenreFilter = false
      dispatch(getGame());
      setFiltDB([]); // seteo el estado donde almacenaba los estring para la url
    }
  };

  //** +++++++++++++++++++++++++++++++++++++++ SEPARACIÓN DE CODIGO ++++++++++++++++++++++++++++++++++++++++ */

  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  };
  // console.log(filteredGames, "filteredgames");

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

  // const nextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage((prevPage) => prevPage - 1);
  //   }
  // };
 
  const onPageChange = (n)=>{
    setCurrentPage(n)
  };
  const initial = currentPage * itemsPerPage - itemsPerPage + 1;
  const ending =
    currentPage * itemsPerPage < filteredGames.length
      ? currentPage * itemsPerPage
      : filteredGames.length;

  return (
    <div className="container">
      <div className="botones">
      <div className="row d-flex justify-content-center mt-2">

      <div className="col-md-3 col-sm-6">

        <select
          className="form-select bg-transparent text-white-50  m-2"
          onChange={(e) => {
            handleFilterChange(e);
            handleOfChange(e, "SupportedPlatforms");
          }}
          name="plat"
          value={selectedFilters.plat}
        >
          <option value="" hidden>
            {" "}
            Sort By: Platforms{" "}
          </option>
          {allPlatforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3 col-sm-6">

        <select
          className="form-select bg-transparent text-white-50  m-2"
          onChange={(e) => {
            handleFilterChange(e);
            handleOfChange(e, "Genres");
          }}
          name="gen"
          value={selectedFilters.gen}
        >
          <option value="" hidden>
            {" "}
            Sort By: Genre
          </option>
          {genre &&
            allGenres.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
      </div>

      <div className="col-md-3 col-sm-6">
        <select
          className="form-select bg-transparent text-white-50 m-2"
          onChange={(e) => {
            handleFilterChange(e);
            handleOfChange(e, "price");
          }}
          name="pric"
          value={selectedFilters.pric}
        >
          <option value="" hidden>
            {" "}
            Sort By: Price{" "}
          </option>
          <option value="Asc">Cheaper</option>
          <option value="Desc">Expensiver</option>
        </select>

      </div>

      <div className="col-md-3 col-sm-6">

        <button
          className="btn border-primary text-white-50  m-2"
          onClick={(e) => {
            setSelectedFilters({
              plat: "Sort By: Platforms",
              gen: "Sort By: Genre",
              pric: "Sort By: Price",
            });
            setFilterSwitch(true);
            handleOfChange(e, "todo");
          }}
        >
          Show: <span> All games</span>
        </button>
      </div>

      </div>
      </div>
      <div className="d-flex justify-content-center ">

      <span className="text-white mt-1">
          Items {initial}-{ending}
        </span>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        // onNextPage={nextPage}
        // onPrevPage={prevPage}
      />

      <div className=" cardFLex row d-flex justify-content-center">
        {filteredGames.length > 0 ? (
          getCurrentItems().map((game) => {
            return <CardT key={game.id} game={game} />;
          })
        ) : (
          <div className="cta-area ">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="cta-content bg-img background-overlay">
                    <div className="h-100 d-flex align-items-center justify-content-end row">
                      <img src={notSearch} className="notSearchImg col-6"/>
                      <div className=" col-6 filter--text">
                        <h2 className="fs-2">There is no games for the filters!</h2>
                        <h6 className="mb-5 fs-5">Please choose another one or reset filters 👇</h6>
                        <button
                          className="essence-btn aC"
                          onClick={(e) => {
                            setSelectedFilters({
                              plat: "Sort By: Platforms",
                              gen: "Sort By: Genre",
                              pric: "Sort By: Price",
                            });
                            handleOfChange(e, "todo");
                          }}
                        >
                          RESET FILTERS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        // onNextPage={nextPage}
        // onPrevPage={prevPage}
      />
    </div>
  );
}

export default Tienda;