import React, { Component } from "react";
import Slider from "react-slick";
import { NavLink} from 'react-router-dom';
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import "./Carousel.css"


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      
    };
    return (
      <div>
        <Slider  {...settings}>

        <div className="welcome_area bg-img background-overlay slider1" key={1}>
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
        </div>
    <div className="welcome_area bg-img background-overlay slider2" key={2}>
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-12 align-items-center d-flex justify-content-center ">
                    <div className="hero-content text-center  d-flex  align-items-center">
          
                        <p className=" fs-1 text-white tc2">Forget your problems with our games as solutions.</p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="welcome_area bg-img background-overlay slider3" key={3}>
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <div className="hero-content d-flex justify-content-end">
                    <div>
                        <h6>Not just a game, but a world.</h6>
                        <h2 className="text-end">Store</h2>
                        <NavLink className='btn essence-btn aC' onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE}>View Collection</NavLink>
                    </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
        </Slider>
      </div>
    );
  }
}