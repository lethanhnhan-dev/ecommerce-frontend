import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { API } from "../../../../constant";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		minHeight: "550px",
		margin: theme.spacing(1),
	},
	media: {
		height: 350,
	},
	description: {
		lineHeight: "1.5em",
		height: "3em",
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
		"-webkit-line-clamp": 2,
	},
}));

const MediaCard = ({ product, url }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={`${API}/${url}/photo/${product._id}`}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{product.name}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						className={classes.description}
					>
						{product.description}
					</Typography>
					<Typography component="span" color="secondary">
						{product.price} VNĐ
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="medium" color="primary" variant="contained">
					Xem sản phẩm
				</Button>
				<Button size="medium" color="secondary" variant="contained">
					Chọm mua
				</Button>
			</CardActions>
		</Card>
	);
};

export default MediaCard;
