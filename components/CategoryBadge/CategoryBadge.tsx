import Category from "@wault/category";
import { CategoryType } from "@wault/typings";
import { Chip, Grid } from "@mui/material";

export type CategoryBadgeProps = {
    category: CategoryType;
};

const CategoryBadge = ({ category: name }: CategoryBadgeProps) => {
    const category = Category.get(name);

    return (
        <Grid item>
            <Chip
                label={category.name}
            />
        </Grid>    
    );
};

export default CategoryBadge;