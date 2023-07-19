import axios from 'axios';

import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILED,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILED,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAILED,
  CATEGORY_DETAILS_FAILED,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DELETE_FAILED,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_REQUEST,
} from '../constants/category.constant';

const CATEGORY_URL = '/api/category';

export const categoryListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     'content-type': 'application/json',
    //     Authorization: `Bearer ${userInfo?.user?.token}`,
    //   },
    // };

    const response = await axios.get(`${CATEGORY_URL}/get-category`);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const categoryDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DETAILS_REQUEST,
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


    const response = await axios.get(`${CATEGORY_URL}/single-category/${id}`, config);

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


export const categoryCreateAction = (categoryData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
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

    const response = await axios.post(`${CATEGORY_URL}/create-category`, categoryData, config);

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const categoryUpdateAction = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
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

    const response = await axios.put(`${CATEGORY_URL}/update-category/${category._id}`,category, config);

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const categoryDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
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

    const response = await axios.delete(`${CATEGORY_URL}/delete-category/${id}`, config);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
