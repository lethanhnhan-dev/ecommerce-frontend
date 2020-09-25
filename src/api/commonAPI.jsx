import { API } from "../constant";

export const getAllProducts = (sortBy) => {
	return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
		method: "GET",
	})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});
};
