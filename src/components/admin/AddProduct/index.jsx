import {
	Button,
	Container,
	Grid,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { createProduct, getAllCategories } from "../../../api/apiAdmin";
import { isAuthenticated } from "../../../api/auth";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	button: {
		marginTop: "1rem",
		"&:hover": {
			backgroundColor: theme.palette.common.blue,
			color: theme.palette.common.white,
			transition: "0.3s linear",
		},
	},
	heading: {
		fontSize: "2.5rem",
		fontWeight: "700",
		fontFamily: "Raleway",
		marginBottom: "2rem",
	},
	input: {
		display: "none",
	},
	textField: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		"& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
			display: "none",
		},
	},
	paper: {
		padding: theme.spacing(3),
	},
}));

const AddProduct = () => {
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		categories: [],
		category: "",
		shipping: "",
		quantity: "",
		photo: "",
		loading: false,
		error: "",
		createdProduct: "",
		redirectToReferer: false,
		formData: "",
		success: false,
		open: true,
	});

	const {
		name,
		description,
		price,
		categories,
		category,
		shipping,
		quantity,
		photo,
		loading,
		error,
		createdProduct,
		redirectToReferer,
		formData,
		success,
		open,
	} = values;

	const classes = useStyles();

	// Load categories and set form data
	const initData = () => {
		getAllCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					categories: data,
					formData: new FormData(),
				});
			}
		});
	};

	// Destructure user and token from localStorage
	const { user, token } = isAuthenticated();

	useEffect(() => {
		initData();
	}, []);

	const handleChange = (name) => (event) => {
		const value =
			name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({
			...values,
			[name]: value,
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({
			...values,
			error: "",
			loading: true,
		});
		createProduct(user._id, token, formData).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: "",
					description: "",
					photo: "",
					price: "",
					quantity: "",
					loading: false,
					createdProduct: data.name,
				});
			}
		});
	};

	return (
		<div className={classes.root}>
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={2} />
					<Grid item>
						<Paper
							className={classes.paper}
							variant="outlined"
							elevation={3}
						>
							<Typography
								component="h1"
								variant="h5"
								className={classes.heading}
								align="center"
							>
								Thêm sản phẩm
							</Typography>
							<form onSubmit={(event) => onSubmit(event)}>
								<input
									accept="image/*"
									className={classes.input}
									id="contained-button-file"
									multiple
									type="file"
									onChange={handleChange("photo")}
								/>
								<label htmlFor="contained-button-file">
									<Button
										variant="contained"
										color="primary"
										component="span"
									>
										Tải ảnh lên
									</Button>
								</label>
								<TextField
									className={classes.textField}
									fullWidth
									label="Tên sản phẩm"
									type="text"
									variant="outlined"
									onChange={handleChange("name")}
								/>
								<TextField
									className={classes.textField}
									fullWidth
									label="Mô tả sản phẩm"
									multiline
									rows={4}
									placeholder="Mô tả..."
									variant="outlined"
									onChange={handleChange("description")}
								/>
								<TextField
									className={classes.textField}
									fullWidth
									label="Giá"
									type="number"
									variant="outlined"
									onChange={handleChange("price")}
								/>
								<TextField
									className={classes.textField}
									fullWidth
									label="Danh mục sản phẩm"
									select
									variant="outlined"
									SelectProps={{
										native: true,
									}}
									onChange={handleChange("category")}
								>
									<option>Please select</option>
									{categories &&
										categories.map((category, index) => (
											<option
												value={category._id}
												key={index}
											>
												{category.name}
											</option>
										))}
								</TextField>
								<TextField
									className={classes.textField}
									fullWidth
									label="Ship"
									select
									variant="outlined"
									SelectProps={{
										native: true,
									}}
									onChange={handleChange("shipping")}
								>
									<option value="0">Không</option>
									<option value="1">Có</option>
								</TextField>
								<TextField
									className={classes.textField}
									fullWidth
									label="Số lượng sản phẩm"
									type="number"
									variant="outlined"
									onChange={handleChange("quantity")}
								/>
								<Grid container>
									<Grid item xs={9}></Grid>
									<Grid item xs>
										<Button
											// className={classes.button}
											color="primary"
											type="submit"
											variant="contained"
											fullWidth
											size="large"
										>
											Tạo sản phẩm
										</Button>
									</Grid>
								</Grid>
							</form>
						</Paper>
					</Grid>
					<Grid item xs={2} />
				</Grid>
			</Container>
		</div>
	);
};

export default AddProduct;
