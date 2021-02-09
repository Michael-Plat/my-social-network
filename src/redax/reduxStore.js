import { combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sadeBarReducer from "./sadeBarReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sadeBar: sadeBarReducer,
    usersPage: usersReducer
});

let store = createStore(reducers);

export default store; 