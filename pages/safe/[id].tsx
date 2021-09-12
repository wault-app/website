import ItemList from "@components/ItemList";
import { useKeycards } from "@components/KeycardProvider";
import BadgeList, { BadgeType } from "@components/BadgeList";
import { Card, CardContent, Container, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import Category from "@wault/category";
import { ItemType } from "@wault/typings";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const SafePage = () => {
    const router = useRouter();
    const { keycards } = useKeycards();

    const { id } = router.query;
    const keycard = keycards.find((keycard) => keycard.safe.id === id);

    const isSmall = useMediaQuery('(max-width:600px)');
    const classes = useStyles();

    const [shownItems, setShownItems] = useState<ItemType[]>(keycard.safe.items);
    const [selected, setSelected] = useState<string[]>([]);

    const width = useMemo(
        () => isSmall ? window.innerWidth : 552,
        [isSmall]
    );

    const tags = useMemo(
        () => {
            const tags: BadgeType[] = [];

            tags.push({
                id: "account",
                text: "Accounts",
                items: keycard.safe.items.filter((el) => el.type === "account").map((el) => el.id),
            });

            tags.push({
                id: "credit-card",
                text: "Credit cards",
                items: keycard.safe.items.filter((el) => el.type === "credit-card").map((el) => el.id),
            });

            Category.getAll().map(
                (category) => {
                    tags.push({
                        id: category.id,
                        text: category.name,
                        // @ts-ignore
                        items: keycard.safe.items.filter((el) => el?.categories?.includes(category.id)).map((el) => el.id),
                    });
                }
            )

            return tags;
        },
        [keycard]
    );

    if (!keycard) {
        return (<div />);
    }

    return (
        <Container maxWidth={"sm"} className={classes.root}>
            <Card>
                <CardContent>
                    <Typography variant={"h6"}>
                        {keycard.safe.name}
                    </Typography>
                    {!!keycard.safe.description && (
                        <Typography variant={"h6"}>
                            {keycard.safe.description}
                        </Typography>
                    )}
                </CardContent>

                <div className={classes.tags}>
                    <BadgeList
                        tags={tags}
                        selected={selected}
                        onChange={(sel, items) => {
                            const map = new Map();
                            for(const item of items) {
                                map.set(item, true);
                            }

                            setShownItems(keycard.safe.items.filter((item) => map.has(item.id)));
                            setSelected(sel);
                        }}
                    />
                </div>

                {keycard.safe.items.length > 0 && Object.keys(shownItems).length > 0 && (
                    <ItemList
                        width={width}
                        height={500}
                        items={shownItems}
                    />
                )}
            </Card>
        </Container>
    );
};

const useStyles = makeStyles((theme) => (
    {
        root: {
            paddingTop: theme.spacing(2),
        },
        tags: {
            padding: theme.spacing(0, 2, 2, 2),
        },
    }
));

export default SafePage;