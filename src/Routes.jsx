import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/ui/Home";
import SignIn from "./components/ui/SignIn";
import SignUp from "./components/ui/SignUp";
import SignOut from "./components/ui/SignOut";
import PrivateRoute from "./api/PrivateRoute";
import Dashboard from "./components/ui/UserDashboard";
import AdminRoute from "./api/AdminRoute";
import AdminDashboard from "./components/ui/AdminDashboard";
import AddCategory from "./components/admin/AddCategory";

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
			<PrivateRoute path="/user/dashboard" exact component={Dashboard} />
			<AdminRoute
				path="/admin/dashboard"
				exact
				component={AdminDashboard}
			/>
			<AdminRoute path="/create/category" exact component={AddCategory} />
		</Switch>
	);
};

export default Routes;
