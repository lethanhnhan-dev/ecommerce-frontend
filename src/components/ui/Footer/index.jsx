import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut } from "../../../api/auth";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		marginTop: 'auto',
	},
	main: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(2),
	},
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: "auto",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[200]
				: theme.palette.grey[800],
	},
}));

const Footer = ({ history }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<footer className={classes.footer}>
				<Container maxWidth="sm">
					<div>
						<Link to="/signin">Sign In</Link>
						<Link to="/signup">Sign Up</Link>
						<Link
							to="/signout"
							onClick={() =>
								signOut(() => {
									history.push("/");
								})
							}
						>
							Sign Out
						</Link>
					</div>
					<Typography variant="body1">
						My sticky footer can be found here.
					</Typography>
				</Container>
			</footer>
		</div>
	);
};

export default withRouter(Footer);
