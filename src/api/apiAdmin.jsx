import { API } from "../constant";

const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

export const createCategory = (userId, token, name) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: "POST",
		headers: {
			...headers,
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(name),
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getAllCategories = () => {
	return fetch(`${API}/categories`, {
		method: "GET",
	})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});
};
