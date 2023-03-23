import { combineReducers } from "redux";
// import { addProductToCart } from "../Actions/CartAction";
import UserReducer from "./AuthReducer";
import { addItemToCartReducer, CartReducer, CountCart } from "./CartReducer";
import CollReducer from "./CollReducer";

export default combineReducers({
  user: UserReducer,
  coll: CollReducer,
  cartItemsList: CartReducer,
  addToCart: addItemToCartReducer,
  // count: CountCart
});
