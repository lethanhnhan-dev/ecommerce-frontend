import { fade, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import React, { useState } from "react";
import { getAllCategories } from "../../../../api/apiAdmin";

const useStyles = makeStyles((theme) => ({
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(12),
			width: "auto",
		},
	},
	searchIcon: {
		paddingLeft: "13px",
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const Search = () => {
	const classes = useStyles();

	const [data, setData] = useState({
		categories: [],
		category: "",
		search: "",
		result: [],
		searched: false,
	});

	const loadAllCategories = () => {
		getAllCategories().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setData({ ...data, categories: data });
			}
		});
	};

	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				fullWidth
				name="mainSearch"
				placeholder="Bạn muốn tìm gì..."
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{ "aria-label": "search" }}
			/>
		</div>
	);
};

export default Search;
