import { Collapse, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material";
import { Fragment, useState } from "react";
import ExpandIcon from "@mui/icons-material/ExpandMoreRounded";
import DecreaseIcon from "@mui/icons-material/ExpandLessRounded"; 
import DescriptionIcon from "@mui/icons-material/DescriptionRounded";
import { Box } from "@mui/system";

/**
 * A button and a container to display the description of an `Account`
 * @param description {string} content of the description 
 */
const ShowDescriptionButton = ({ description }: { description: string }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    return (
        <Fragment>
            <ListItem button onClick={() => setOpen(!open)}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary={"Show description"} />
                {open ? <DecreaseIcon /> : <ExpandIcon />}
            </ListItem>
            <Collapse in={open} timeout={"auto"} unmountOnExit>
                <Box sx={{
                    p: 2,
                    m: 2,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                }}>
                    <Typography>
                        {description}
                    </Typography>
                </Box>
            </Collapse>
        </Fragment>
    );
};

export default ShowDescriptionButton;