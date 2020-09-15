import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/ui/Home";
import SignIn from "./components/ui/SignIn";
import SignUp from "./components/ui/SignUp";
import SignOut from "./components/ui/SignOut";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/about">
				Giới thiệu
			</Route>
			<Route exact path="/location">
				Cửa hàng
			</Route>
			<Route exact path="/contact">
				Liên hệ
			</Route>
			<Route exact path="/account">
				Tài khoản
			</Route>
			<Route exact path="/cart">
				Giỏ hàng
			</Route>
			<Route exact path="/signin">
				<SignIn />
			</Route>
			<Route exact path="/signup">
				<SignUp />
			</Route>
			<Route exact path="/signout">
				<SignOut />
			</Route>
		</Switch>
	);
};

export default Routes;
