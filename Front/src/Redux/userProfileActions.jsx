import axios from 'axios';
import { getUserProfile, getUserById } from './Reducers/userProfile';


export const getUserProfileAction = (mail) => async (dispatch) => {
    console.log('asd2',mail)
    try {
        const response = await axios.get(`/user/filter?email=${mail}`);
        console.log(response.data);
        return dispatch(getUserProfile(response.data))
    } catch (error) {
        window.alert("Request failed:", error);
    }
};

export const getUserByIdAction = (id)=> async (dispatch)=>{
    try{
        const response = await axios.get(`/user/${id}`)
        return dispatch(getUserById(response.data))
    }catch(error){
        window.alert("Request failed:", error);
    }
}