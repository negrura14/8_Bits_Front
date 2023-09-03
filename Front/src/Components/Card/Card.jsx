import './Card.css'
import {Link} from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGame } from '../../Redux/gameActions'


function Card () {
    const dispatch = useDispatch()
    const {game} = useSelector(state=>state.game)

    useEffect(()=>{
        dispatch(getGame())
    },[])

  return (
    <div className='containerF'>
        {game&&game.map((elem, i)=>{
            return(
                <div class="item" key={i}>
    <div className="cardF" >
      <div className="circle circle2"></div>
      <div className="circle circle1"></div>
      <img  className="imgF" src={elem.image} />
    </div>
    <div className="content">
      <p>{elem.name}</p>
    </div>
    <span class="top"></span>
      <span class="right"></span>
      <span class="bottom"></span>
      <span class="left"></span>
  </div>
            )
        })}
        
    </div>
  )
}






// function Card(props) {
//    const{id, nombre, imagen, types}= props; //Estoy haciendo un distroctoring al props
//     return (
//         <div className='cardPoke'>
//             <Link className='namePoke' to={`/detail/${id}`}>
//                 <h2 className='text'>{nombre}</h2>
//             </Link>
//             <img className='img' src={imagen} alt='' />
//             <div className='{style.ss}'> 
//                 <h2 className='typeText'>
                    
//                     {types && types.map((type, index) => (
//                         <span key={index} className='type'>
//                             {type.name}
//                             {index !== types.length - 1 && 
//                             <span className='typeSeparator'>{" "}-{" "}</span>}
//                         </span>
//                     ))}
//                 </h2>
//             </div>
//         </div>
//     );
// };
export default Card;
