import './Home.css';
import DateTimeDisplay from '../Time/Time'
import Card from '../Card/Card';
import { useDispatch } from 'react-redux';
import { getGame } from '../../Redux/gameActions';
import React, { useEffect } from 'react';



function Home() {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getGame())
      },[]) 
    
      return(
        <div className='home_container'>
            <div>
                <Card/>
             
            </div>
            

            
        </div>
    )
    

    
}

export default Home;