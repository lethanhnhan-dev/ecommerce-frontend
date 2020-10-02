import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../api/commonAPI";
import MediaCard from "../Product/MediaCard";

const Home = () => {
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	const [error, setError] = useState(false);

	const loadProductsBySell = () => {
		getAllProducts("sold").then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsBySell(data);
			}
		});
	};

	const loadProductsByArrival = () => {
		getAllProducts("createdAt").then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsByArrival(data);
			}
		});
	};

	useEffect(() => {
		loadProductsByArrival();
		loadProductsBySell();
	}, []);

	return (
		<Grid container>
			<Grid item xs={3}>
				Hello
			</Grid>
			<Grid item xs>
				<Typography variant="h3">Bán chạy</Typography>
				<Grid container>
					{productsBySell.map((product, index) => (
						<Grid item xs={3} key={product._id}>
							<MediaCard product={product} url="product" />
						</Grid>
					))}
				</Grid>
				<Typography variant="h3">Hàng mới về</Typography>
				<Grid container>
					{productsByArrival.map((product, index) => (
						<Grid item xs={3} key={product._id}>
							<MediaCard product={product} url="product" />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Home;
