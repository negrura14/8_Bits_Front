import axios from 'axios';
import { getAllGame, getGameById, getGameByName } from './gameSlice';

export const getGame = () => async  (dispatch) =>{
    try {
        const response = await axios.get("https://rickandmortyapi.com/api/character");
        dispatch(getAllGame(response.data.results));
      } catch (error) {
        window.alert("Request failed:", error);
      }
}

export const getGamesById = (id) => async (dispatch) =>{ 
    try {
        let response = await axios.get(`https://rickandmortyapi.com/api/character${id}`);
        dispatch(getGameById(response.data));
      } catch (error) {
        window.alert("Request failed:", error);
      }
}

export const getGamesByName = (name) => async (dispatch) =>{ 
  try {
      let response = await axios.get(`https://rickandmortyapi.com/api/character${name}`);
      dispatch(getGameByName(response.data));
    } catch (error) {
      window.alert("Request failed:", error);
    }
}

