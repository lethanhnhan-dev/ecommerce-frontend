import { Container, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MediaCard from "../Product/MediaCard";
import { getAllCategories } from "../../../api/apiAdmin";
import { getFilterProducts } from "../../../api/commonAPI";
import CheckboxGroup from "./CheckboxGroup";
import RadioPrice from "./RadioPrice";
import { fixedPrice as prices } from "../../../constant";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(4),
	},
}));

const Shop = () => {
	const [myFilters, setMyFilters] = useState({
		filters: {
			category: [],
			price: [],
		},
	});
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const [limit, setLimit] = useState(6);
	const [skip, setSkip] = useState(0);
	const [filterResult, setFilterResult] = useState(0);

	// Get all categories
	const initCategories = () => {
		getAllCategories().then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setCategories(data);
			}
		});
	};

	const loadFilteredResults = (newFilters) => {
		getFilterProducts(skip, limit, newFilters).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				console.log(data.data);
				setFilterResult(data.data);
			}
		});
	};

	useEffect(() => {
		initCategories();
		loadFilteredResults(skip, limit, myFilters.filters);
	}, []);

	const handleFilters = (filters, filterBy) => {
		// console.log("SHOP", filters, filterBy);
		const newFilters = { ...myFilters };
		newFilters.filters[filterBy] = filters;
		if (filterBy === "price") {
			let priceValues = handlePrice(filters);
			newFilters.filters[filterBy] = priceValues;
		}
		loadFilteredResults(myFilters.filters);
		setMyFilters(newFilters);
	};

	const handlePrice = (value) => {
		const data = prices;
		let array = [];

		for (let key in data) {
			if (data[key]._id === parseInt(value)) {
				array = data[key].array;
			}
		}
		return array;
	};

	const classes = useStyles();
	return (
		<Grid container>
			<Grid item xs={3} className={classes.paper}>
				<>
					<CheckboxGroup
						categories={categories}
						handleFilters={(filters) =>
							handleFilters(filters, "category")
						}
					/>
					<RadioPrice
						prices={prices}
						handleFilters={(filters) =>
							handleFilters(filters, "price")
						}
					/>
				</>
			</Grid>
			<Grid item xs={9} className={classes.paper}>
				<Typography variant="h2">Products</Typography>
				<Grid container>
					{filterResult.map((product, index) => (
						<Grid item xs={4} key={product._id}>
							<MediaCard product={product} url="product" />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Shop;
