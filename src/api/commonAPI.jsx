import { API } from "../constant";
const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

export const getAllProducts = (sortBy) => {
	return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
		method: "GET",
	})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});
};

export const getFilterProducts = (skip, limit, filters = {}) => {
	const data = { limit, skip, filters };
	return fetch(`${API}/products/by/search`, {
		method: "POST",
		headers,
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});
};
