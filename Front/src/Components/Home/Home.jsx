import './Home.css';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getGame } from '../../Redux/gameActions';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../Loading/Loading'
import SmallNav from '../SmallNav/SmallNav';



function Home() {

    // const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    
    
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

        
            <div className='home_container'> 
                <div className='carousel-box'>
                    <h2 className="p-2 text-secondary">Cheap Games</h2>
                    <Carousel/>
                </div>
                
                
            </div>
        )
      }
    

    
}

export default Home;