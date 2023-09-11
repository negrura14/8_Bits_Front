import axios from 'axios';
import {userLogin, getUsers} from './userSlice';

export const userLoginAct = (user) => async (dispatch) =>{
    try{
        const response = await axios.post('user/login', user);
        return dispatch(userLogin(response.data));
    } catch (error) {
        window.alert("Request failed:", error);
    }
};

export const  getUsersAct = () => async (dispatch) =>{
    try{
        const response = await axios('user/');
        return dispatch(getUsers(response.data));
    } catch (error) {
        window.alert("Request failed:", error);
    }
} 