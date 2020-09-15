import React from "react";
import Header from "./components/ui/Header";
import theme from "./components/ui/Theme";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/" components={() => <div>Home</div>} />
					<Route
						exact
						path="/services"
						components={() => <div>Services</div>}
					/>
					<Route
						exact
						path="/customsoftware"
						components={() => <div>Custom Software</div>}
					/>
					<Route
						exact
						path="/mobileapps"
						components={() => <div>Mobile App</div>}
					/>
					<Route
						exact
						path="/websites"
						components={() => <div>Website</div>}
					/>
					<Route
						exact
						path="/revolution"
						components={() => <div>Revolution</div>}
					/>
					<Route
						exact
						path="/about"
						components={() => <div>About</div>}
					/>
					<Route
						exact
						path="/contact"
						components={() => <div>Contact</div>}
					/>
					<Route
						exact
						path="/estimate"
						components={() => <div>Estimate</div>}
					/>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
