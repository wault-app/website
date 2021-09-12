import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { HomeRounded as HomeIcon } from "@material-ui/icons";

export type HomeButtonProps = {
    onClick: () => void;
};

const HomeButton = (props: HomeButtonProps) => {
    return (
        <ListItem
            button
            {...props}
        >
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText
                primary={"Home"}
            />
        </ListItem>
    );
};

export default HomeButton;