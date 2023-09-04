import axios from 'axios';
import { getAllGame, getGameById, getGameByName } from './gameSlice';

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

export const getGamesById = (id) => async (dispatch) =>{ 
    try {
        const response = await axios(`http://localhost:3001/games/${id}`);
        return dispatch(getGameById(response.data));
      } catch (error) {
        window.alert("Request failed:", error);
      }
}

// export const getGamesByName = (name) => async (dispatch) =>{ 
//   try {
//       let response = await axios.get(`http://localhost:3001/games${name}`);
//       dispatch(getGameByName(response.data));
//     } catch (error) {
//       window.alert("Request failed:", error);
//     }
// }

