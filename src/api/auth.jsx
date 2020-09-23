import { API } from "../constant";
// import axios from "axios";

const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

// Sign Up
export const signUp = async (user) => {
	const response = await fetch(`${API}/signup`, {
		method: "POST",
		headers,
		mode: "cors",
		body: JSON.stringify(user),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
	// console.log(response);
	return response;
};

// Sign In
export const signIn = async (user) => {
	const response = await fetch(`${API}/signin`, {
		method: "POST",
		headers,
		mode: "cors",
		body: JSON.stringify(user),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
	// console.log(response);
	return response;
};

export const authenticate = (data, next) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
};

export const signOut = (next) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
		next();
		return fetch(`${API}/signout`, {
			method: "GET",
		})
			.then((res) => {
				console.log(res.json);
				return res.json();
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else return false;
};
