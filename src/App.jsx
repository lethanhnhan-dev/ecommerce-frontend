import { makeStyles, ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import theme from "./components/ui/Theme";
import Routes from "./Routes";

const useStyles = makeStyles({
	root: {
		// minHeight: "100vh"
	}
})

const App = () => {
	const classes = useStyles();
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<Routes className={classes.root} />
				<Footer />
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
