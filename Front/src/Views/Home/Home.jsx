import "./Home.css";
import { useDispatch, useSelector } from 'react-redux';
import { getGame } from '../../Redux/gameActions';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../../Components/Loading/Loading'
import brandEA from "../../Img/brands/1200px-The_EA_Sports_Logo(Beta)_For_EA_SPORTS_Inc..svg.png"
import brandActivision from "../../Img/brands/Activision-logo.png"
import brandNintendo from "../../Img/brands/Nintendo_red_logo.svg.png"
import brandUbisoft from "../../Img/brands/Ubisoft_logo.svg.png"
import brandPs from "../../Img/brands/pslogo.tmp_.webp"
import brandXbox from "../../Img/brands/xbox-logo-3.png"
import { NavLink} from 'react-router-dom';
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import CardT from "../../Components/Card/CardT";




function Home() {

    // const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);


  const dataByName = useSelector((state) => state.game.search);
  const { game } = useSelector(state => state.game);

  useEffect(() => {
    dispatch(getGame());
  }, [dispatch]);
  
    const getLowestPricedGames = (count) => {
      if (game.length === 0) {
        return [];
      }
  
      // Ordena los juegos por precio de mayor a menor
      const sortedGames = [...game].sort((a, b) => a.price - b.price);
      return sortedGames.slice(0, count); 
    };
  
    const lowestPricedGames = getLowestPricedGames(3);
    
    
    useEffect(()=>{
        dispatch(getGame())
        .then (()=>{
            setLoading(false);
        })
        .catch((error) => {
            alert('Error loading cards', error);
            setLoading(false);
        })
      },[dispatch]) 
      
      if (loading){
        return(
            <div> 
                <LoadingPage/>
            </div>
        )
      } else {
        return(

        
            <> 
            
    <section className="welcome_area bg-img background-overlay" >
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <div className="hero-content">
                        <h6>Immerse yourself in the gaming world!</h6>
                        <h2>Store</h2>
                        <NavLink className='btn essence-btn aC' onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE}>View Collection</NavLink>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    

    
    <div className="top_catagory_area section-padding-80 clearfix">
        <div className="container">
            <div className="row justify-content-center">
                
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img sportsC">
                        <div className="catagory-content">
                            <a className="aC" href="#">Sports</a>
                        </div>
                    </div>
                </div>
               
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img rpgC" >
                        <div className="catagory-content">
                            <a className="aC" href="#">RPG</a>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img adventureC" >
                        <div className="catagory-content">
                            <a className="aC" href="#">Adventure</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="cta-area ">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="cta-content bg-img background-overlay aboutB" >
                        <div className="h-100 d-flex align-items-center justify-content-end">
                            <div className="cta--text">
                                <h6>Learn more</h6>
                                <h2>About Us</h2>
                                <NavLink className='btn essence-btn aC' onClick={() => window.scrollTo(0, 0)} to={ROUTES.ABOUT}>See More</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="container mt-4 ">
      <h2 className="p-2 text-secondary">Cheap collection</h2>
            <div className=' cardFLex row'>
                {lowestPricedGames.map((game) => {
                    return <CardT 
                    key={game.id}
                    game={game}
                    />
                })}
            </div>
      </div>
                
    <div className="brands-area d-flex align-items-center justify-content-between section-padding-80">
        
        <div className="single-brands-logo">
            <img src={brandEA} alt=""/>
        </div>
        
        <div className="single-brands-logo">
            <img src={brandUbisoft} alt=""/>
        </div>
        
        <div className="single-brands-logo">
            <img src={brandXbox} alt=""/>
        </div>
        
        <div className="single-brands-logo">
            <img src={brandActivision} alt=""/>
        </div>
        
        <div className="single-brands-logo">
            <img src={brandNintendo} alt=""/>
        </div>
        
        <div className="single-brands-logo">
            <img src={brandPs} alt=""/>
        </div>
    </div>
                
                
            </>
        )
      }
    

    
}

export default Home;