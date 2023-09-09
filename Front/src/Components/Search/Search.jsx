import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { ROUTES } from "../../Helpers/RoutesPath";


function Search(){
    const dataByName = useSelector(state=>state.game.search);
    console.log(dataByName, "dataaaa");
    if(typeof(dataByName)=== "string"){
        return (
            <div>
              <div className='dontMatch' key="dontMatch">
                    <h4 className='letras'>{dataByName}</h4>
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