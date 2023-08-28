import {
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_FAILED,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAILED,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_ACTIVE_LIST_REQUEST,
  PRODUCT_ACTIVE_LIST_SUCCESS,
  PRODUCT_ACTIVE_LIST_FAILED,
} from '../constants/product.constant';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };

    case PRODUCT_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productActiveListReducer = (state = { myProducts: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ACTIVE_LIST_REQUEST:
      return {
        loading: true,
        myProducts: [],
      };
    case PRODUCT_ACTIVE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        myProducts: action.payload,
      };

    case PRODUCT_ACTIVE_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };

    case PRODUCT_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

      case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };

    case PRODUCT_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };

    case PRODUCT_DELETE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
