import axios from 'axios';
import {
  USER_DELETE_FAILED,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_PROFILE_FAILED,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_DETAILS_FAILED,
} from '../constants/auth.constant';
import { CLEAR_CART } from '../constants/cart.constant';

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/loginUser', { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const userRegisterAction = (username, email, phonenumber, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/registerUser', { username, phonenumber, email, password }, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const userUpdateAction = (userData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     'content-type': 'application/json',
    //     Authorization: `Baerer ${userInfo?.user?.token}`,
    //   },
    // };

    const { data } = await axios.put(`/api/auth/${userData._id}`, userData /* config */);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo?.user?.token}`,
      },
    };

    const { data } = await axios.get('/api/auth/me/s', config);

    dispatch({
      type: USER_PROFILE_DETAILS_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: data,
    // });

    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_PROFILE_DETAILS_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const userProfileUpdateAction = (userData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Baerer ${userInfo?.user?.token}`,
      },
    };

    const { data } = await axios.put('/api/auth/me/e', userData, config);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo?.user?.token}`,
      },
    };

    const { data } = await axios.get('/api/auth/get-user', config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const userDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo?.user?.token}`,
      },
    };

    const { data } = await axios.get(`/api/auth/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     'content-type': 'application/json',
    //     Authorization: `Baerer ${userInfo.user.token}`,
    //   },
    // };

    const { data } = await axios.delete(`/api/auth/${id}`);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: CLEAR_CART,
  });
};
