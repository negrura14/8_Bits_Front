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
        <form className=" d-flex" onSubmit={event => handleSubmit(event)}>
            <input className="input_searchBar " type = 'text' placeholder="Enter Name" value = {state} onChange={handleChange}/>
            <button className="btn_searchBar" type="submit"><i className="fas fa-search"></i></button>
        </form>
    )
}