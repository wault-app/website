import { Card, CardActionArea, CardContent, Grid, List, ListSubheader, Skeleton, Typography, useTheme } from "@mui/material";
import AccountItem from "@components/account/AccountItem";
import Placeholder from "@lib/placeholder";
import { useRouter } from "next/router";
import { ItemType, KeycardType } from "@wault/typings";
import PlatformIcon from "@components/account/PlatformIcon";
import { Box } from "@mui/system";
import CreditCardIcon from "@mui/icons-material/CreditCardRounded";
import Issuers from "@lib/credit-cards/issuers/issuers";
import Payment from "payment";
import Platforms from "@wault/platforms";

export type SafeItemProps = {
    loading: true;
} | {
    keycard: KeycardType;
};

const SafeItem = (props: SafeItemProps) => {
    const router = useRouter();

    if ("loading" in props) {
        return (
            <Card>
                <List>
                    <ListSubheader>
                        <Skeleton />
                    </ListSubheader>
                    {Placeholder.generate(3, 2).map((index) => (
                        <AccountItem
                            key={`account-item-placeholder-${index}`}
                            loading
                        />
                    ))}
                </List>
            </Card>
        );
    }

    return (
        <Card>
            <CardActionArea onClick={() => router.push(`/safe/${props.keycard.safe.id}`)}>
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={12}>
                        <CardContent sx={{ pb: "0 !important" }}>
                            <Typography variant={"h6"}>
                                <b>
                                    {props.keycard.safe.name}
                                </b>
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} sx={{ ml: 2 }}>
                        <ItemList items={props.keycard.safe.items} />
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
};

const ItemList = ({ items }: { items: ItemType[] }) => {
    const theme = useTheme();
    
    return (
        <Grid container spacing={1} sx={{ maxHeight: 36, pb: 1, overflow: "hidden", flexWrap: "nowrap" }}>
            {items.map((item) => (
                item.type === "account" ? (
                    <Grid item>
                        <PlatformIcon
                            size={24}
                            hostname={item.platform}
                        />
                    </Grid>
                ) : item.type === "credit-card" && (
                    <Grid item>
                        <Box sx={{
                            background: Issuers.get(Payment.fns.cardType(item.number)).color,
                            width: 24,
                            height: 24,
                            borderRadius: "6px",
                            boxShadow: theme.shadows[2],
                        }}>
                            <CreditCardIcon
                                style={{
                                    width: 12,
                                    height: 12,
                                    margin: 6,
                                }} 
                            />
                        </Box>
                    </Grid>
                )
            ))}
            <Box
                sx={{
                    position: "absolute",
                    right: 0,
                    width: 40,
                    height: 40,
                    filter: "brightness(1.7222)",
                    background: `linear-gradient(90deg, rgba(0, 0, 0, 0), ${theme.palette.background.paper})`,
                }}
            />
        </Grid>
    );
};

export default SafeItem;