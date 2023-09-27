import axios from "axios";
import { getPaymentStatistics, getPaymentByGameId} from "./Reducers/paymentsSlice";

export const getAllPayments = () => async (dispatch) => {
    try {
        const response = await axios("/payment");
        return dispatch(getPaymentStatistics(response.data))
    } catch (error) {
        console.error("Request failed:", error);
    }
};
 export const paymentByGameId = (id)=> async (dispatch)=>{
try{
    const response = await axios.get(`http://localhost:3001/payment/${id}`);
    return dispatch(getPaymentByGameId(response.data))
}catch(error){
    console.error("Request failed:", error);
}
 }
