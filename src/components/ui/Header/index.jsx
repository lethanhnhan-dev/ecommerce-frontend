import {
	AppBar,
	Tab,
	Tabs,
	Toolbar,
	Typography,
	useScrollTrigger
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signOut } from "../../../api/auth";
import Search from "./Search";

function ElevationScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
};

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: "2rem",
	},
	logo: {
		margin: "1rem 20px",
		textDecoration: "none",
		color: "white",
	},
	tabContainer: {
		marginLeft: "auto",
	},
	tab: {
		...theme.typography.tab,
		minWidth: "10",
		marginLeft: "0px",
		// height: "88px",
	},
	button: {
		...theme.typography.estimate,
		borderRadius: "50px",
		marginLeft: "50px",
		marginRight: "25px",
		height: "45px",
	},
	about: {
		height: "200px",
	},
}));

const Header = ({ history }) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (e, value) => {
		setValue(value);
	};

	const dashboardLink = () => {
		if (isAuthenticated()) {
			if (isAuthenticated().user.role === 0) {
				return (
					<Tab
						className={classes.tab}
						label="Tài khoản"
						component={Link}
						to="/user/dashboard"
					/>
				);
			} else if (isAuthenticated().user.role === 1) {
				return (
					<Tab
						className={classes.tab}
						label="Tài khoản"
						component={Link}
						to="/admin/dashboard"
					/>
				);
			}
		}
	};

	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position="fixed">
					<Toolbar disableGutters>
						<Typography
							variant="h5"
							className={classes.logo}
							component={Link}
							to="/"
						>
							Phone Store
						</Typography>
						<Search />
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							className={`${classes.tabContainer}`}
						>
							<Tab
								className={classes.tab}
								label="Trang Chủ"
								component={Link}
								to="/"
							/>
							{dashboardLink()}
							<Tab
								className={classes.tab}
								label="giới thiệu"
								component={Link}
								to="/about"
							/>
							<Tab
								className={classes.tab}
								label="cửa hàng"
								component={Link}
								to="/shop"
							/>

							{/* Need return array for there Tabs components */}
							{!isAuthenticated() && (
								<Fragment>
									<Tab
										className={classes.tab}
										label="Đăng nhập"
										component={Link}
										to="/signin"
									/>

									<Tab
										className={classes.tab}
										label="Đăng kí"
										component={Link}
										to="/signup"
									/>
								</Fragment>
							)}
							{isAuthenticated() && (
								<Tab
									className={classes.tab}
									label="Đăng xuất"
									component={Link}
									to="/signout"
									onClick={() =>
										signOut(() => {
											history.push("/");
										})
									}
								/>
							)}
						</Tabs>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default withRouter(Header);
