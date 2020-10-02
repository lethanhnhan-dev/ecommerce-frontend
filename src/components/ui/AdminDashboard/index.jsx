import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
	Card,
	CardContent,
	Container,
	Grid,
	Link,
	Typography,
} from "@material-ui/core";
import { isAuthenticated } from "../../../api/auth";
import { Link as LinkRouter } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
		fontWeight: 700,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 700,
	},
	paper: {
		marginTop: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minHeight: '67vh'
	},
	heading: {
		fontSize: "2.5rem",
		fontWeight: "700",
		fontFamily: "Raleway",
		marginBottom: "1rem",
	},
	cardContent: {
		overflowX: "hidden",
	},
}));

const AdminDashboard = () => {
	const {
		user: { _id, name, email, role },
	} = isAuthenticated();
	const classes = useStyles();

	const adminLinks = () => {
		return (
			<CardContent>
				<TableContainer
					component={Paper}
					className={classes.cardContent}
				>
					<Table
						className={classes.table}
						aria-label="customize-table"
					>
						<TableHead>
							<TableRow>
								<StyledTableCell>
									Danh mục quản trị
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<StyledTableRow>
								<StyledTableCell>
									<Link
										component={LinkRouter}
										to="/create/category"
									>
										Tạo danh mục sản phẩm
									</Link>
								</StyledTableCell>
							</StyledTableRow>
							<StyledTableRow>
								<StyledTableCell>
									<Link
										component={LinkRouter}
										to="/create/product"
									>
										Tạo sản phẩm
									</Link>
								</StyledTableCell>
							</StyledTableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		);
	};

	const adminInfo = () => {
		return (
			<div className={classes.paper}>
				<TableContainer component={Paper}>
					<Table
						className={classes.table}
						aria-label="customized table"
					>
						<TableHead>
							<TableRow>
								<StyledTableCell>
									Thông tin tài khoản
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<StyledTableRow>
								<StyledTableCell component="th" scope="row">
									Tên
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									{name}
								</StyledTableCell>
							</StyledTableRow>
							<StyledTableRow>
								<StyledTableCell component="th" scope="row">
									Email
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									{email}
								</StyledTableCell>
							</StyledTableRow>
							<StyledTableRow>
								<StyledTableCell component="th" scope="row">
									Loại tài khoản
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									{role === 1
										? "Quản trị viên"
										: "Tài khoản khách"}
								</StyledTableCell>
							</StyledTableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	};

	return (
		<Container disableGutters>
			<Typography component="h1" variant="h5" className={classes.heading}>
				Tài khoản của bạn
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					{adminLinks()}
				</Grid>
				<Grid item xs={9}>
					{adminInfo()}
				</Grid>
			</Grid>
		</Container>
	);
};

export default AdminDashboard;
