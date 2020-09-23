import {
	Button,
	Container,
	Grid,
	makeStyles,
	Snackbar,
	TextField,
	Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { createCategory } from "../../../api/apiAdmin";
import { isAuthenticated } from "../../../api/auth";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "25ch",
	},
	button: {
		marginTop: "1rem",
		"&:hover": {
			backgroundColor: theme.palette.common.blue,
			color: theme.palette.common.white,
			transition: "0.3s linear",
		},
	},
}));

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	// Destructure user and token from localStorage
	const { user, token } = isAuthenticated();

	const handleChange = (e) => {
		setError("");
		setName(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		// make request to server
		createCategory(user._id, token, { name }).then((data) => {
			if (data.error) {
				setError(data.error);
				console.log(data.error);
				setOpen(true);
			} else {
				setSuccess(true);
				setError("");
				setOpen(true);
			}
		});
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const showError = (error) => (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			open={open}
			autoHideDuration={5000}
			onClose={handleClose}
		>
			<Alert variant="filled" severity="error">
				Danh mục <strong>{name}</strong> không tạo được hoặc do trùng
				danh mục đã có!
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
				Danh mục <strong>{name}</strong> đã được tạo thành công!
			</Alert>
		</Snackbar>
	);

	const showSnackbar = (error) => {
		// return success === true ? showSuccess() : showError(error);
		return open && (success ? showSuccess() : showError(error));
	};

	const newCategoryForm = () => {
		return (
			<React.Fragment>
					<Typography
					component="h1"
					variant="h5"
					className={classes.heading}
					align="center"
				>
					Thêm danh mục sản phẩm
				</Typography>
				<form onSubmit={(event) => onSubmit(event)}>
					<TextField
						id="outlined-full-width"
						label="Tên danh mục bạn muốn thêm"
						placeholder="Tên danh mục"
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
						autoFocus
						variant="outlined"
						name="name"
						value={name}
						onChange={(event) => handleChange(event)}
					/>
					<Button
						color="primary"
						variant="outlined"
						type="submit"
						size="medium"
						fullWidth
						className={classes.button}
					>
						Thêm danh mục
					</Button>
				</form>
			</React.Fragment>
		);
	};

	return (
		<Container>
			<div style={{ marginTop: "5rem" }}></div>
			<Grid container spacing={2}>
				<Grid item xs={2} />
				<Grid item xs={8}>
					{newCategoryForm()}
				</Grid>
				<Grid item xs={2} />
			</Grid>
			{showSnackbar(error)}
		</Container>
	);
};

export default AddCategory;
