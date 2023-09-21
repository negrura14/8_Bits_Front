

// export const getGame = () => async  (dispatch) =>{
//     try {
//         const response = await axios("/games");
//       //  return dispatch({type: getAllGame, payload: response.data});
//         return dispatch(getAllGame(response.data));
//       } catch (error) {
//         window.alert("Request failed:", error);
//       }
//   }

//  /MercadoPago  para post
//* 

// export const getGamesId = (id) => async (dispatch) =>{ 
//     try {
//         const response = await axios(`/games/${id}`);
//         return dispatch(getGameById(response.data));
//       } catch (error) {
//         window.alert("Request failed:", error);
//       }
// }