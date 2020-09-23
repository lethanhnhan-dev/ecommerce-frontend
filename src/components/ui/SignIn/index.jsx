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
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import { Link as LinkRouter, withRouter, Redirect } from "react-router-dom";
import { signIn, authenticate, isAuthenticated } from "../../../api/auth";

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

const SignIn = () => {
	const classes = useStyles();
	const [values, setValues] = useState({
		email: "admin11111@gmail.com",
		password: "123123123",
		error: "",
		loading: false,
		success: false,
		open: false,
		redirectToReferer: false,
	});

	const { user } = isAuthenticated();

	const {
		email,
		password,
		loading,
		open,
		success,
		error,
		redirectToReferer,
	} = values;

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
		setValues({ ...values, error: false, loading: false });
		signIn({ email, password }).then((data) => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					success: false,
					loading: false,
					open: true,
				});
			} else {
				authenticate(data, () => {
					setValues({ ...values, redirectToReferer: true });
				});
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
	const showSnackbar = (error) => {
		return success === false ? showError(error) : null;
	};

	const showLoading = () => loading && <CircularProgress />;

	const redirectUser = () => {
		if (redirectToReferer) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to="/" />;
		}
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
					Đăng nhập
				</Typography>
				<form className={classes.form} noValidate onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email của bạn"
								name="email"
								value={email}
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
								value={password}
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
						Đăng nhập
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link
								component={LinkRouter}
								to="/signup"
								variant="body2"
							>
								Bạn chưa có tài khoản? Đăng kí ngay!
							</Link>
						</Grid>
					</Grid>
				</form>
				{showLoading()}
				{showSnackbar(error)}
				{JSON.stringify({ email, password })}
				{redirectUser()}
			</div>
		</Container>
	);
};

export default withRouter(SignIn);
