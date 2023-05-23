import { legacy_createStore as createStore, applyMiddleware } from "redux";
import contactReducer from "./reducer/contactReducer";
import thunk from "redux-thunk";

const store = createStore(contactReducer, applyMiddleware(thunk));

export default store;
