import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './SearchBard.css';
import { getGamesName } from "../../Redux/gameActions";
import {useNavigate} from "react-router-dom";
import { ROUTES } from "../../Helpers/RoutesPath";

export default function SearchBar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState('');


    function handleChange(event){
        setState(event.target.value)
    };

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getGamesName(state));
        navigate(`${ROUTES.SEARCH}`);
        setState('');
    };

    return(
        <div className="search-area">
                    <form action="#" method="post" onSubmit={event => handleSubmit(event)}>
                        <input type="search" name="search" id="headerSearch" placeholder="Type for search" value = {state} onChange={handleChange}/>
                        <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                    </form>
                </div>
    )
}