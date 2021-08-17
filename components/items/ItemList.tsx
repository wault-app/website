import AccountItem from "@components/dashboard/accounts/AccountItem";
import CreditCardItem from "@components/dashboard/cards/CreditCardItem";
import { ItemType } from "@wault/typings";
import { useMemo } from "react";
import { DataProvider, LayoutProvider, RecyclerListView, RecyclerListViewProps } from "recyclerlistview/web";

export type ItemListProps = {
    items: ItemType[];
    width: number;
    height?: number;
    recyclerListViewProps?: RecyclerListViewProps;
};

const ItemList = (props: ItemListProps) => {
    const dataProvider = useMemo(
        () => {
            const dataProvider = new DataProvider((r1, r2) => r1 !== r2);

            return dataProvider.cloneWithRows(props.items);
        },
        [props.items]
    );

    const layoutProvider = useMemo(
        () => new LayoutProvider(
            () => "item",
            (type, dim) => {
                dim.height = 72;
                dim.width = props.width; 
            },
        ),
        [props.width]
    );

    return (
        <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            canChangeSize={true}
            style={{
                height: props.height || 300,
                width: props.width
            }}
            rowRenderer={(type, data: ItemType) => (
                data.type === "account" ? (
                    <AccountItem
                        account={data}
                    />
                ) : data.type === "credit-card" && (
                    <CreditCardItem
                        creditCard={data}
                    />
                )
            )}
            {...props.recyclerListViewProps}
        />
    );
};

ItemList.displayName = "ItemList";

export default ItemList;