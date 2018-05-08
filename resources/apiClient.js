import config from "./config";
import fetch from "isomorphic-fetch";

const methods = ["get", "post", "put", "patch", "del"];

function formatUrl(path) {
	const adjustedPath = path[0] !== "/" ? "/" + path : path;
	return config.api.path + adjustedPath;
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	
	return response.json().then(json => Promise.reject(json));
}

function parseJSON(response) {
	return response.json();
}

function fetchCreator(method) {
	return (url, fromMe = true, {data, ...options} = {}) => {
		const fetchOptions          = options;
		fetchOptions.headers        = fetchOptions.headers || {};
		fetchOptions.headers.Accept = "application/json";
		
		if (data) {
			fetchOptions.body                    = JSON.stringify(data);
			fetchOptions.headers["Content-Type"] = "application/json";
		}
		
		fetchOptions.method = method;
		
		return fetch(fromMe ? formatUrl(url) : url, fetchOptions)
			.then(checkStatus)
			.then(parseJSON);
	};
}

export default class ApiClient {
	constructor() {
		methods.forEach((method) => {
			this[method] = fetchCreator(method);
		});
	}
	
	empty() {
	}
}