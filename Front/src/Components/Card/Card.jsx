import './Card.css'
import {Link} from 'react-router-dom'



function Card(props) {
   const{id, nombre, imagen, types}= props; //Estoy haciendo un distroctoring al props
    return (
        <div className='cardPoke'>
            <Link className='namePoke' to={`/detail/${id}`}>
                <h2 className='text'>{nombre}</h2>
            </Link>
            <img className='img' src={imagen} alt='' />
            <div className='{style.ss}'> 
                <h2 className='typeText'>
                    
                    {types && types.map((type, index) => (
                        <span key={index} className='type'>
                            {type.name}
                            {index !== types.length - 1 && 
                            <span className='typeSeparator'>{" "}-{" "}</span>}
                        </span>
                    ))}
                </h2>
            </div>
        </div>
    );
};
export default Card;