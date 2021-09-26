import { Card, CardActionArea, CardContent, Chip, Grid, List, ListSubheader, Skeleton, Typography, useTheme } from "@mui/material";
import AccountItem from "@components/AccountItem";
import Placeholder from "@lib/placeholder";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { ItemType, KeycardType } from "@wault/typings";
import PlatformIcon from "@components/PlatformIcon";
import { Box } from "@mui/system";
import { CreditCardRounded } from "@mui/icons-material";
import Issuers from "@lib/credit-cards/issuers/issuers";
import Payment from "payment";

export type SafeItemProps = {
    loading: true;
} | {
    keycard: KeycardType;
};

type TagType = {
    label: string;
    color?: "primary";
};

const SafeItem = (props: SafeItemProps) => {
    const router = useRouter();
    const [tags, setTags] = useState<TagType[]>([]);

    useEffect(() => {
        if ("loading" in props) return;

        const tags: TagType[] = [];

        const firstCharUpperCase = (s: string) => s[0].toUpperCase() + s.substring(1).toLowerCase()

        tags.push({
            label: firstCharUpperCase(props.keycard.role),
            color: "primary",
        });

        const accounts = props.keycard.safe.items.filter((item) => item.type === "account").length;
        if (accounts) {
            tags.push({
                label: `${accounts} accounts`
            });
        }

        const cards = props.keycard.safe.items.filter((item) => item.type === "credit-card").length;
        if (accounts) {
            tags.push({
                label: `${cards} credit cards`
            });
        }


        setTags(tags);
    }, [props]);

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
                            <CreditCardRounded
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