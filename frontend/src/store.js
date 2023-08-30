import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
  userProfileDetailsReducer,
  userProfileUpdatedReducer,
  allUserListReducer
} from './reducers/auth.reducer';
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryProductsListReducer,
  categoryUpdateReducer,
} from './reducers/category.reducer';
import {
  productActiveListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from './reducers/product.reducer';
import { createOrderReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderStatusReducer, orderTotalAmountReducer, orderTotalStatusReducer } from './reducers/order.reducer';
import { cartReducer } from './reducers/cart.reducer';

const reducers = combineReducers({
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  allUsers: allUserListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userProfileUpdated: userProfileUpdatedReducer,
  userDelete: userDeleteReducer,
  userProfileDetails: userProfileDetailsReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryProductList: categoryProductsListReducer,
  productList: productListReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productsActiveList: productActiveListReducer,
  orderCreate: createOrderReducer,
  orderList: orderListReducer,
  orderListMy: orderListMyReducer,
  orderDetails: orderDetailsReducer,
  orderStatus: orderStatusReducer,
  orderTotalAmount: orderTotalAmountReducer,
  orderDiversAmount: orderTotalStatusReducer
});

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const myCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const payment = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null;
const address = localStorage.getItem('deliverAddress') ? JSON.parse(localStorage.getItem('deliverAddress')) : null;

const initialState = {
  userLogin: { userInfo },
  cart: { cartItems: myCart, paymentMethod: payment, deliverAddress: address },
};

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
