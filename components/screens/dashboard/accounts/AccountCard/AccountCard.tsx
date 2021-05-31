import { Card, CardActionArea, CardActions, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Typography } from "@material-ui/core";
import { CategoryType } from "@lib/client/categories";
import PlatformIcon from "../../platforms/PlatformIcon";
import { useDialog } from "@components/screens/dialog/DialogProvider/DialogProvider";
import Platforms from "@lib/client/platforms";
import { FileCopyRounded as CopyIcon, VpnKeyRounded as PasswordIcon } from "@material-ui/icons";

export type AccountItemProps = {
    platform: string;
    categories: CategoryType[];
    username?: string;
    password?: string;
} | {
    loading: true;
};

const AccountItem = (props: AccountItemProps) => {
    const { setOpen, setComponent } = useDialog();

    if ("loading" in props) {
        return <div />
    }

    const platform = Platforms.get(props.platform);
    const classes = useStyles({ color: platform.icon?.color });

    const open = () => {
        setComponent(
            <Grid container>
                <Grid item xs={12} md={5}>

                    <div
                        className={classes.gradient}
                    />
                    <PlatformIcon
                        className={classes.icon}
                        hostname={props.platform}
                    />
                    <div className={classes.leftSide}>    
                        <Typography variant={"h6"} noWrap>
                            <b>
                                {props.platform}
                            </b>
                        </Typography>
                        <Typography noWrap>
                            {props.username}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={7}>
                    <List>
                        {!!props.username && (
                            <ListItem button>
                                <ListItemIcon>
                                    <CopyIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Copy username
                                </ListItemText>
                            </ListItem>
                        )}
                        {!!props.password && (
                            <ListItem button>
                                <ListItemIcon>
                                    <PasswordIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Copy password
                                </ListItemText>
                            </ListItem>
                        )}
                    </List>
                </Grid>
            </Grid>
        );

        setOpen(true);
    };

    return (
        <Card>
            <CardActionArea>
                <CardContent
                    onClick={open}
                >
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

const useStyles = makeStyles<Theme, { color: string }>((theme) => ({
    icon: {
        marginTop: -32,
        marginBottom: 24,
        marginLeft: "auto",
        marginRight: "auto",
    },
    leftSide: {
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: "center",
        marginBottom: 24,
    },
    gradient: {
        backgroundSize: "cover",
        width: "100%",
        height: 64,
        background: props => `linear-gradient(${props.color || theme.palette.primary.main}, transparent)`
    },
}));

export default AccountItem;