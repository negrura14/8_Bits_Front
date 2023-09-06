import axios from 'axios';
import { getAllGame, getGameById, getGameByName, filterGames } from './gameSlice';
import { getAllGenders } from './genderSlice';


export const getGame = () => async  (dispatch) =>{
  try {
      const response = await axios("/games");
    //  return dispatch({type: getAllGame, payload: response.data});
      return dispatch(getAllGame(response.data));
    } catch (error) {
      window.alert("Request failed:", error);
    }
}

export const getGamesId = (id) => async (dispatch) =>{ 
    try {
        const response = await axios(`/games/${id}`);
        return dispatch(getGameById(response.data));
      } catch (error) {
        window.alert("Request failed:", error);
      }
}

export const getGamesName = (name) => async (dispatch) =>{ 
  try {
      let response = await axios.get(`/games/?name=${name}`);
      return dispatch(getGameByName(response.data));
    } catch (error) {
      window.alert("Request failed:", error);
    }
}

export const getGenders = () => async (dispatch) =>{ 
  try {
      const response = await axios("/gender");
      return dispatch(getAllGenders(response.data));
    } catch (error) {
      window.alert("Request failed:", error);
    }
}

export const filterGamesAction = (url) => async(dispatch) =>{
  try {
    const response = await axios.get(`/games/filter?${url}`);
    return dispatch(filterGames(response.data));
  } catch (error) {
    window.alert("Request failed:", error);
  }
}
