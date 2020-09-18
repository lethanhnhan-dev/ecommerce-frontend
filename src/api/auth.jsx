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
