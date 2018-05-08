import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import apiClient from "../resources/apiClient";

export default function create(client, data) {
	let middleware;
	const thunkMiddleware = thunk.withExtraArgument(client);
	middleware = applyMiddleware(thunkMiddleware);
	return createStore(reducers, data, middleware);
}

export const initStore = (initialState) => {
	const api = new apiClient();
	return create(api, initialState)
};