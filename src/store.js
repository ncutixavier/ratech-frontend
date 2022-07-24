import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import loginReducer from "./features/auth/LoginSlice";
import { searchProductReducer } from "./features/products/SearchProductSlice";
import forgotpasswordReducer from "./features/auth/ForgotPasswordSlice";
import resetpasswordReducer from "./features/auth/ResetPasswordSlice";
import checklistReducer from "./features/products/ChecklistSlice";
import { getChecklistReducer } from "./features/products/getChecklistSlice";
import { getOrderReducer } from "./features/products/getOrderSlice";

const reducer = {
  login: loginReducer,
  searchProduct: searchProductReducer,
  forgotpassword: forgotpasswordReducer,
  resetpassword: resetpasswordReducer,
  checklist: checklistReducer,
  getChecklist: getChecklistReducer,
  getOrder: getOrderReducer,
};

const middleware = [];

if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export default configureStore({
  reducer,
  middleware: [thunk, ...middleware],
});
