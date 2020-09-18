import { Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { Link as LinkRouter, withRouter } from "react-router-dom";
import { signUp } from "../../../api/auth";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	heading: {
		fontSize: "2.5rem",
		fontWeight: "700",
		fontFamily: "Raleway",
	},
}));

const SignUp = () => {
	const classes = useStyles();
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false,
		open: false,
	});

	const { name, email, password, open, success, error } = values;

	// Handle Change event
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setValues({ ...values, open: false });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		signUp({ name, email, password }).then((data) => {
			// register({ name, email, password }).then((data) => {
			// console.log(data);
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					success: false,
					open: true,
				});
			} else {
				console.log("Register sucess!");
				setValues({ ...values, error: "", success: true, open: true });
			}
		});
	};

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
				<LinkRouter to="/signin">
					<Link>Đăng kí thành công! Đăng nhập ngay</Link>
				</LinkRouter>
			</Alert>
		</Snackbar>
	);

	const showSnackbar = (error) => {
		return success === true ? showSuccess() : showError(error);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography
					component="h1"
					variant="h5"
					className={classes.heading}
				>
					Đăng kí
				</Typography>
				<form className={classes.form} noValidate onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<TextField
								autoComplete="name"
								name="name"
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Tên của bạn"
								autoFocus
								onChange={handleChange("name")}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email của bạn"
								name="email"
								autoComplete="email"
								onChange={handleChange("email")}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange("password")}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						className={classes.submit}
					>
						Đăng kí
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link
								component={LinkRouter}
								to="/signin"
								variant="body2"
							>
								Bạn đã có tài khoản? Đăng nhập ngay!
							</Link>
						</Grid>
					</Grid>
				</form>
				{showSnackbar(error)}
				{JSON.stringify({ name, email, password })}
			</div>
		</Container>
	);
};

export default withRouter(SignUp);
