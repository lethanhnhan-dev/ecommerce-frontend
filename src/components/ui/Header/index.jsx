import {
	AppBar,
	Button,
	Tab,
	Tabs,
	Toolbar,
	Typography,
	useScrollTrigger,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
		marginBottom: "3rem",
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
		marginLeft: "25px",
		height: "88px",
    },
	button: {
		...theme.typography.estimate,
		borderRadius: "50px",
		marginLeft: "50px",
		marginRight: "25px",
		height: "45px",
	},
}));

const Header = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (e, value) => {
		setValue(value);
	};

	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position="fixed">
					<Toolbar disableGutters>
						<Typography
							variant="h3"
							className={classes.logo}
							component={Link}
							to="/"
						>
							Phone Store
						</Typography>
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
								to="/location"
							/>
							<Tab
								className={classes.tab}
								label="liên hệ"
								component={Link}
								to="/contact"
							/>
							<Tab
								className={classes.tab}
								label="tài khoản"
								component={Link}
								to="/account"
							/>
							<Tab
								className={classes.tab}
								label="giỏ hàng"
								component={Link}
								to="/cart"
							/>
						</Tabs>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Header;
