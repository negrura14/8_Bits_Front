import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './SearchBar.css';
import { getGamesByName } from "../../Redux/gameActions";

export default function SearchBar(){

    const dispatch = useDispatch();
    const [state, setState] = useState('');


    function handleChange(event){
        event.preventDefault()
        setState(event.target.value)
        if(event.target.value === ''){
            dispatch(getGamesByName(''))
        }
    };

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getGamesByName(state))
        setState('');
    };

    return(
        <form className="form_searchBar" onSubmit={event => handleSubmit(event)}>
            <input className="input_searchBar" type = 'text' placeholder="Enter Name" value = {state} onChange={handleChange}/>
            <button className="btn_searchBar" type="submit">Search</button>
        </form>
    )
}