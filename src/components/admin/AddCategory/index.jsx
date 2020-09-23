import {
	Button,
	Container,
	Grid,
	makeStyles,
	TextField,
} from "@material-ui/core";
import React, { useState } from "react";
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
	};

	const newCategoryForm = () => {
		return (
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
		</Container>
	);
};

export default AddCategory;
