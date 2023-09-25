import axios from 'axios';
import { getUserProfile } from './Reducers/userProfile';


export const getUserProfileAction = (mail) => async (dispatch) => {
    //console.log('asd2',mail)
    try {
        const response = await axios.get(`/user/filter?email=${mail}`);
        return dispatch(getUserProfile(response.data))
    } catch (error) {
        window.alert("Request failed:", error);
    }
}