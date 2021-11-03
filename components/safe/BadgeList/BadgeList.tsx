import { Avatar, Chip, Collapse, Grid } from "@mui/material";
import { DoneRounded } from "@mui/icons-material";
import { useMemo } from "react";
import { TransitionGroup } from "react-transition-group";

export type BadgeType = {
    id: string;
    text: string;
    items: string[];
};

export type BadgeListProps = {
    tags: BadgeType[];
    selected: string[];
    onChange: (selected: string[], items: string[]) => void;
};

const BadgeList = (props: BadgeListProps) => {
    const filterBadges = (selected: string[]) => {
        const items = new Map<string, Map<string, boolean>>();

        for (const tag of props.tags) {
            for (const item of tag.items) {
                if (items.has(item)) {
                    const map = items.get(item);
                    map.set(tag.id, true);

                    items.set(item, map);
                } else {
                    const map = new Map();
                    map.set(tag.id, true);
                    items.set(item, map);
                }
            }
        }

        const itemFilter = (item: string) => {
            const hasTags = items.get(item);

            for (const el of selected) {
                if (!hasTags.get(el)) return false;
            }

            return true;
        };

        const filteredFromItems = props.tags.map(
            (tag) => (
                {
                    ...tag,
                    items: tag.items.filter(
                        itemFilter
                    )
                }
            )
        );

        return filteredFromItems.sort((a, b) => {
            const booleanToInt = (b: boolean) => b ? 1 : 0;
            const firstLevel = booleanToInt(props.selected.includes(b.id)) - booleanToInt(props.selected.includes(a.id));

            if (firstLevel) return firstLevel;

            return b.items.length - a.items.length;
        });
    };

    const filtered = useMemo(
        () => filterBadges(props.selected),
        [props.selected, filterBadges]
    );

    return (
        <Grid
            container
            spacing={1}
            sx={{
                pl: 2,
                pr: 2,
                flexWrap: {
                    xs: "nowrap",
                    sm: "wrap",
                },
                overflowY: "auto",
            }}
        >
            <TransitionGroup component={null}>
                {filtered.filter((el) => el.items.length > 0).map(
                    (tag) => (
                        <Collapse orientation="horizontal" key={`tag-${tag.id}`}>
                            <Grid item sx={{ mr: 1, mb: 1 }}>
                                <Chip
                                    onClick={() => {
                                        const newSelected = props.selected.includes(tag.id)
                                            ? props.selected.filter((el) => el !== tag.id)
                                            : [...props.selected, tag.id];

                                        const items = filterBadges(newSelected).map((tag) => tag.items).flat();

                                        props.onChange(newSelected, items);

                                    }}
                                    disabled={tag.items.length === 0}
                                    avatar={
                                        props.selected.includes(tag.id) ? (
                                            <Avatar>
                                                <DoneRounded />
                                            </Avatar>
                                        ) : (
                                            <Avatar>
                                                {tag.items.length}
                                            </Avatar>
                                        )
                                    }
                                    label={tag.text}
                                />
                            </Grid>
                        </Collapse>
                    )
                )}
            </TransitionGroup>
        </Grid>
    );
};

export default BadgeList;