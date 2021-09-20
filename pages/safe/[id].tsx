import { useKeycards } from "@components/KeycardProvider";
import BadgeList, { BadgeType } from "@components/BadgeList";
import { Card, CardContent, Container, Typography } from "@mui/material";
import Category from "@wault/category";
import { ItemType } from "@wault/typings";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Box } from "@mui/system";
import AccountItem from "@components/AccountItem";
import CreditCardItem from "@components/CreditCardItem";

const SafePage = () => {
    const router = useRouter();
    const { keycards } = useKeycards();

    const { id } = router.query;
    const keycard = keycards.find((keycard) => keycard.safe.id === id);

    const [shownItems, setShownItems] = useState<ItemType[]>(keycard.safe.items);
    const [selected, setSelected] = useState<string[]>([]);

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
        <Container
            maxWidth={"sm"}
            sx={{ pt: 2, pb: 2 }}
        >
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
                <Box sx={{ pb: 1 }}>
                    <BadgeList
                        tags={tags}
                        selected={selected}
                        onChange={(sel, items) => {
                            const map = new Map();
                            for (const item of items) {
                                map.set(item, true);
                            }

                            setShownItems(keycard.safe.items.filter((item) => map.has(item.id)));
                            setSelected(sel);
                        }}
                    />
                </Box>
                {keycard.safe.items.length > 0 && Object.keys(shownItems).length > 0 && (
                    shownItems.map((item) => (
                        item.type === "account" ? (
                            <AccountItem
                                key={`account-item-${item.id}`}
                                account={item}
                            />
                        ) : item.type === "credit-card" && (
                            <CreditCardItem
                                key={`credit-card-item-${item.id}`}
                                creditCard={item}
                            />
                        )
                    ))
                )}
            </Card>
        </Container>
    );
};

export default SafePage;