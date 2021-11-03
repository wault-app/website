import { useUser } from "@components/providers/AuthenticationProvider";
import { Grid, GridProps, Typography } from "@mui/material";

export type UserComponentProps = GridProps;

const UserComponent = (props: UserComponentProps) => {
    const { user } = useUser();

    return (
        <Grid container alignItems={"center"} {...props}>
            <Grid item sx={{ width: 56 }}>
                {user.icon?.type === "IMAGE" ? (
                    <img
                        width={32}
                        height={32}
                        src={user.icon.value}
                    />
                ) : (
                    <Typography sx={{ lineHeight: 1, fontSize: 28, height: 44, pt: "8px", pb: "8px" }}>
                        {user.icon?.value || "😀"}
                    </Typography>
                )}
            </Grid>
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