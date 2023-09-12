import axios from 'axios';
import {userLogin, getUsers, switchAut} from './userSlice';

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
};

export const swAuth = (sw) => (dispatch) =>{
    return dispatch(switchAut(sw));
};

export const googleLoginAct = (token) => async (dispatch) => {
    const tokenObj = {
        token: token
    };
    
    try{
        const response = await axios.post('google/auth', tokenObj);
        return dispatch(userLogin(response.data));
    } catch (error) {
        window.alert("Request failed:", error);
    }
}