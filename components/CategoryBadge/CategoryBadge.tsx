import Category from "@wault/category";
import { CategoryType } from "@wault/typings";
import { Grid, makeStyles, Typography } from "@material-ui/core";

export type CategoryBadgeProps = {
    category: CategoryType;
};

const CategoryBadge = ({ category: name }: CategoryBadgeProps) => {
    const classes = useStyles();
    const category = Category.get(name);

    return (
        <Grid item>
            <Typography variant={"body2"} className={classes.badge}>
                {category.name}
            </Typography>
        </Grid>    
    );
};

const useStyles = makeStyles((theme) => ({
    badge: {
        background: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    },
}));

export default CategoryBadge;