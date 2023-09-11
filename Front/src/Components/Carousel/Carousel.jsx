import React, { useState, useEffect }  from "react";
import { useSelector } from "react-redux";
import './Carousel.css'

function Carousel() {
    const { game } = useSelector(state => state.game);
    const [activeIndex, setActiveIndex] = useState(0);
  
    const getLowestPricedGames = (count) => {
      if (game.length === 0) {
        return [];
      }
  
      // Ordena los juegos por precio de menor a mayor
      const sortedGames = [...game].sort((a, b) => a.price - b.price);
      return sortedGames.slice(0, count); 
    };
  
    const lowestPricedGames = getLowestPricedGames(4);
    

    useEffect(() => {
        const interval = setInterval(() => {
          handleNextSlide();
        }, 3000); // Cambia el valor 5000 a la duración deseada en milisegundos
    
        return () => clearInterval(interval); // Limpia el temporizador al desmontar el componente
      }, [activeIndex]);
  
    const handlePrevSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + lowestPricedGames.length) % lowestPricedGames.length);
    };
  
    const handleNextSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % lowestPricedGames.length);
    };
  
    return (
      <div className="carousel-container">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {lowestPricedGames.map((game, index) => (
              <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                <img className="d-block  custom-image-size" src={game.image} alt={`Slide ${index}`} />
              </div>
            ))}
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={handlePrevSlide}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={handleNextSlide}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
  
  export default Carousel;

// function Carousel() {

// const { game } = useSelector(state => state.game);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const getLowestPricedGame = (count) => {
//     if (game.length === 0) {
//       return [];
//     }

//     // Ordena los juegos por precio de menor a mayor
//     const sortedGames = [...game].sort((a, b) => a.price - b.price);
//     return sortedGames.slice(0, count); 
//   };

//   const lowestPricedGame = getLowestPricedGame(4);

//   const handlePrevSlide = () => {
//     setActiveIndex((prevIndex) => (prevIndex - 1 + lowestPricedGame.length) % lowestPricedGame.length);
//   };

//   const handleNextSlide = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % lowestPricedGame.length);
//   };

//   return (
//     <div className="carousel-container">
//       <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
//         <div className="carousel-inner">
//           {lowestPricedGame.map((game, index) => (
//             <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
//               <img className="d-block w-100" src={game.image} alt={`Slide ${index}`} />
//             </div>
//           ))}
//         </div>
//         <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={handlePrevSlide}>
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="sr-only">Previous</span>
//         </a>
//         <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={handleNextSlide}>
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="sr-only">Next</span>
//         </a>
//       </div>
//     </div>
//   );

// }

// export default Carousel;
