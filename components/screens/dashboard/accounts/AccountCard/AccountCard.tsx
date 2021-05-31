import { Card, CardActionArea, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { CategoryType } from "@lib/client/categories";
import PlatformIcon from "../../platforms/PlatformIcon";

export type AccountItemProps = {
    platform: string;
    categories: CategoryType[];
    username?: string;
    password?: string;
} | {
    loading: true;
};

const AccountItem = (props: AccountItemProps) => {
    if("loading" in props) {
        return <div />
    }
    
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                        alignItems={"center"}
                    >
                        <Grid item>
                            <PlatformIcon
                                hostname={props.platform}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant={"h6"} noWrap>
                                <b>
                                    {props.platform}
                                </b>
                            </Typography>
                            <Typography noWrap>
                                {props.username}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default AccountItem;