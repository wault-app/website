import { createMuiTheme, Dialog, DialogProps, DialogTitle, List, ListItem, ListItemIcon, ListItemText, makeStyles, ThemeProvider } from "@material-ui/core";
import { PaletteOptions, useTheme } from "@components/ThemeProvider";
import { PaletteRounded as PaletteIcon } from "@material-ui/icons";
import { Fragment, useState } from "react";

export type ColorSchemaSelectorProps = {};

const ColorSchemaSelector = () => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <ColorSchemaDialog
                open={open}
                onClose={() => setOpen(false)}
            />
            <ListItem button onClick={() => setOpen(true)}>
                <ListItemIcon>
                    <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary={"Custom color palette"} />
            </ListItem>
        </Fragment>
    );
};

const ColorSchemaDialog = (props: DialogProps) => {
    return (
        <Dialog maxWidth={"sm"} fullWidth {...props}>
            <DialogTitle>
                Select a color palette!
            </DialogTitle>
            <List>
                {Object.keys(PaletteOptions).map((key) => (
                    <ColorOption
                        key={`color-option-${key}`}
                        color={key}
                        onClose={() => props.onClose({}, "escapeKeyDown")}
                    />
                ))}
            </List>
        </Dialog>
    );
};

const ColorOption = (props: { color: string; onClose: () => void }) => {
    const { setColorSchema } = useTheme();
    const classes = useStyles();

    const { palette, name } = PaletteOptions[props.color];

    const setColor = () => {
        setColorSchema(props.color);
        props.onClose();
    }

    return (
        <ListItem
            button
            onClick={() => setColor()}
        >
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    primary: palette,
                }
            })}>
                <ListItemIcon>
                    <div
                        className={classes.icon}
                        style={{
                            // @ts-ignore
                            backgroundColor: palette[500]
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={name}
                />
            </ThemeProvider>
        </ListItem>
    );
};

const useStyles = makeStyles((theme) => ({
    icon: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
}));

export default ColorSchemaSelector;