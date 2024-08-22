import { legacy_createStore as createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const initialState = {};

const store = createStore(rootReducer, initialState);

export default store;
