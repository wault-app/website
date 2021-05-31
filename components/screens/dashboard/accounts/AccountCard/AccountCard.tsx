import { Card, CardContent } from "@material-ui/core";
import { CategoryType } from "@lib/client/categories";

export type AccountItemProps = {
    platform: string;
    categories: CategoryType[];
    username?: string;
    password?: string;
} | {
    loading: true;
};

const AccountItem = (props: AccountItemProps) => {
    return (
        <Card>
            <CardContent>
                
            </CardContent>
        </Card>
    );
};

export default AccountItem;