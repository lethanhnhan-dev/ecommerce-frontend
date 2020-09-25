import {
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	Paper,
	Select,
	Snackbar,
	TextField,
	Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
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
		open: false,
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
				console.log(data.error);
				if (data.error === "All fields must be required!") {
					setValues({
						...values,
						error: "Kiểm tra lại các trường bị trống!",
					});
				} else {
					setValues({ ...values, error: data.error });
				}
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
			open: false,
		});
		createProduct(user._id, token, formData).then((data) => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					success: false,
					open: true,
				});
			} else {
				setValues({
					...values,
					name: "",
					description: "",
					photo: "",
					category: "",
					shipping: "",
					price: "",
					quantity: "",
					loading: false,
					createdProduct: data.name,
					success: true,
					open: true,
					formData: new FormData(),
				});
			}
		});
	};

	// Error Handling
	const showError = (error) => (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={open}
			autoHideDuration={5000}
			onClose={handleClose}
		>
			<Alert variant="filled" severity="error">
				{error}
			</Alert>
		</Snackbar>
	);

	const showSuccess = () => (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={open}
			autoHideDuration={5000}
			onClose={handleClose}
		>
			<Alert variant="filled" severity="success">
				Thêm sản phẩm {name} thành công
			</Alert>
		</Snackbar>
	);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setValues({ ...values, open: false });
	};

	const showSnackbar = (error) => {
		return success === true ? showSuccess() : showError(error);
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
									value={name}
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
									value={description}
									onChange={handleChange("description")}
								/>
								<TextField
									className={classes.textField}
									fullWidth
									label="Giá (VND)"
									type="number"
									variant="outlined"
									value={price}
									onChange={handleChange("price")}
								/>
								<FormControl
									variant="outlined"
									className={classes.textField}
									fullWidth
								>
									<InputLabel id="categories-form-control-label">
										Danh mục sản phẩm
									</InputLabel>
									<Select
										labelId="categories-form-control-label"
										id="categories-form-control"
										value={category}
										onChange={handleChange("category")}
										label="Danh mục sản phẩm"
									>
										{categories &&
											categories.map(
												(category, index) => (
													<MenuItem
														value={category._id}
														key={index}
													>
														{category.name}
													</MenuItem>
												),
											)}
									</Select>
								</FormControl>
								<FormControl
									variant="outlined"
									className={classes.textField}
									fullWidth
								>
									<InputLabel id="shipping-form-control-label">
										Ship
									</InputLabel>
									<Select
										labelId="shipping-form-control-label"
										id="shipping-form-control"
										value={shipping}
										onChange={handleChange("shipping")}
										label="Ship"
									>
										<MenuItem value={false}>Không</MenuItem>
										<MenuItem value={true}>Có</MenuItem>
									</Select>
								</FormControl>
								<TextField
									className={classes.textField}
									fullWidth
									label="Số lượng sản phẩm"
									type="number"
									value={quantity}
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
				{showSnackbar(error)}
			</Container>
		</div>
	);
};

export default AddProduct;
