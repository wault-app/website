import { Button, Dialog, DialogActions, DialogContent, DialogProps, Grid, List, Typography, useTheme } from "@mui/material";
import PlatformIcon from "@components/PlatformIcon";
import CategoryBadge from "@components/CategoryBadge";
import CopyUsernameButton from "../CopyUsernameButton";
import OpenPlatformButton from "../OpenPlatformButton";
import CopyPasswordButton from "../CopyPasswordButton";
import ShowDescriptionButton from "../ShowDescriptionButton";
import { AccountType } from "@wault/typings";
import { Box } from "@mui/system";
import Platforms from "@wault/platforms";

export type AccountDialogProps = DialogProps & {
    account: AccountType;
};

const AccountDialog = (props: AccountDialogProps) => {
    const { account } = props;
    const platform = Platforms.get(account.platform);
    const theme = useTheme();

    return (
        <Dialog {...props}>
            <DialogContent sx={{ p: 0 }}>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <Box
                            sx={{
                                backgroundSize: "cover",
                                width: "100%",
                                height: 64,
                                background: `linear-gradient(${platform.color || theme.palette.primary.main}, transparent)`,
                            }}
                        />
                        <PlatformIcon
                            sx={{
                                marginTop: -4,
                                marginBottom: 2,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                            hostname={account.platform}
                        />
                        <Box sx={{
                            pl: 4,
                            pr: 4,
                            mb: 6,
                            textAlign: "center",
                        }}>
                            <Typography variant={"h6"} noWrap>
                                <b>
                                    {account.platform}
                                </b>
                            </Typography>
                            <Typography noWrap gutterBottom>
                                {account.username}
                            </Typography>
                            <Grid container spacing={1} justifyContent={"center"}>
                                {account.categories?.map((category) => (
                                    <CategoryBadge
                                        key={`category-badge-${category}`}
                                        category={category}
                                    />
                                ))}
                            </Grid>
                        </Box>
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

export default AccountDialog;