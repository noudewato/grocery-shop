import axios from "axios"
import { USER_LIST_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/auth.constant";
import { CLEAR_CART } from "../constants/cart.constant";

export const userLoginAction = (email, password) => async(dispatch) => {
try {
    dispatch({
        type: USER_LOGIN_REQUEST
    })

    const config = {
        headers: {
            "content-type":"application/json"
        }
    }

    const {data} = await axios.post("/api/auth/loginUser", {email, password}, config)


    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
    })
  
  localStorage.setItem("userInfo", JSON.stringify(data))
} catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
}
}

export const userRegisterAction = (username, email, phonenumber, password) => async (dispatch) => {
    try {
        dispatch({
          type: USER_REGISTER_REQUEST,
        });

        const config = {
          headers: {
            "content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/api/auth/registerUser",
          { username, email, phonenumber, password },
          config
        );

        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        });
    } catch (error) {
         dispatch({
           type: USER_REGISTER_FAILED,
           payload:
             error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
         });
    }
    
}

export const userUpdateAction = (username, email, phonenumber, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/registerUser', { username, email, phonenumber, password }, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const userListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/registerUser', { username, email, phonenumber, password }, config);

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

export const userDeleteAction = (username, email, phonenumber, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/registerUser', { username, email, phonenumber, password }, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: CLEAR_CART
  })
};