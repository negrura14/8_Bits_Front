import './Home.css';
import DateTimeDisplay from '../Time/Time'
import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getGame } from '../../Redux/gameActions';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../Loading/Loading'



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
                <Card/>
            </div>
        )
      }
    

    
}

export default Home;