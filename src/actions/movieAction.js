import { BASE_API_URL, REACT_APP_API_KEY } from './constants';
import { API } from '../utils';

export const getData = ({ url, type }) => async dispatch => {

  dispatch({ type: type + '_PROGRESS', payload: true });
  try {
    const option = {
      method: 'GET',
      url: `${BASE_API_URL}${url}&api_key=${REACT_APP_API_KEY}`
    };

    const res = await API(option);
    return dispatch({ type: type, payload: res });
  } catch (error) {
    dispatch({
      type: type, payload: {
        status_code: 404,
        message: 'Not found'
      }
    });
  }
}