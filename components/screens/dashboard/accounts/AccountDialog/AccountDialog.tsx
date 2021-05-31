import { Collapse, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Typography } from "@material-ui/core";
import PlatformIcon from "../../platforms/PlatformIcon";
import { AccountType } from "../AccountItem";
import { DescriptionRounded as DescriptionIcon, ExpandLessRounded as DecreaseIcon, ExpandMoreRounded as ExpandIcon, FileCopyRounded as CopyIcon, LanguageRounded as WebsiteIcon, VpnKeyRounded as PasswordIcon } from "@material-ui/icons";
import Platforms from "@lib/client/platforms";
import { Fragment, useState } from "react";
import CategoryBadge from "../CategoryBadge";

export type AccountDialogProps = AccountType;

const AccountDialog = (props: AccountDialogProps) => {
    const platform = Platforms.get(props.platform);

    const classes = useStyles({ color: platform?.icon.color });

    return (
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
                    <Typography noWrap gutterBottom>
                        {props.username}
                    </Typography>
                    <Grid container spacing={1} justifyContent={"center"}>
                        {props.categories.map((category) => (
                            <CategoryBadge
                                category={category}
                            />
                        ))}
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={12} md={7}>
                <List>
                    <OpenPlatformButton
                        platform={props.platform}
                    />
                    {!!props.username && (
                        <CopyUsernameButton
                            username={props.username}
                        />
                    )}
                    {!!props.password && (
                        <CopyPasswordButton
                            password={props.password}
                        />
                    )}
                    {!!props.description && (
                        <ShowDescriptionButton
                            description={props.description}
                        />
                    )}
                </List>
            </Grid>
        </Grid>
    );
};

export const CopyUsernameButton = ({ username }: { username: string }) => (
    <ListItem button>
        <ListItemIcon>
            <CopyIcon />
        </ListItemIcon>
        <ListItemText>Copy username</ListItemText>
    </ListItem>
);

export const CopyPasswordButton = ({ password }: { password: string }) => (
    <ListItem button>
        <ListItemIcon>
            <PasswordIcon />
        </ListItemIcon>
        <ListItemText>Copy password</ListItemText>
    </ListItem>
);

export const OpenPlatformButton = ({ platform }: { platform: string }) => (
    <ListItem button onClick={() => window.location.href = `https://${platform}`}>
        <ListItemIcon>
            <WebsiteIcon />
        </ListItemIcon>
        <ListItemText>Open website</ListItemText>
    </ListItem>
);

const ShowDescriptionButton = ({ description }: { description: string }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles({ color: "#000000" });

    return (
        <Fragment>
            <ListItem button onClick={() => setOpen(!open)}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary={"Show description"} />
                {open ? <DecreaseIcon /> : <ExpandIcon />}
            </ListItem>
            <Collapse in={open} timeout={"auto"} unmountOnExit>
                <div className={classes.box}>
                    <Typography>
                        {description}
                    </Typography>
                </div>
            </Collapse>
        </Fragment>
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
    box: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
}));


export default AccountDialog;