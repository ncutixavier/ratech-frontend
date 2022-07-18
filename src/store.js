import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import loginReducer from "./features/auth/LoginSlice";
import { searchProductReducer } from "./features/products/SearchProductSlice";
import forgotpasswordReducer from "./features/auth/ForgotPasswordSlice";
import resetpasswordReducer from "./features/auth/ResetPasswordSlice";

const reducer = {
  login: loginReducer,
  searchProduct: searchProductReducer,
  forgotpassword: forgotpasswordReducer,
  resetpassword: resetpasswordReducer,
};

const middleware = [];

if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export default configureStore({
  reducer,
  middleware: [thunk, ...middleware],
});
