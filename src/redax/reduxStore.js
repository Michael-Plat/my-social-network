import { combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sadeBarReducer from "./sadeBarReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sadeBar: sadeBarReducer
});

let store = createStore(reducers);

export default store; 