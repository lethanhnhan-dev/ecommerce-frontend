import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginLeft: theme.spacing(3),
	},
	formLabel: {
		fontWeight: 600,
		color: theme.palette.common.black,
	},
}));

const RadioPrice = ({ prices, handleFilters }) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (event) => {
		handleFilters(event.target.value);
		setValue(event.target.value)
	};

	return (
		<FormControl component="fieldset" className={classes.formControl}>
			<FormLabel>
				<Typography variant="h4" className={classes.formLabel}>
					Filter by Range
				</Typography>
			</FormLabel>
			<RadioGroup
				aria-label="gender"
				name="gender1"
				value={value}
				onChange={handleChange}
			>
				{prices.map((price, index) => (
					<FormControlLabel
						// name
						key={index}
						value={`${price._id}`}
						control={<Radio />}
						label={price.name}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};
export default RadioPrice;
