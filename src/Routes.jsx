import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/ui/Home";
import SignIn from "./components/ui/SignIn";
import SignUp from "./components/ui/SignUp";
import SignOut from "./components/ui/SignOut";
import PrivateRoute from "./api/PrivateRoute";
import AdminRoute from "./api/AdminRoute";
import Dashboard from "./components/ui/UserDashboard";
import AdminDashboard from "./components/ui/AdminDashboard";
import AddCategory from "./components/admin/AddCategory";
import AddProduct from "./components/admin/AddProduct";
import Shop from "./components/ui/Shop";

// // Lazy
// const Home = React.lazy(() => import("./components/ui/Home"));
// const SignUp = React.lazy(() => import("./components/ui/SignUp"));
// const SignIn = React.lazy(() => import("./components/ui/SignIn"));
// const Dashboard = React.lazy(() => import("./components/ui/UserDashboard"));
// const AdminDashboard = React.lazy(() =>
// 	import("./components/ui/AdminDashboard"),
// );
// const AddCategory = React.lazy(() => import("./components/admin/AddCategory"));

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
			<Route exact path="/shop">
				<Shop />
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
			<AdminRoute path="/create/product" exact component={AddProduct} />
		</Switch>
	);
};

export default Routes;
