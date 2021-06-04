import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const initialState = { user: "" };

const store = createStore(rootReducer, initialState);

export default store;
