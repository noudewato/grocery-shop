import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_CREATE_RESET,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_SUCCESS,
  ORDER_STATUS_FAIL,
} from '../constants/order.constant';

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        createdOrder: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (state={}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_DETAILS_RESET:
      return { };

    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };

    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };

    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderStatusReducer = (state = { status: [] }, action) => {
  switch (action.type) {
    case ORDER_STATUS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
        status: action.payload,
      };

    case ORDER_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateOrderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_UPDATE_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_UPDATE_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
