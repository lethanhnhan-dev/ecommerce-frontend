import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(3),
	},
	formLabel: {
		fontWeight: 600,
		color: theme.palette.common.black,
	},
}));

const CheckboxGroup = ({ categories, handleFilters }) => {
	const classes = useStyles();
	const [checked, setChecked] = useState([]);

	const handleToggle = (checkId) => () => {
		// return the first index or -1
		const currentCategoryId = checked.indexOf(checkId);
		const newCheckedCategoryId = [...checked];
		// if currently checked was not already in checked state > push
		// else pull/take off
		if (currentCategoryId === -1) {
			newCheckedCategoryId.push(checkId);
		} else {
			newCheckedCategoryId.splice(currentCategoryId, 1);
		}
		setChecked(newCheckedCategoryId);
		handleFilters(newCheckedCategoryId);
	};

	return (
		<FormControl component="fieldset" className={classes.formControl}>
			<FormLabel>
				<Typography variant="h4" className={classes.formLabel}>
					Fillter by Category
				</Typography>
			</FormLabel>
			<FormGroup>
				{categories.map((category, index) => (
					<FormControlLabel
						key={category.name}
						control={
							<Checkbox
								value={checked.indexOf(category._id === -1)}
								onChange={handleToggle(category._id)}
								name={category.name}
							/>
						}
						label={category.name}
					/>
				))}
			</FormGroup>
		</FormControl>
	);
};
export default CheckboxGroup;
