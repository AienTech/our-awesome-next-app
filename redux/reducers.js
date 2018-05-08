import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import highlights from "./modules/highlights";

export default combineReducers({
    highlights,
    form: formReducer,
    routing: routerReducer,
});