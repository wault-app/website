import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { HomeRounded as HomeIcon } from "@mui/icons-material";

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