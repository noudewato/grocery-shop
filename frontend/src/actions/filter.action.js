import axios from 'axios';
import { PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/product.constant';

export const productFilterAction = (arg) => async (dispatch) => {
    try {        
    const { data } = await axios.post('/api/filter/search', arg);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
