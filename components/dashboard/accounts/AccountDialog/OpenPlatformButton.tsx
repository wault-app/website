import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { LanguageRounded as WebsiteIcon } from "@material-ui/icons";

const OpenPlatformButton = ({ platform }: { platform: string }) => (
    <ListItem
        button
        onClick={() => window.location.href = `https://${platform}`}
    >
        <ListItemIcon>
            <WebsiteIcon />
        </ListItemIcon>
        <ListItemText>Open website</ListItemText>
    </ListItem>
);

export default OpenPlatformButton;