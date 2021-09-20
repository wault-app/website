import { Card, CardActionArea, CardActions, CardContent, Chip, Grid, List, ListSubheader, Skeleton, Typography } from "@mui/material";
import AccountItem from "@components/AccountItem";
import Placeholder from "@lib/placeholder";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { KeycardType } from "@wault/typings";

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
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>
                                <b>
                                    {props.keycard.safe.name}
                                </b>
                            </Typography>
                        </Grid>
                        {!!props.keycard.safe.description && (
                            <Grid item xs={12}>
                                <Typography>
                                    {props.keycard.safe.description}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ p: 2 }}>
                <Grid container spacing={1}>
                    {
                        tags.map(
                            (tag) => (
                                <Grid item key={`chip-${tag.label}`}>
                                    <Chip
                                        label={tag.label}
                                        color={tag.color}
                                    />
                                </Grid>
                            )
                        )
                    }
                </Grid>
            </CardActions>
        </Card>
    );
};

export default SafeItem;