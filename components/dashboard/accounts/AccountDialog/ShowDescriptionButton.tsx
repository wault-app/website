import { Collapse, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useState } from "react";
import { DescriptionRounded as DescriptionIcon, ExpandLessRounded as DecreaseIcon, ExpandMoreRounded as ExpandIcon, FileCopyRounded as CopyIcon, LanguageRounded as WebsiteIcon, VpnKeyRounded as PasswordIcon } from "@material-ui/icons";

const ShowDescriptionButton = ({ description }: { description: string }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

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
                <div className={classes.box}>
                    <Typography>
                        {description}
                    </Typography>
                </div>
            </Collapse>
        </Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    box: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
}));

export default ShowDescriptionButton;