import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import countReducer from "../reducers";

let store = createStore(countReducer, applyMiddleware(thunk));

export default store;
