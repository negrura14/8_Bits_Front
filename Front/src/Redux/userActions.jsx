import axios from 'axios';
import {userLogin, getUsers, switchAut, updateFromCookie, userLogout} from './userSlice';

export const userLoginAct = (user) => async (dispatch) =>{
    try{
        const response = await axios.post('user/login', user, {
            withCredentials: true
        });

        const userData = response.data;

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 3600 * 1000);
        const userDataJSON = JSON.stringify({...userData, auth: true});

        document.cookie = `miCookie=${encodeURIComponent(userDataJSON)}; expires=${expirationDate.toUTCString()}; path=/`;

        dispatch(userLogin(userData));

        dispatch(updateFromCookie(userData));
    } catch (error) {
        window.alert(error.response.data.message);
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

export const userLogoutAct = () => async (dispatch) => {
    try {
        await axios('user/logout');
        dispatch(userLogout())
    } catch (error) {
        window.alert("Request failed:", error);
    }
}


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
