import { useUser } from "@components/providers/AuthenticationProvider";
import { Grid, GridProps, Typography } from "@material-ui/core";

export type UserComponentProps = GridProps;

const UserComponent = (props: UserComponentProps) => {
    const { user } = useUser();

    return (
        <Grid container alignItems={"center"} {...props}>
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

export default UserComponent;