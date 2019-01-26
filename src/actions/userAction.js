import { GET_BALANCE } from "./constants";

export const getBalance = () => async dispatch => {
  try {
    const balance = localStorage.getItem('balance');
    const payloadUser = {
      balance,
    };
    console.log(payloadUser);    
    return dispatch({ type: GET_BALANCE, payload: payloadUser });
  } catch (error) {
    const errMsg = {
      status_code: 404,
      message: 'Not found'
    };
    return dispatch({ type: GET_BALANCE, payload: errMsg });
  }
}