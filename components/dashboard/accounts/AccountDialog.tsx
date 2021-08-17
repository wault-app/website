import { Button, Dialog, DialogActions, DialogContent, DialogProps, Grid, List, makeStyles, Theme, Typography } from "@material-ui/core";
import PlatformIcon from "@components/platforms/PlatformIcon";
import Platforms from "@wault/platforms";
import CategoryBadge from "./CategoryBadge";
import CopyUsernameButton from "./AccountDialog/CopyUsernameButton";
import OpenPlatformButton from "./AccountDialog/OpenPlatformButton";
import CopyPasswordButton from "./AccountDialog/CopyPasswordButton";
import ShowDescriptionButton from "./AccountDialog/ShowDescriptionButton";
import { AccountType } from "@wault/typings";

export type AccountDialogProps = DialogProps & {
    account: AccountType;
};

const AccountDialog = (props: AccountDialogProps) => {
    const { account } = props;
    const platform = Platforms.get(account.platform);

    const classes = useStyles({ color: platform.color });

    return (
        <Dialog {...props}>
            <DialogContent className={classes.root}>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <div
                            className={classes.gradient}
                        />
                        <PlatformIcon
                            className={classes.icon}
                            hostname={account.platform}
                        />
                        <div className={classes.leftSide}>
                            <Typography variant={"h6"} noWrap>
                                <b>
                                    {account.platform}
                                </b>
                            </Typography>
                            <Typography noWrap gutterBottom>
                                {account.username}
                            </Typography>
                            <Grid container spacing={1} justify={"center"}>
                                {account.categories?.map((category) => (
                                    <CategoryBadge
                                        key={`category-badge-${category}`}
                                        category={category}
                                    />
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <List>
                            <OpenPlatformButton
                                platform={account.platform}
                            />
                            {!!account.username && (
                                <CopyUsernameButton
                                    username={account.username}
                                />
                            )}
                            {!!account.password && (
                                <CopyPasswordButton
                                    password={account.password}
                                />
                            )}
                            {!!account.description && (
                                <ShowDescriptionButton
                                    description={account.description}
                                />
                            )}
                        </List>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => props.onClose({}, "escapeKeyDown")}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
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