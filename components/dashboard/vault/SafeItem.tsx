import { Button, CardActionArea, CardActions, CardContent, Grid, List, ListSubheader, Typography } from "@material-ui/core";
import ResponsiveCard from "../../common/ResponsiveCard";
import { Skeleton } from "@material-ui/lab";
import AccountItem from "../accounts/AccountItem";
import Placeholder from "@lib/placeholder";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { KeycardType } from "@wault/typings";
import Tag from "@components/common/Tag";

export type SafeItemProps = {
    loading: true;
} | {
    keycard: KeycardType;
};

type TagType = {
    text: string;
    color?: any;
};

const SafeItem = (props: SafeItemProps) => {
    const router = useRouter();
    const [tags, setTags] = useState<TagType[]>([]);

    useEffect(() => {
        if ("loading" in props) return;

        const tags: TagType[] = [];

        /*
        tags.push({
            text: "Premium",
            color: purple,
        });
        */

        const accounts = props.keycard.safe.items.filter((item) => item.type === "account").length;
        if (accounts) {
            tags.push({
                text: `${accounts} accounts`
            });
        }

        const cards = props.keycard.safe.items.filter((item) => item.type === "credit-card").length;
        if (accounts) {
            tags.push({
                text: `${cards} credit cards`
            });
        }


        setTags(tags);
    }, [props]);

    if ("loading" in props) {
        return (
            <ResponsiveCard>
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
            </ResponsiveCard>
        );
    }

    return (
        <ResponsiveCard key={`safe-item-${props.keycard.id}`}>
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
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                {
                                    tags.map(
                                        (tag) => (
                                            <Grid
                                                item
                                                key={`chip-${tag.text}`}
                                            >
                                                <Tag
                                                    label={tag.text}
                                                    color={tag.color}
                                                />
                                            </Grid>
                                        )
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small">View</Button>
            </CardActions>
        </ResponsiveCard>
    );
};

export default SafeItem;