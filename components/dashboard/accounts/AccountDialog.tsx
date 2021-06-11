import { Collapse, DialogContent, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Typography } from "@material-ui/core";
import PlatformIcon from "@components/PlatformIcon";
import { AccountType } from "./AccountItem";import Platforms from "@lib/client/platforms";
import { Fragment } from "react";
import CategoryBadge from "./CategoryBadge";
import { DialogFooter } from "@components/DialogProvider";
import CopyUsernameButton from "./AccountDialog/CopyUsernameButton";
import OpenPlatformButton from "./AccountDialog/OpenPlatformButton";
import CopyPasswordButton from "./AccountDialog/CopyPasswordButton";
import ShowDescriptionButton from "./AccountDialog/ShowDescriptionButton";

export type AccountDialogProps = AccountType;

const AccountDialog = (props: AccountDialogProps) => {
    const platform = Platforms.get(props.platform);

    const classes = useStyles({ color: platform?.icon.color });

    return (
        <Fragment>
            <DialogContent className={classes.root}>
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
                            <Grid container spacing={1} justify={"center"}>
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
            </DialogContent>
            <DialogFooter />
        </Fragment>
    );
};

const useStyles = makeStyles<Theme, { color: string }>((theme) => ({
    root: {
        padding: 0,
        paddingTop: "0 !important",
    },
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


export default AccountDialog;