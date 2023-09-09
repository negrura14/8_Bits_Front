import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { ROUTES } from "../../Helpers/RoutesPath";
import dontMatch from "../../Img/dontMatch.jpg";




function Search(){
    const dataByName = useSelector(state=>state.game.search);
    console.log(dataByName, "dataaaa");
    if(typeof(dataByName)=== "string"){
        return (
            <div>
                <div>
                <div>
                <img src={dontMatch} width="200px" height="250"/> 
                </div>
                </div>
              <div className='dontMatch' key="dontMatch">
              <h3 className='letras'>{dataByName}</h3>
                   
                </div>  
            </div>
    
          )  
    }else{
        return(
            <div>
                {dataByName&&dataByName.map((elem, i)=>{
                    return(
                        <div>
                            <Link to={`${ROUTES.DETAIL}/${elem.id}`}>
                                <div>
                                    <img src={elem.image} width="250px" height="200"/>
                                    <h3>{elem.name}</h3>
                                </div>
                            </Link>

                        </div>
                    )
                })}
                
            </div>
        )
    }
    
};

export default Search;