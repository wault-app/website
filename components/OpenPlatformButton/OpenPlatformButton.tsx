import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { LanguageRounded as WebsiteIcon } from "@mui/icons-material";

/**
 * A button used to open the website of a platform
 * @param password {string} hostname of the website
 */
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