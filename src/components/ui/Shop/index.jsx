import {
	Button,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core";
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
	const [size, setSize] = useState(0);
	const [filteredResult, setFilteredResult] = useState([]);

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
				setFilteredResult(data.data);
				setSize(data.size);
				setSkip(0);
			}
		});
	};

	const loadMoreProducts = (newFilters) => {
		let toSkip = skip + limit;

		getFilterProducts(toSkip, limit, myFilters.filters).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setFilteredResult([...filteredResult, ...data.data]);
				setSize(data.size);
				setSkip(toSkip);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<Button
					onClick={loadMoreProducts}
					variant="contained"
					color="secondary"
				>
					Xem thêm sản phẩm
				</Button>
			)
		);
	};

	useEffect(() => {
		document.title = "Shop page";
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
					{filteredResult.map((product, index) => (
						<Grid item xs={3} key={index}>
							<MediaCard product={product} url="product" />
						</Grid>
					))}
				</Grid>
				<Divider component="button" />
				{loadMoreButton()}
			</Grid>
		</Grid>
	);
};
export default Shop;
