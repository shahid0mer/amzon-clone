import { combineReducers} from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice";
// import cartReducer from "../features/cart/cartSlice";
import productReducer from "../Features/productSlice"
import reviewsReducer from "../Features/reviewSlice"
import cartReducer from "../Features/cartSlice"
import orderReducer from "../Features/orderSlice"
import addressReducer from '../Features/addressSlice'

const rootReducer = combineReducers({
  auth: authReducer,
   products: productReducer,
   reviews: reviewsReducer,
   cart: cartReducer,
   order: orderReducer,
   address: addressReducer
});

export default rootReducer;
