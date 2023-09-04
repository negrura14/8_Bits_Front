import axios from 'axios';
import { getAllGame, getGameById, getGameByName, filterGames } from './gameSlice';
import { getAllGenders } from './genderSlice';

// export const getGame = () => async  (dispatch) =>{
//     try {
//         const response = await axios.get("http://localhost:3001/games");
//         dispatch(getAllGame(response.data));
//       } catch (error) {
//         window.alert("Request failed:", error);
//       }
// }

export const getGame = () => async  (dispatch) =>{
  try {
      const response = await axios("http://localhost:3001/games");
    //  return dispatch({type: getAllGame, payload: response.data});
      return dispatch(getAllGame(response.data));
    } catch (error) {
      window.alert("Request failed:", error);
    }
}

export const getGamesId = (id) => async (dispatch) =>{ 
    try {
        const response = await axios(`http://localhost:3001/games/${id}`);
        return dispatch(getGameById(response.data));
      } catch (error) {
        window.alert("Request failed:", error);
      }
}

export const getGamesByName = (name) => async (dispatch) =>{ 
  try {
      let response = await axios.get(`http://localhost:3001/games?=${name}`);
      dispatch(getGameByName(response.data));
    } catch (error) {
      window.alert("Request failed:", error);
    }
}

export const getGenders = () => async (dispatch) =>{ 
  try {
      const response = await axios("http://localhost:3001/gender");
      return dispatch(getAllGenders(response.data));
    } catch (error) {
      window.alert("Request failed:", error);
    }
}

export const filterGamesAction = (url) => async(dispatch) =>{
  try {
    const response = await axios.post(`http://localhost:3001/games/filter?=${url}`);
    return dispatch(filterGames(response.data));
  } catch (error) {
    window.alert("Request failed:", error);
  }
}
