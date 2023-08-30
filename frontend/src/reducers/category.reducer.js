import {
  CATEGORY_CREATE_FAILED,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAILED,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_RESET,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAILED,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_LIST_FAILED,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_PRODUCTS_LIST_FAILED,
  CATEGORY_PRODUCTS_LIST_REQUEST,
  CATEGORY_PRODUCTS_LIST_SUCCESS,
  CATEGORY_UPDATE_FAILED,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_SUCCESS,
} from '../constants/category.constant';

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        categories: action.payload,
      };

    case CATEGORY_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryProductsListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCTS_LIST_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case CATEGORY_PRODUCTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        categories: action.payload,
      };

    case CATEGORY_PRODUCTS_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };

    case CATEGORY_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };

    case CATEGORY_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };

    case CATEGORY_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case CATEGORY_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };

    case CATEGORY_DELETE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case CATEGORY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
