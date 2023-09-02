import axios from 'axios';
import { getAllGame, getGameById } from './gameSlice';

export const getGame = () => async  (dispatch) =>{
    try {
        const response = await axios.get("https://rickandmortyapi.com/api/character");
        dispatch(getAllGame(response.data.results));
      } catch (error) {
        window.alert("Error en la solicitud:", error);
      }
}

export const getGamesById = () => async (dispatch) =>{ 
    try {
        let response = await axios.get(`https://rickandmortyapi.com/api/character${id}`);
        dispatch(getGameById(response.data));
      } catch (error) {
        window.alert("Error en la solicitud:", error);
      }
}

