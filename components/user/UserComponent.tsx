import { useUser } from "@components/providers/AuthenticationProvider";
import { Grid, makeStyles, Typography } from "@material-ui/core";

export type UserComponentProps = {};

const UserComponent = (props: UserComponentProps) => {
    const { user } = useUser();
    const classes = useStyles();

    return (
        <Grid container alignItems={"center"} className={classes.root}>
            <Grid item>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"body1"} noWrap>
                            <b>
                                {user.username}
                            </b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"body2"} noWrap>
                            {user.email}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        padding: 16,
    },
}));

export default UserComponent;