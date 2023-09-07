import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './SearchBard.css';
import { getGamesName } from "../../Redux/gameActions";

export default function SearchBar(){

    const dispatch = useDispatch();
    const [state, setState] = useState('');


    function handleChange(event){
        setState(event.target.value)
    };

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getGamesName(state))
        setState('');
    };

    return(
        <form className=" d-flex" onSubmit={event => handleSubmit(event)}>
            <input className="input_searchBar " type = 'text' placeholder="Enter Name" value = {state} onChange={handleChange}/>
            <button className="btn_searchBar" type="submit"><i class="fas fa-search"></i></button>
        </form>
    )
}