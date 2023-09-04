import './CardT.css'
import {Link} from 'react-router-dom'
import React, { useEffect } from 'react'
import { ROUTES } from '../../Helpers/RoutesPath'


function Card (props) {
const {game} = props;
    return (    
        <div className='containerF'>
                {/* {game&&game.map((elem, i)=>{ */}
                    {/* return( */}
            <div className="item" key={game.id}>
                <div className="cardF" >
                    <div className="circle circle2"></div>
                    <div className="circle circle1"></div>
                    <img  className="imgF" src={game.image} />
                </div>
                <div className="content">
                    <p>{game.name}</p>
                </div>
                <span className="top"></span>
                <span className="right"></span>
                <span className="bottom"></span>
                <span className="left"></span>
            </div>
                {/* ) */}
            {/* })} */}
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
