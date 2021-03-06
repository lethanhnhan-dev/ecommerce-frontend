import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";

export default createMuiTheme({
	palette: {
		common: {
			blue: `${arcBlue}`,
			orange: `${arcOrange}`,
			black: '#000000'
		},
		primary: {
			main: `${arcBlue}`,
		},
		secondary: {
			main: `${arcOrange}`,
		},
	},
	typography: {
		h4: {
			fontFamily: "Raleway",
		},
		h5: {
			fontFamily: "Raleway",
		},
		tab: {
			fontFamily: "Raleway",
			textTransform: "upercase",
			fontWeight: "500",
			fontSize: "1rem",
		},
		estimate: {
			fontFamily: "Pacifico",
			fontSize: "1rem",
			textTransform: "none",
			color: "white",
		},
	},
});
